import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock prisma before importing auth
vi.mock("@/lib/prisma", () => ({
  prisma: {
    $connect: vi.fn(),
    $disconnect: vi.fn(),
  },
}));

describe("auth configuration", () => {
  it("should export handler from better-auth", async () => {
    const { handler } = await import("@/lib/auth");

    // Handler should be a function (Next.js route handler)
    expect(handler).toBeDefined();
    expect(typeof handler).toBe("function");
  });

  it("should have expected shape of exported module", async () => {
    const authModule = await import("@/lib/auth");

    // Should have handler export
    expect(authModule).toHaveProperty("handler");
  });
});
