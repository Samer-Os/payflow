import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("Accessibility (axe-core)", () => {
  test("homepage has no serious or critical WCAG 2.1 AA violations", async ({
    page,
  }) => {
    await page.goto("/");

    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();

    const seriousOrCritical = results.violations.filter(
      (v) => v.impact === "serious" || v.impact === "critical"
    );

    if (seriousOrCritical.length > 0) {
      console.log(
        "Violations:",
        JSON.stringify(
          seriousOrCritical.map((v) => ({
            id: v.id,
            impact: v.impact,
            description: v.description,
            nodes: v.nodes.length,
          })),
          null,
          2
        )
      );
    }

    expect(seriousOrCritical).toEqual([]);
  });
});
