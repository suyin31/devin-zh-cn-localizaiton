import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";

const taskRoot = path.dirname(fileURLToPath(import.meta.url));
const stateRoot = path.join(process.env.APPDATA || process.env.USERPROFILE || taskRoot, "DevinZhCnLocalization");
const manifestPath = path.join(stateRoot, "manifest.json");
const requestedAppRoot = process.env.DEVIN_APP_ROOT ? path.resolve(process.env.DEVIN_APP_ROOT) : null;
const localizerSource = path.join(taskRoot, "devin-zh-cn-localizer.js");
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

function jsStringValue(value) {
  let result = "";
  for (let i = 0; i < value.length; i++) {
    const ch = value[i];
    if (ch !== "\\") {
      result += ch;
      continue;
    }
    const next = value[++i];
    if (next === undefined) break;
    if (next === "n") result += "\n";
    else if (next === "r") result += "\r";
    else if (next === "t") result += "\t";
    else if (next === "b") result += "\b";
    else if (next === "f") result += "\f";
    else if (next === "v") result += "\v";
    else if (next === "0") result += "\0";
    else if (next === "x") {
      result += String.fromCharCode(parseInt(value.slice(i + 1, i + 3), 16));
      i += 2;
    } else if (next === "u") {
      if (value[i + 1] === "{") {
        const end = value.indexOf("}", i + 2);
        result += String.fromCodePoint(parseInt(value.slice(i + 2, end), 16));
        i = end;
      } else {
        result += String.fromCharCode(parseInt(value.slice(i + 1, i + 5), 16));
        i += 4;
      }
    } else if (next === "\n") {
      continue;
    } else {
      result += next;
    }
  }
  return result;
}

function quoteJsString(value) {
  return "'" + value
    .replace(/\\/g, "\\\\")
    .replace(/'/g, "\\'")
    .replace(/\r/g, "\\r")
    .replace(/\n/g, "\\n")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029") + "'";
}

function readDictionary(source) {
  const declaration = source.indexOf("const dictionary = Object.freeze({");
  if (declaration < 0) fail("The localizer dictionary declaration was not found.");
  const start = source.indexOf("{", declaration);
  const end = source.indexOf("\n  });", start);
  if (end < 0) fail("The localizer dictionary end was not found.");
  const objectText = source.slice(start, end).trim() + "}";
  let parsed;
  try { parsed = JSON.parse(objectText); } catch { fail("The localizer dictionary could not be read as data."); }
  return parsed;
}

function localizeCatalogs(source, dictionary) {
  const pattern = /JSON\.parse\('((?:\\.|[^'\\])*)'\)/g;
  let replacements = 0;
  const result = source.replace(pattern, (whole, encoded) => {
    let catalog;
    try { catalog = JSON.parse(jsStringValue(encoded)); } catch { return whole; }
    let hits = 0;
    const visit = (value) => {
      if (typeof value === "string") {
        if (Object.prototype.hasOwnProperty.call(dictionary, value)) {
          hits++;
          return dictionary[value];
        }
        return value;
      }
      if (Array.isArray(value)) return value.map(visit);
      if (value && typeof value === "object") {
        for (const key of Object.keys(value)) value[key] = visit(value[key]);
      }
      return value;
    };
    const localized = visit(catalog);
    if (!hits) return whole;
    replacements += hits;
    return "JSON.parse(" + quoteJsString(JSON.stringify(localized)) + ")";
  });
  return { source: result, replacements };
}

if (!fs.existsSync(manifestPath)) fail("No localization manifest was found. Apply the patch first.");
const manifestBytes = fs.readFileSync(manifestPath);
const manifest = JSON.parse(manifestBytes.toString("utf8"));
const appRoot = path.resolve(manifest.appRoot);
if (requestedAppRoot && requestedAppRoot !== appRoot) fail("The manifest points to a different installation.");
const pkg = JSON.parse(fs.readFileSync(path.join(appRoot, "package.json"), "utf8"));
const productPath = path.join(appRoot, "product.json");
const productBytes = fs.readFileSync(productPath);
const product = JSON.parse(productBytes.toString("utf8"));
if (pkg.version !== manifest.appVersion || (manifest.desktopVersion && product.windsurfVersion !== manifest.desktopVersion) || product.commit !== manifest.appCommit) {
  fail("Devin has been updated since this patch was installed. No files were changed.");
}
manifest.desktopVersion ||= product.windsurfVersion;

const sourceBytes = fs.readFileSync(localizerSource);
const sourceText = sourceBytes.toString("utf8");
if (!sourceText.includes(marker)) fail("The v2 localization marker is missing from the source script.");
const dictionary = readDictionary(sourceText);
const localizerTarget = path.join(appRoot, manifest.localizer.rel);
if (sha256(fs.readFileSync(localizerTarget)) !== manifest.localizer.sha256) {
  fail("The installed localizer changed outside this refresh; no files were changed.");
}

const backupRoot = path.resolve(stateRoot, manifest.backupRoot);
if (!backupRoot.startsWith(stateRoot + path.sep)) fail("The recorded backup folder is outside the localization state folder.");

const before = new Map([["product.json", productBytes]]);
const replacements = new Map();
const appended = Buffer.from(`\n;\n${sourceText}\n`, "utf8");
let catalogReplacementCount = 0;
for (const entry of manifest.files) {
  const backup = fs.readFileSync(path.join(backupRoot, entry.backupRel));
  if (sha256(backup) !== entry.originalSha256) fail(`The saved original for ${entry.rel} failed its integrity check.`);
  if (entry.rel === "product.json") continue;
  const target = path.join(appRoot, entry.rel);
  const current = fs.readFileSync(target);
  if (sha256(current) !== entry.patchedSha256) fail(`The patched file ${entry.rel} has changed; no files were changed.`);
  if (entry.checksumKey && product.checksums?.[entry.checksumKey] !== entry.patchedChecksum) {
    fail(`Devin's checksum entry for ${entry.rel} changed; no files were changed.`);
  }
  before.set(entry.rel, current);
  if (entry.rel.endsWith("windsurf-chat-client/index.js") || entry.rel.endsWith("sessions/sessions.desktop.main.js")) {
    if (backup.toString("utf8").includes(marker)) fail(`The backup ${entry.rel} unexpectedly contains a localizer marker.`);
    const localized = localizeCatalogs(backup.toString("utf8"), dictionary);
    catalogReplacementCount += localized.replacements;
    replacements.set(entry.rel, Buffer.concat([Buffer.from(localized.source, "utf8"), appended]));
  } else {
    replacements.set(entry.rel, current);
  }
}
if (sha256(sourceBytes) === manifest.localizer.sha256) {
  console.log("The localizer has no changes to refresh.");
  process.exit(0);
}

const nextProduct = JSON.parse(productBytes.toString("utf8"));
for (const entry of manifest.files) {
  if (!entry.checksumKey) continue;
  entry.patchedSha256 = sha256(replacements.get(entry.rel));
  entry.patchedChecksum = checksum(replacements.get(entry.rel));
  nextProduct.checksums[entry.checksumKey] = entry.patchedChecksum;
}
const nextProductBytes = Buffer.from(JSON.stringify(nextProduct, null, 2) + "\n", "utf8");
before.set("manifest.json", manifestBytes);
before.set(manifest.localizer.rel, fs.readFileSync(localizerTarget));
const nextLocalizerHash = sha256(sourceBytes);
const oldLocalizer = { ...manifest.localizer };
manifest.localizer.sha256 = nextLocalizerHash;
const productEntry = manifest.files.find((entry) => entry.rel === "product.json");
if (productEntry) productEntry.patchedSha256 = sha256(nextProductBytes);

try {
  for (const [rel, bytes] of replacements) fs.writeFileSync(path.join(appRoot, rel), bytes);
  fs.writeFileSync(localizerTarget, sourceBytes);
  fs.writeFileSync(productPath, nextProductBytes);
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + "\n", "utf8");
} catch (error) {
  for (const [rel, bytes] of before) {
    try {
      if (rel === "manifest.json") fs.writeFileSync(manifestPath, bytes);
      else if (rel === manifest.localizer.rel) fs.writeFileSync(localizerTarget, bytes);
      else if (rel === "product.json") fs.writeFileSync(productPath, bytes);
      else fs.writeFileSync(path.join(appRoot, rel), bytes);
    } catch {}
  }
  manifest.localizer = oldLocalizer;
  throw error;
}

console.log("Updated the installed Chinese UI dictionary and refreshed Devin's matching checksums.");
console.log(`Localized ${catalogReplacementCount} built-in interface strings in the embedded catalogs.`);
console.log("The open Devin window was not closed; the expanded translations load after your next restart.");
