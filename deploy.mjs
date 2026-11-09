import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";

const taskRoot = path.dirname(fileURLToPath(import.meta.url));
const stateRoot = path.join(process.env.APPDATA || process.env.USERPROFILE || taskRoot, "DevinZhCnLocalization");
const appRoot = process.env.DEVIN_APP_ROOT ? path.resolve(process.env.DEVIN_APP_ROOT) : null;
const supportedBuild = JSON.parse(fs.readFileSync(path.join(taskRoot, "supported-build.json"), "utf8"));
const expectedPackageVersion = supportedBuild.packageVersion;
const expectedDesktopVersion = supportedBuild.desktopVersion;
const expectedCommit = supportedBuild.commit;
const manifestPath = path.join(stateRoot, "manifest.json");
const runId = new Date().toISOString().replace(/[-:.TZ]/g, "");
const backupRelRoot = path.join("backup", runId);
const backupRoot = path.join(stateRoot, backupRelRoot);
const localizerSource = path.join(taskRoot, "devin-zh-cn-localizer.js");
const localizerRel = "out/vs/code/electron-browser/workbench/devin-zh-cn-localizer.js";
const marker = "/* DEVIN ZH CN LOCALIZER V2 */";

function fail(message) {
  throw new Error(message);
}

function sha256(buffer) {
  return crypto.createHash("sha256").update(buffer).digest("hex");
}

function checksum(buffer) {
  return crypto.createHash("sha256").update(buffer).digest("base64").replace(/=+$/, "");
}

function readApp(rel) {
  return fs.readFileSync(path.join(appRoot, rel));
}

function replaceOnce(text, before, after, label) {
  const count = text.split(before).length - 1;
  if (count !== 1) fail(`${label}: expected one matching source fragment, found ${count}.`);
  return text.replace(before, after);
}

if (!appRoot) fail("Pass the Devin resources/app folder with -AppRoot or set DEVIN_APP_ROOT.");
if (fs.existsSync(manifestPath)) fail("A localization patch is already recorded. Restore it before applying again.");
if (fs.existsSync(backupRoot)) fail("The new backup folder already exists; no files were changed.");
if (!fs.existsSync(localizerSource)) fail("The local Chinese localization script is missing.");
const localizerTarget = path.join(appRoot, localizerRel);
if (fs.existsSync(localizerTarget)) fail("A localization script already exists in the Devin installation; it was left untouched.");

const packageJson = JSON.parse(readApp("package.json").toString("utf8"));
const productBytes = readApp("product.json");
const productJson = JSON.parse(productBytes.toString("utf8"));
if (packageJson.version !== expectedPackageVersion || productJson.windsurfVersion !== expectedDesktopVersion || productJson.commit !== expectedCommit) {
  fail(`This patch is verified for Devin Desktop ${expectedDesktopVersion}, package ${expectedPackageVersion} (${expectedCommit}); the installed build is Devin Desktop ${productJson.windsurfVersion}, package ${packageJson.version} (${productJson.commit}).`);
}
if (!productJson.checksums || typeof productJson.checksums !== "object") fail("Devin's recorded checksum list was not found.");

const sourceBytes = fs.readFileSync(localizerSource);
const sourceText = sourceBytes.toString("utf8");
if (!sourceText.includes(marker)) fail("The localization script marker is missing.");

const checksumTargets = new Map([
  ["out/vs/workbench/windsurf-chat-client/index.js", "vs/workbench/windsurf-chat-client/index.js"],
  ["out/vs/sessions/sessions.desktop.main.js", "vs/sessions/sessions.desktop.main.js"],
  ["out/vs/code/electron-browser/workbench/workbench.html", "vs/code/electron-browser/workbench/workbench.html"]
]);
const originals = new Map();
for (const rel of [...checksumTargets.keys(), "product.json"]) {
  originals.set(rel, rel === "product.json" ? productBytes : readApp(rel));
}

for (const [rel, key] of checksumTargets) {
  const recorded = productJson.checksums[key];
  if (typeof recorded !== "string" || checksum(originals.get(rel)) !== recorded) {
    fail(`The installed file ${rel} does not match Devin's recorded checksum. No files were changed.`);
  }
}

const patched = new Map();
const appended = Buffer.from(`\n;\n${sourceText}\n`, "utf8");
for (const rel of [
  "out/vs/workbench/windsurf-chat-client/index.js",
  "out/vs/sessions/sessions.desktop.main.js"
]) {
  const original = originals.get(rel);
  if (original.toString("utf8").includes(marker)) fail(`${rel} already contains the v2 localization marker.`);
  patched.set(rel, Buffer.concat([original, appended]));
}

let html = originals.get("out/vs/code/electron-browser/workbench/workbench.html").toString("utf8");
if (html.includes("devin-zh-cn-localizer.js")) fail("The workbench already references the localization script.");
html = replaceOnce(
  html,
  '<script src="./workbench.js" type="module"></script>\n</html>',
  '<script src="./workbench.js" type="module"></script>\n\t<script src="./devin-zh-cn-localizer.js"></script>\n</html>',
  "Workbench startup script"
);
patched.set("out/vs/code/electron-browser/workbench/workbench.html", Buffer.from(html, "utf8"));

const updatedProduct = JSON.parse(productBytes.toString("utf8"));
for (const [rel, key] of checksumTargets) updatedProduct.checksums[key] = checksum(patched.get(rel));
patched.set("product.json", Buffer.from(JSON.stringify(updatedProduct, null, 2) + "\n", "utf8"));

fs.mkdirSync(backupRoot, { recursive: true });
const files = [];
for (const [rel, original] of originals) {
  const backupRel = rel === "product.json" ? "product.json.original" : rel.replaceAll("/", path.sep);
  const backupPath = path.join(backupRoot, backupRel);
  fs.mkdirSync(path.dirname(backupPath), { recursive: true });
  fs.writeFileSync(backupPath, original);
  files.push({
    rel,
    backupRel,
    originalSha256: sha256(original),
    patchedSha256: sha256(patched.get(rel)),
    checksumKey: checksumTargets.get(rel) || null,
    patchedChecksum: checksumTargets.has(rel) ? checksum(patched.get(rel)) : null
  });
}

let localizerCreated = false;
try {
  for (const [rel, bytes] of patched) fs.writeFileSync(path.join(appRoot, rel), bytes);
  fs.writeFileSync(localizerTarget, sourceBytes);
  localizerCreated = true;
  const manifest = {
    appVersion: expectedPackageVersion,
    desktopVersion: expectedDesktopVersion,
    appCommit: expectedCommit,
    appRoot,
    backupRoot: backupRelRoot,
    files,
    localizer: { rel: localizerRel, sha256: sha256(sourceBytes) },
    installedAt: new Date().toISOString()
  };
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + "\n", "utf8");
} catch (error) {
  for (const [rel, original] of originals) {
    try { fs.writeFileSync(path.join(appRoot, rel), original); } catch {}
  }
  try { if (localizerCreated && fs.existsSync(localizerTarget)) fs.unlinkSync(localizerTarget); } catch {}
  throw error;
}

console.log(`Applied the local Simplified Chinese UI patch to Devin Desktop ${expectedDesktopVersion} (package ${expectedPackageVersion}).`);
console.log("Original files and checksum values are saved in a dated backup folder.");
console.log("Devin was not closed; the patch takes effect after you restart it yourself.");
