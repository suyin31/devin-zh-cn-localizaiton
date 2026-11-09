import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";

const taskRoot = path.dirname(fileURLToPath(import.meta.url));
const stateRoot = path.join(process.env.APPDATA || process.env.USERPROFILE || taskRoot, "DevinZhCnLocalization");
const manifestPath = path.join(stateRoot, "manifest.json");
const requestedAppRoot = process.env.DEVIN_APP_ROOT ? path.resolve(process.env.DEVIN_APP_ROOT) : null;

function sha256(buffer) {
  return crypto.createHash("sha256").update(buffer).digest("hex");
}

function checksum(buffer) {
  return crypto.createHash("sha256").update(buffer).digest("base64").replace(/=+$/, "");
}

function fail(message) {
  throw new Error(message);
}

if (!fs.existsSync(manifestPath)) fail("No Devin localization manifest was found.");
const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
const appRoot = path.resolve(manifest.appRoot);
if (requestedAppRoot && requestedAppRoot !== appRoot) fail("The manifest points to a different installation; restoration stopped.");

const packageJson = JSON.parse(fs.readFileSync(path.join(appRoot, "package.json"), "utf8"));
const productPath = path.join(appRoot, "product.json");
const productJson = JSON.parse(fs.readFileSync(productPath, "utf8"));
if (packageJson.version !== manifest.appVersion || productJson.commit !== manifest.appCommit) {
  fail("Devin has been updated since this patch was installed. Restoration stopped to protect the newer installation.");
}

const backupRoot = path.resolve(stateRoot, manifest.backupRoot);
if (!backupRoot.startsWith(stateRoot + path.sep)) fail("The recorded backup folder is outside the localization state folder.");

const entries = [];
for (const entry of manifest.files) {
  const backupPath = path.join(backupRoot, entry.backupRel);
  const original = fs.readFileSync(backupPath);
  if (sha256(original) !== entry.originalSha256) fail(`The saved original for ${entry.rel} failed its integrity check.`);
  if (entry.rel === "product.json") continue;

  const current = fs.readFileSync(path.join(appRoot, entry.rel));
  const currentHash = sha256(current);
  if (currentHash !== entry.patchedSha256 && currentHash !== entry.originalSha256) {
    fail(`The file ${entry.rel} changed after localization. It may be from a Devin update, so it was left untouched.`);
  }
  const currentChecksum = productJson.checksums?.[entry.checksumKey];
  const originalChecksum = checksum(original);
  if (entry.checksumKey && currentChecksum !== entry.patchedChecksum && currentChecksum !== originalChecksum) {
    fail(`Devin's checksum entry for ${entry.rel} changed; restoration stopped.`);
  }
  entries.push({ entry, original, currentHash });
}

const localizerPath = path.join(appRoot, manifest.localizer.rel);
if (fs.existsSync(localizerPath) && sha256(fs.readFileSync(localizerPath)) !== manifest.localizer.sha256) {
  fail("The installed localization script has changed; it was left untouched.");
}

for (const { entry, original, currentHash } of entries) {
  if (currentHash !== entry.originalSha256) fs.writeFileSync(path.join(appRoot, entry.rel), original);
}
for (const { entry, original } of entries) {
  if (entry.checksumKey) productJson.checksums[entry.checksumKey] = checksum(original);
}
fs.writeFileSync(productPath, JSON.stringify(productJson, null, 2) + "\n", "utf8");

if (fs.existsSync(localizerPath)) fs.unlinkSync(localizerPath);
fs.unlinkSync(manifestPath);

console.log("Restored Devin's original files and checksum values.");
console.log("The backup copy remains in the task folder. Devin was not closed.");
