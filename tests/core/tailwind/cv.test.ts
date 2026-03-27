import { describe, it, expect } from "vitest"
import { cv } from "@obvia/utilities"

describe("tailwind suite", () => {
  describe("cv()", () => {
    it("applies base class only", () => {
      const badge = cv("inline-block")
      expect(badge()).toContain("inline-block")
    })
    it("applies variant classes", () => {
      const badge = cv("inline-block", {
        variants: {
          tone: {
            info: "text-blue-600",
            danger: "text-red-600",
          },
        },
      })

      expect(badge({ tone: "info" })).toContain("text-blue-600")
      expect(badge({ tone: "danger" })).toContain("text-red-600")
    })
    it("applies defaultVariants when no variant provided", () => {
      const button = cv("inline-flex items-center", {
        variants: {
          size: {
            sm: "px-2 py-1 text-sm",
            md: "px-4 py-2 text-base",
          },
        },
        defaultVariants: {
          size: "md",
        },
      })

      expect(button()).toContain("text-base")
      expect(button({ size: "sm" })).toContain("text-sm")
    })
    it("applies compoundVariants correctly", () => {
      const alert = cv("p-4 rounded-md", {
        variants: {
          tone: {
            warning: "bg-yellow-100",
            danger: "bg-red-100",
          },
          emphasis: {
            strong: "font-bold",
            weak: "opacity-70",
          },
          rounded: {
            sm: "rounded-sm",
            md: "rounded-md",
          },
        },
        compoundVariants: [
          {
            tone: "danger",
            emphasis: "strong",
            rounded: "sm",
            class: "text-red-700 border border-red-300",
          },
          {
            tone: "warning",
            emphasis: "weak",
            rounded: "md",
            class: "text-yellow-700",
          },
        ],
      })

      const result = alert({ tone: "danger", emphasis: "strong", rounded: "sm" })
      expect(result).toContain("text-red-700")
      expect(result).toContain("border-red-300")
    })
    it("ignores invalid variant values", () => {
      const badge = cv("inline-block", {
        variants: {
          tone: {
            info: "text-blue-600",
            danger: "text-red-600",
          },
        },
      })

      // @ts-expect-error invalid variant
      expect(badge({ tone: "unknown" })).toBe("inline-block")
    })
    it("merges multiple variants together", () => {
      const button = cv("inline-flex", {
        variants: {
          size: {
            sm: "px-2 py-1 text-sm",
            md: "px-4 py-2 text-base",
          },
          intent: {
            primary: "bg-blue-500 text-white",
            secondary: "bg-gray-200 text-black",
          },
        },
      })

      const result = button({ size: "sm", intent: "primary" })
      expect(result).toContain("px-2")
      expect(result).toContain("bg-blue-500")
    })
    it("handles empty config gracefully", () => {
      // @ts-ignore
      const simple = cv("block", {})
      expect(simple()).toBe("block")
    })
    it("applies multiple compoundVariants when conditions match", () => {
      const comp = cv("base", {
        variants: {
          tone: { danger: "bg-red-100", warning: "bg-yellow-100" },
          emphasis: { strong: "font-bold", weak: "opacity-70" },
        },
        compoundVariants: [
          { tone: "danger", emphasis: "strong", class: "text-red-700" },
          { tone: "danger", emphasis: "strong", class: "border border-red-300" },
        ],
      })

      const result = comp({ tone: "danger", emphasis: "strong" })
      expect(result).toContain("text-red-700")
      expect(result).toContain("border-red-300")
    })
    it("returns only base class when no variants provided", () => {
      const simple = cv("inline-block", {
        variants: {
          tone: { info: "text-blue-600" },
        },
      })
      expect(simple()).toBe("inline-block")
    })
    it("applies defaultVariants together with compoundVariants", () => {
      const comp = cv("base", {
        variants: {
          tone: { danger: "bg-red-100", warning: "bg-yellow-100" },
          emphasis: { strong: "font-bold", weak: "opacity-70" },
        },
        defaultVariants: {
          tone: "danger",
          emphasis: "strong",
        },
        compoundVariants: [
          { tone: "danger", emphasis: "strong", class: "text-red-700" },
        ],
      })

      const result = comp()
      expect(result).toContain("bg-red-100")
      expect(result).toContain("font-bold")
      expect(result).toContain("text-red-700")
    })
  })
})
