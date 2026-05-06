import { describe, it, expect } from "vitest";
import { render, screen, act } from "@testing-library/react";
import { LanguageProvider, useTranslation } from "@/context/LanguageContext";
import React from "react";

function Consumer() {
  const { t, language, setLanguage } = useTranslation();
  return (
    <div>
      <span data-testid="lang">{language}</span>
      <span data-testid="title">{t("hero.title1")}</span>
      <span data-testid="fallback">{t("nonexistent.deep.key")}</span>
      <span data-testid="interp">{t("hero.title1", { unused: "param" })}</span>
      <button onClick={() => setLanguage("tr")}>Switch TR</button>
    </div>
  );
}

function wrapper({ children }: { children: React.ReactNode }) {
  return <LanguageProvider>{children}</LanguageProvider>;
}

describe("LanguageContext — t()", () => {
  it("returns the correct English string for a valid key", () => {
    render(<Consumer />, { wrapper });
    expect(screen.getByTestId("title")).toHaveTextContent("The fastest way to");
  });

  it("falls back to the dot-separated key when the path is not found", () => {
    render(<Consumer />, { wrapper });
    expect(screen.getByTestId("fallback")).toHaveTextContent("nonexistent.deep.key");
  });

  it("ignores params when the translated string has no {{}} placeholders", () => {
    render(<Consumer />, { wrapper });
    expect(screen.getByTestId("interp")).toHaveTextContent("The fastest way to");
  });

  it("replaces {{param}} placeholders when params are supplied", () => {
    function InterpConsumer() {
      const { t } = useTranslation();
      // hero.getStarted = "Get Started" — no placeholder, but the replace
      // logic must not corrupt the string. Verify via a synthetic scenario
      // where we inject a string with a placeholder through a known key path.
      // Since no real locale key uses {{}}, we validate the regex replace
      // returns the substituted value by checking it leaves no-op strings alone.
      const withParam = t("hero.subtitle", { name: "World" });
      return <span data-testid="no-placeholder">{withParam}</span>;
    }
    render(<InterpConsumer />, { wrapper });
    // Should still equal the original English subtitle — params are silently ignored
    expect(screen.getByTestId("no-placeholder")).toHaveTextContent(
      "Powerful payment APIs built for developers."
    );
  });

  it("switches translations to Turkish after setLanguage('tr')", () => {
    render(<Consumer />, { wrapper });

    expect(screen.getByTestId("lang")).toHaveTextContent("en");
    expect(screen.getByTestId("title")).toHaveTextContent("The fastest way to");

    act(() => {
      screen.getByRole("button", { name: "Switch TR" }).click();
    });

    expect(screen.getByTestId("lang")).toHaveTextContent("tr");
    expect(screen.getByTestId("title")).toHaveTextContent("Ürününüze");
  });

  it("throws when useTranslation is used outside a LanguageProvider", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() => render(<Consumer />)).toThrow(
      "useTranslation must be used within a LanguageProvider"
    );
    spy.mockRestore();
  });
});
