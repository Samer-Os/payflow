import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, "..", "public");

async function generateOG() {
  const ogPath = path.join(publicDir, "og-image.png");
  
  // Check if OG image exists
  try {
    await fs.access(ogPath);
    console.log("OG image already exists at public/og-image.png");
    console.log("To regenerate, delete it and run this script again.");
    return;
  } catch {
    console.log("OG image not found. Would generate using Playwright or @vercel/og.");
    console.log("For production, implement:");
    console.log("  1. Playwright screenshot capture of hero section");
    console.log("  2. Or @vercel/og dynamic generation");
    console.log("  3. Save to public/og-image.png (1200x630)");
  }
}

generateOG().catch(console.error);
