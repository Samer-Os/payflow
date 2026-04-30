/**
 * One-off script to convert large PNGs/JPGs (>100 KB) in public/images/ to WebP.
 * Originals are kept as fallback; WebP copies are written alongside them.
 *
 * Usage:  node scripts/optimize-images.mjs
 */

import { readdir, stat } from "node:fs/promises";
import { join, extname, basename } from "node:path";
import sharp from "sharp";

const IMG_DIR = new URL("../public/images", import.meta.url).pathname.replace(
  /^\//,
  ""
);
const SIZE_THRESHOLD = 100 * 1024; // 100 KB
const EXTENSIONS = new Set([".png", ".jpg", ".jpeg"]);

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(full)));
    } else if (EXTENSIONS.has(extname(entry.name).toLowerCase())) {
      files.push(full);
    }
  }
  return files;
}

async function main() {
  const files = await walk(IMG_DIR);
  let converted = 0;

  for (const file of files) {
    const info = await stat(file);
    if (info.size < SIZE_THRESHOLD) continue;

    const outPath = file.replace(/\.(png|jpe?g)$/i, ".webp");
    const sizeBefore = (info.size / 1024).toFixed(0);

    await sharp(file).webp({ quality: 80 }).toFile(outPath);

    const outInfo = await stat(outPath);
    const sizeAfter = (outInfo.size / 1024).toFixed(0);

    console.log(
      `✔ ${basename(file)} (${sizeBefore} KB) → ${basename(outPath)} (${sizeAfter} KB)`
    );
    converted++;
  }

  console.log(`\nDone. Converted ${converted} image(s).`);
}

main().catch(console.error);
