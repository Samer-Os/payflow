import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, act } from "@testing-library/react";
import { Reveal } from "@/components/Common/Reveal";

function noReducedMotion() {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
}

function withReducedMotion() {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: query === "(prefers-reduced-motion: reduce)",
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
}

describe("Reveal", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    noReducedMotion();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders children", () => {
    const { getByText } = render(<Reveal>Content</Reveal>);
    expect(getByText("Content")).toBeInTheDocument();
  });

  it("starts with opacity 0 before IntersectionObserver fires", () => {
    const { container } = render(<Reveal>Hidden</Reveal>);
    const el = container.firstChild as HTMLElement;
    expect(el.style.opacity).toBe("0");
  });

  it("becomes visible (opacity 1) after IntersectionObserver fires", async () => {
    const { container } = render(<Reveal>Animated</Reveal>);
    const el = container.firstChild as HTMLElement;

    expect(el.style.opacity).toBe("0");

    await act(async () => {
      vi.runAllTimers();
    });

    expect(el.style.opacity).toBe("1");
  });

  it("skips animation when prefers-reduced-motion is active", () => {
    withReducedMotion();

    const { container } = render(<Reveal>No animation</Reveal>);
    const el = container.firstChild as HTMLElement;

    // No opacity or transform applied — style object is empty ({})
    expect(el.style.opacity).toBe("");
    expect(el.style.transform).toBe("");
  });

  it("applies a custom delay to the CSS transition", async () => {
    const { container } = render(<Reveal delay={200}>Delayed</Reveal>);

    await act(async () => {
      vi.runAllTimers();
    });

    const el = container.firstChild as HTMLElement;
    expect(el.style.transition).toContain("200ms");
  });

  it("renders as a custom element type via the as prop", () => {
    const { container } = render(<Reveal as="section">Section</Reveal>);
    expect(container.querySelector("section")).toBeInTheDocument();
  });
});
