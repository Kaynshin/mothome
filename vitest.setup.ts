import "@testing-library/jest-dom";
import { afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";
import React from "react";

// Polyfill React.act for React 19 + React Testing Library
if (!React.act) {
  React.act = (callback: () => void | Promise<void> | PromiseLike<void>) => {
    return Promise.resolve().then(() => callback());
  };
}

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Mock Next.js Image component
vi.mock("next/image", () => ({
  __esModule: true,
  default: ({
    src,
    alt,
    ...props
  }: {
    src: string;
    alt: string;
    [key: string]: unknown;
  }) => React.createElement("img", { src, alt, ...props }),
}));

// Mock Next.js Link component
vi.mock("next/link", () => ({
  __esModule: true,
  default: ({ children, href, ...props }: unknown) =>
    React.createElement("a", { href: href as string, ...props }, children),
}));
