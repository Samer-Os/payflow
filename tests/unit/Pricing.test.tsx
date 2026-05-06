/**
 * Pricing RSC shell is async — tests target PricingClient (the "use client"
 * component with all interactive logic) directly, using the real en dict.
 */
import { describe, it, expect } from "vitest";
import { renderWithProviders } from "../utils/render";
import userEvent from "@testing-library/user-event";
import PricingClient from "@/components/Home/Pricing/Client";
import { getDictionary } from "@/context/LanguageContext";

const dict = getDictionary("en").pricing;

describe("PricingClient", () => {
  it("renders heading containing 'transparent pricing'", () => {
    const { container } = renderWithProviders(<PricingClient dict={dict} />);
    const h2 = container.querySelector("h2");
    expect(h2).toBeInTheDocument();
    expect(h2?.textContent?.toLowerCase()).toContain("transparent pricing");
  });

  it("renders monthly/annually tabs with role=tab", () => {
    const { getAllByRole } = renderWithProviders(<PricingClient dict={dict} />);
    const tabs = getAllByRole("tab");
    expect(tabs.length).toBe(2);
    expect(tabs[0]).toHaveAttribute("aria-selected", "true");
    expect(tabs[1]).toHaveAttribute("aria-selected", "false");
  });

  it("switches to annually when that tab is clicked", async () => {
    const user = userEvent.setup();
    const { getAllByRole } = renderWithProviders(<PricingClient dict={dict} />);
    const tabs = getAllByRole("tab");

    await user.click(tabs[1]);

    expect(tabs[1]).toHaveAttribute("aria-selected", "true");
    expect(tabs[0]).toHaveAttribute("aria-selected", "false");
  });

  it("tabs have aria-controls pointing to the tabpanel", () => {
    const { getAllByRole, getByRole } = renderWithProviders(<PricingClient dict={dict} />);
    const tabs = getAllByRole("tab");
    const panelId = tabs[0].getAttribute("aria-controls");

    expect(panelId).toBe("pricing-panel");

    const panel = getByRole("tabpanel");
    expect(panel).toHaveAttribute("id", panelId);
  });

  it("tabpanel has aria-live for screen reader announcements", () => {
    const { getByRole } = renderWithProviders(<PricingClient dict={dict} />);
    expect(getByRole("tabpanel")).toHaveAttribute("aria-live", "polite");
  });

  it("renders at least three plan headings", () => {
    const { container } = renderWithProviders(<PricingClient dict={dict} />);
    const h3s = container.querySelectorAll("h3");
    expect(h3s.length).toBeGreaterThanOrEqual(3);
  });
});
