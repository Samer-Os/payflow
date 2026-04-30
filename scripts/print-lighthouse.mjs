import { readFile } from "node:fs/promises";

async function summarize(path, label) {
  const r = JSON.parse(await readFile(path, "utf8"));
  const c = r.categories;
  if (!c?.performance) {
    console.log(`${label}: report incomplete (no scores)`);
    return;
  }
  const pct = (x) => Math.round(x.score * 100);
  console.log(`\n=== ${label} ===`);
  console.log(`Performance:    ${pct(c.performance)}`);
  console.log(`Accessibility:  ${pct(c.accessibility)}`);
  console.log(`Best Practices: ${pct(c["best-practices"])}`);
  console.log(`SEO:            ${pct(c.seo)}`);
  console.log(`LCP:  ${r.audits["largest-contentful-paint"].displayValue}`);
  console.log(`TBT:  ${r.audits["total-blocking-time"].displayValue}`);
  console.log(`CLS:  ${r.audits["cumulative-layout-shift"].displayValue}`);
  console.log(`FCP:  ${r.audits["first-contentful-paint"].displayValue}`);
}

await summarize("./lighthouse-desktop.json", "Desktop");
try {
  await summarize("./lighthouse-report.json", "Mobile");
} catch {}
