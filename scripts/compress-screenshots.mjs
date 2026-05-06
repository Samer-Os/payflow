import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, "..", "public", "readme");

async function compressScreenshots() {
  const files = await fs.readdir(publicDir);
  const pngFiles = files.filter((f) => f.endsWith(".png"));

  for (const file of pngFiles) {
    const filePath = path.join(publicDir, file);
    const stats = await fs.stat(filePath);
    const sizeKB = stats.size / 1024;

    if (sizeKB > 100) {
      console.log(`Would compress ${file} (${sizeKB.toFixed(1)} KB) - requires sharp`);
      // In production, use sharp to convert to WebP/AVIF
      // await sharp(filePath).webp({ quality: 85 }).toFile(filePath.replace('.png', '.webp'));
    } else {
      console.log(`${file} is already small (${sizeKB.toFixed(1)} KB)`);
    }
  }
}

compressScreenshots().catch(console.error);
