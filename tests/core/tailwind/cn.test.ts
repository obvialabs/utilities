import { describe, it, expect } from "vitest"
import { cn } from "@obvia/utilities"

describe("tailwind suite", () => {
  describe("cn()", () => {
    it("returns a single class string unchanged", () => {
      expect(cn("p-4")).toBe("p-4")
    })
    it("merges multiple class strings", () => {
      expect(cn("p-2", "text-center")).toBe("p-2 text-center")
    })
    it("ignores falsy values", () => {
      expect(cn("p-2", false, null, undefined, "text-center"))
        .toBe("p-2 text-center")
    })
    it("resolves object-based conditional classes", () => {
      expect(cn({ "p-4": true, hidden: false })).toBe("p-4")
    })
    it("merges conflicting Tailwind classes (last wins)", () => {
      expect(cn("p-2", "p-4")).toBe("p-4")
      expect(cn("text-left", "text-center")).toBe("text-center")
    })
    it("handles arrays of class values", () => {
      expect(cn(["p-2", "text-center"], "bg-red-500"))
        .toBe("p-2 text-center bg-red-500")
    })
    it("handles mixed inputs (string, object, array)", () => {
      const result = cn(
        "p-2",
        { hidden: false, "text-center": true },
        ["bg-blue-500", null]
      )
      expect(result).toBe("p-2 text-center bg-blue-500")
    })
    it("returns empty string when no inputs provided", () => {
      expect(cn()).toBe("")
    })
    it("handles nested arrays of class values", () => {
      expect(cn([["p-2"], "text-center"], "bg-red-500"))
        .toBe("p-2 text-center bg-red-500")
    })
    it("handles boolean true expressions", () => {
      expect(cn(true && "visible")).toBe("visible")
    })
    it("removes duplicate classes", () => {
      expect(cn("p-4", "p-4")).toBe("p-4")
    })
    it("handles large number of inputs without error", () => {
      const many = Array.from({ length: 1000 }, (_, i) => `c${i}`)
      const result = cn(...many)
      expect(result.includes("c999")).toBe(true)
      expect(result.split(" ").length).toBe(1000)
    })
  })
})
