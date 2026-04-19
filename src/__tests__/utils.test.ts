import { describe, it, expect } from "vitest";
import { cn } from "@/lib/utils";

describe("cn (className merger)", () => {
  it("should merge two class names", () => {
    const result = cn("foo", "bar");
    expect(result).toBe("foo bar");
  });

  it("should handle multiple class names", () => {
    const result = cn("foo", "bar", "baz");
    expect(result).toBe("foo bar baz");
  });

  it("should handle empty strings", () => {
    const result = cn("foo", "", "bar");
    expect(result).toBe("foo bar");
  });

  it("should handle undefined values", () => {
    const result = cn("foo", undefined, "bar");
    expect(result).toBe("foo bar");
  });

  it("should handle null values", () => {
    const result = cn("foo", null, "bar");
    expect(result).toBe("foo bar");
  });

  it("should merge tailwind classes with same base", () => {
    const result = cn("flex", "flex-col");
    expect(result).toBe("flex flex-col");
  });

  it("should handle object input", () => {
    const result = cn({ foo: true, bar: false, baz: true });
    expect(result).toBe("foo baz");
  });

  it("should handle mixed array and object inputs", () => {
    const result = cn("foo", { bar: true, qux: false }, "baz");
    expect(result).toBe("foo bar baz");
  });

  it("should dedupe identical classes", () => {
    const result = cn("flex", "flex");
    expect(result).toBe("flex");
  });
});
