import fs from "node:fs";
import path from "node:path";

const appRoot = process.argv[2] || process.env.DEVIN_APP_ROOT;
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
console.log(`English UI catalogs=${catalogs} candidates=${counts.size}`);
const rows = [...counts]
  .filter(([label, count]) => count >= 3 && /^[\x20-\x7E]+$/.test(label))
  .sort((a, b) => b[1] - a[1] || a[0].length - b[0].length);
console.log(rows.slice(0, 500).map(([label, count]) => `${count}\t${label}`).join("\n"));
