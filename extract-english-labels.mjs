import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const args = process.argv.slice(2);
const missingOnly = args.includes("--missing");
const appRoot = args.find((argument) => !argument.startsWith("--")) || process.env.DEVIN_APP_ROOT;
if (!appRoot) throw new Error("Pass the Devin resources/app folder or set DEVIN_APP_ROOT.");
const bundlePath = path.join(appRoot, "out/vs/workbench/windsurf-chat-client/index.js");
const source = fs.readFileSync(bundlePath, "utf8");
const singleQuote = String.fromCharCode(39);
const pattern = new RegExp("JSON\\.parse\\(" + singleQuote + "((?:\\\\.|[^" + singleQuote + "\\\\])*)" + singleQuote + "\\)", "g");

function decodeJsString(value) {
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
      const digits = value.slice(i + 1, i + 3);
      result += String.fromCharCode(parseInt(digits, 16));
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

const counts = new Map();
let catalogs = 0;
function collect(value) {
  if (typeof value === "string") {
    const text = value.trim();
    if (text.length < 2 || text.length > 100 || !/[A-Za-z]/.test(text)) return;
    if (!/^[A-Za-z0-9\s,.'!?&()/:+\-–—%#@…’“”=]+$/.test(text)) return;
    if (!text.includes(" ")) return;
    counts.set(text, (counts.get(text) || 0) + 1);
  } else if (Array.isArray(value)) {
    for (const item of value) collect(item);
  } else if (value && typeof value === "object") {
    for (const item of Object.values(value)) collect(item);
  }
}

function isDefaultEnglishCatalog(catalog, offset) {
  const keys = Object.keys(catalog);
  const isUiCatalog = keys.includes("artifactShares") || keys.includes("guide");
  if (!isUiCatalog) return false;

  // Devin embeds its English fallback catalogs in the main bundle and places
  // translated catalogs in webpack modules such as `e.exports=JSON.parse(...)`.
  const prefix = source.slice(Math.max(0, offset - 32), offset);
  return !/\w\.exports=$/.test(prefix);
}

for (const match of source.matchAll(pattern)) {
  try {
    const catalog = JSON.parse(decodeJsString(match[1]));
    if (!isDefaultEnglishCatalog(catalog, match.index)) continue;
    catalogs++;
    collect(catalog);
  } catch {}
}

if (!catalogs) throw new Error("No English UI message catalogs were found in this build.");
const localizerPath = path.join(path.dirname(fileURLToPath(import.meta.url)), "devin-zh-cn-localizer.js");
const localizerSource = fs.readFileSync(localizerPath, "utf8");
const declaration = localizerSource.indexOf("const dictionary = Object.freeze({");
const dictionaryStart = localizerSource.indexOf("{", declaration);
const dictionaryEnd = localizerSource.indexOf("\n  });", dictionaryStart);
if (declaration < 0 || dictionaryStart < 0 || dictionaryEnd < 0) {
  throw new Error("The localization dictionary could not be read.");
}
const dictionary = JSON.parse(localizerSource.slice(dictionaryStart, dictionaryEnd).trim() + "}");
const foldedDictionary = new Map();
for (const [key, value] of Object.entries(dictionary)) {
  const folded = key.toLocaleLowerCase();
  if (foldedDictionary.has(folded) && foldedDictionary.get(folded) !== value) foldedDictionary.set(folded, null);
  else if (!foldedDictionary.has(folded)) foldedDictionary.set(folded, value);
}
const translationPatterns = [
  /^(\d+)\s+days?\s+ago$/i, /^(\d+)\s+hours?\s+ago$/i, /^(\d+)\s+minutes?\s+ago$/i,
  /^(\d+)\s+seconds?\s+ago$/i, /^Notifications\s+(alt\+T)$/i,
  /^Tip: Change Devin's model and capabilities\s*\(([^)]+)\)$/i,
  /^(Back|Forward|Toggle Sidebar|Skip to main content)\s*(\([^)]*\))$/i,
  /^Last fetched:\s*(.+)$/i, /^(\d+)\s+of\s+(\d+)\s+items? still need input\.?$/i,
  /^(\d+)\s+results?$/i, /^(\d+)\s+repositories$/i, /^Options for\s+(.+)$/i,
  /^Change shortcut\s+(.+?)\s+for\s+(.+)$/i, /^Remove\s+(.+?)\s+from\s+(.+)$/i,
  /^Published\s+(.+)$/i, /^Remove\s+(.+)$/i, /^(\d+)\s+sessions?$/i, /^(\d+)\s+tasks?$/i
];
function hasTranslation(label) {
  const trimmed = label.trim();
  if (Object.prototype.hasOwnProperty.call(dictionary, trimmed)) return true;
  if (foldedDictionary.get(trimmed.toLocaleLowerCase())) return true;
  if (translationPatterns.some((pattern) => pattern.test(trimmed))) return true;
  const punctuation = trimmed.match(/^(.+?)([.!?…]+)$/);
  return !!(punctuation && hasTranslation(punctuation[1]));
}

console.log(`English UI catalogs=${catalogs} candidates=${counts.size}`);
const rows = [...counts]
  .filter(([label, count]) => (missingOnly || count >= 3) && /^[\x20-\x7E]+$/.test(label))
  .filter(([label]) => !missingOnly || !hasTranslation(label))
  .sort((a, b) => b[1] - a[1] || a[0].length - b[0].length);
if (missingOnly) console.log(`Untranslated candidate phrases=${rows.length}`);
console.log(rows.slice(0, 500).map(([label, count]) => `${count}\t${label}`).join("\n"));
