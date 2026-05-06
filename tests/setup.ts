import "@testing-library/jest-dom";
import { cleanup } from "@testing-library/react";
import React from "react";
import { afterEach, vi } from "vitest";

// Mock next/headers so async RSC components can be rendered in jsdom tests
vi.mock("next/headers", () => ({
  cookies: vi.fn().mockResolvedValue({
    get: (key: string) => (key === "lang" ? { value: "en" } : undefined),
  }),
}));

afterEach(() => {
  cleanup();
});

// Mock next/image — renders a plain <img> in tests
vi.mock("next/image", () => ({
  __esModule: true,
  default: (props: Record<string, unknown>) => {
    const { fill: _fill, priority: _priority, fetchPriority: _fetchPriority, ...rest } = props;
    return React.createElement("img", rest);
  },
}));

// Mock next/navigation
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
    prefetch: vi.fn(),
    pathname: "/",
  }),
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams(),
}));

// Mock next/link
vi.mock("next/link", () => ({
  __esModule: true,
  default: ({ children, ...props }: { children: React.ReactNode; href: string }) => {
    return React.createElement("a", props, children);
  },
}));

// Mock IntersectionObserver for Reveal component
class MockIntersectionObserver {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
  constructor(callback: IntersectionObserverCallback) {
    // Immediately trigger as intersecting so Reveal children are visible
    setTimeout(() => {
      callback(
        [{ isIntersecting: true, target: document.createElement("div") }] as unknown as IntersectionObserverEntry[],
        this as unknown as IntersectionObserver
      );
    }, 0);
  }
}

Object.defineProperty(window, "IntersectionObserver", {
  writable: true,
  value: MockIntersectionObserver,
});

// Mock matchMedia for useReducedMotion
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});
