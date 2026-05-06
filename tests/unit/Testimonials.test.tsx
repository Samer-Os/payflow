/**
 * Testimonials is a pure async RSC — cannot render in jsdom. Tests cover
 * the locale contract (dictionary shape) that the component depends on.
 */
import { describe, it, expect } from "vitest";
import { getDictionary } from "@/context/LanguageContext";

describe("Testimonials — locale contract", () => {
  const en = getDictionary("en").testimonials;
  const tr = getDictionary("tr").testimonials;

  it("has a non-empty title1 in English", () => {
    expect(en.title1.length).toBeGreaterThan(0);
  });

  it("has exactly 3 testimonial items in English", () => {
    const items = en.items as Record<string, unknown>;
    expect(Object.keys(items).length).toBe(3);
  });

  it("each English testimonial item has quote, name, and role", () => {
    const items = en.items as Record<string, { quote: string; name: string; role: string }>;
    Object.values(items).forEach((item) => {
      expect(item.quote.length).toBeGreaterThan(0);
      expect(item.name.length).toBeGreaterThan(0);
      expect(item.role.length).toBeGreaterThan(0);
    });
  });

  it("Turkish locale also has 3 testimonial items", () => {
    const items = tr.items as Record<string, unknown>;
    expect(Object.keys(items).length).toBe(3);
  });

  it("Turkish testimonials have translated quotes (different from English)", () => {
    const enItems = en.items as Record<string, { quote: string }>;
    const trItems = tr.items as Record<string, { quote: string }>;
    expect(trItems[0].quote).not.toBe(enItems[0].quote);
  });
});
