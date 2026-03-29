/**
 * Configuration options for resizing a canvas element
 */
export interface ResizeCanvasOptions {
  /**
   * Maximum constraints for canvas scaling
   *
   * - `dpr` - Maximum device pixel ratio (default: 1.5)
   * - `width` - Maximum canvas width (default: Infinity)
   * - `height` - Maximum canvas height (default: Infinity)
   */
  max?: {
    dpr?: number
    width?: number
    height?: number
  }

  /**
   * Minimum constraints for canvas scaling
   *
   * - `dpr` - Minimum device pixel ratio (default: 1)
   * - `width` - Minimum canvas width (default: 1)
   * - `height`- Minimum canvas height (default: 1)
   */
  min?: {
    dpr?: number
    width?: number
    height?: number
  }

  /**
   * Device pixel ratio source
   */
  source?: number
}

/**
 * Resize a canvas element based on its bounding box and a device pixel ratio source
 *
 * **Parameters**
 * - `canvas` – Target canvas element to resize
 * - `options` – Optional configuration object
 *    - `max` – Maximum constraints
 *       - `dpr` – Maximum device pixel ratio (default: 1.5)
 *       - `width` – Maximum canvas width (default: Infinity)
 *       - `height` – Maximum canvas height (default: Infinity)
 *    - `min` – Minimum constraints
 *       - `dpr` – Minimum device pixel ratio (default: 1)
 *       - `width` – Minimum canvas width (default: 1)
 *       - `height` – Minimum canvas height (default: 1)
 *    - `source` – Device pixel ratio source (default: `window.devicePixelRatio || 1`)
 *
 * **Usage**
 * ```ts
 * // Default usage (uses window.devicePixelRatio)
 * resizeCanvas(canvas)
 *
 * // Custom DPR source
 * resizeCanvas(canvas, { source: 2 })
 *
 * // Custom min/max constraints
 * resizeCanvas(canvas, { max: { dpr: 2 }, min: { width: 10, height: 10 } })
 * ```
 */
export function resizeCanvas(
  canvas: HTMLCanvasElement,
  options: ResizeCanvasOptions = {}
) {
  const {
    max: {
      dpr: maxDpr = 1.5,
      width: maxWidth = Infinity,
      height: maxHeight = Infinity
    } = {},
    min: {
      dpr: minDpr = 1,
      width: minWidth = 1,
      height: minHeight = 1
    } = {},
    source = window.devicePixelRatio || 1
  } = options

  // Calculate device pixel ratio with min/max limits
  const dpr = Math.min(Math.max(source || 1, minDpr), maxDpr)

  // Get canvas size from its bounding box
  const { width, height } = canvas.getBoundingClientRect()

  // Apply DPR scaling with min/max constraints
  canvas.width = Math.min(
    maxWidth,
    Math.max(minWidth, Math.floor(width * dpr))
  )
  canvas.height = Math.min(
    maxHeight,
    Math.max(minHeight, Math.floor(height * dpr))
  )
}
