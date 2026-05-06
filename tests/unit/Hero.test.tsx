/**
 * Hero is an async RSC — cannot render in jsdom. Tests cover:
 * 1. The locale contract Hero reads from (getDictionary)
 * 2. ProductMockup, the "use client" sub-component embedded in Hero
 */
import { describe, it, expect } from "vitest";
import { renderWithProviders } from "../utils/render";
import { getDictionary } from "@/context/LanguageContext";
import ProductMockup from "@/components/Home/Hero/ProductMockup";

describe("Hero — locale contract (en)", () => {
  const dict = getDictionary("en").hero;

  it("title1 mentions 'fastest'", () => {
    expect(dict.title1.toLowerCase()).toContain("fastest");
  });

  it("getStarted label is non-empty", () => {
    expect(dict.getStarted.length).toBeGreaterThan(0);
  });

  it("subtitle is a meaningful sentence", () => {
    expect(dict.subtitle.length).toBeGreaterThan(20);
  });
});

describe("ProductMockup (Hero client component)", () => {
  it("renders 7 weekly bar chart columns", () => {
    const { container } = renderWithProviders(<ProductMockup />);
    const bars = container.querySelectorAll(".mockup-bar");
    expect(bars.length).toBe(7);
  });

  it("renders 3 recent transaction rows", () => {
    const { container } = renderWithProviders(<ProductMockup />);
    const txRows = container.querySelectorAll(".mockup-tx");
    expect(txRows.length).toBe(3);
  });

  it("shows the Stripe Payout transaction name", () => {
    const { getByText } = renderWithProviders(<ProductMockup />);
    expect(getByText("Stripe Payout")).toBeInTheDocument();
  });

  it("shows the total balance label", () => {
    const { getByText } = renderWithProviders(<ProductMockup />);
    expect(getByText(/total balance/i)).toBeInTheDocument();
  });
});
