/**
 * Captures hero and OG screenshots for the README and social cards.
 * Requires the dev server to be running on http://localhost:3000.
 *
 * Usage:
 *   npm run dev   (in another terminal)
 *   node scripts/capture-screenshots.mjs
 */

import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import { dirname } from "node:path";

const targets = [
  {
    out: "public/readme/hero.png",
    viewport: { width: 1440, height: 900 },
    fullPage: false,
    waitMs: 1500,
  },
  {
    out: "public/og-image.png",
    viewport: { width: 1200, height: 630 },
    fullPage: false,
    waitMs: 1500,
  },
];

const browser = await chromium.launch();

for (const t of targets) {
  await mkdir(dirname(t.out), { recursive: true });
  const ctx = await browser.newContext({
    viewport: t.viewport,
    deviceScaleFactor: 2,
  });
  const page = await ctx.newPage();
  await page.goto("http://localhost:3000", { waitUntil: "domcontentloaded" });
  await page.waitForLoadState("load");
  await page.waitForTimeout(t.waitMs); // let animations settle
  await page.screenshot({ path: t.out, fullPage: t.fullPage });
  console.log(`✔ ${t.out} (${t.viewport.width}x${t.viewport.height})`);
  await ctx.close();
}

await browser.close();
console.log("\nScreenshots captured.");
