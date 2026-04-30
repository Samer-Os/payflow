import { chromium } from "@playwright/test";
import { resolve } from "node:path";
import { mkdir } from "node:fs/promises";

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 1200, height: 900 },
  deviceScaleFactor: 2,
});
const page = await ctx.newPage();
const url = "file:///" + resolve("lighthouse-desktop.html").replace(/\\/g, "/");
await page.goto(url, { waitUntil: "load" });
await page.waitForTimeout(1500);

await mkdir("public/readme", { recursive: true });

// Capture just the score gauges row
const scoreRow = page.locator(".lh-scores-wrapper, .lh-scores-container").first();
try {
  await scoreRow.scrollIntoViewIfNeeded();
  await scoreRow.screenshot({ path: "public/readme/lighthouse.png" });
  console.log("✔ public/readme/lighthouse.png");
} catch {
  // Fallback: full top viewport
  await page.screenshot({
    path: "public/readme/lighthouse.png",
    clip: { x: 0, y: 0, width: 1200, height: 400 },
  });
  console.log("✔ public/readme/lighthouse.png (fallback crop)");
}

await browser.close();
