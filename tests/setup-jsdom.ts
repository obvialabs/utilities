import { afterEach, beforeEach, vi } from "vitest"

beforeEach(() => {
  vi.spyOn(console, "error").mockImplementation(() => {})
})

beforeEach(() => {
  vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue(null)
})

afterEach(() => {
  vi.restoreAllMocks()
})
