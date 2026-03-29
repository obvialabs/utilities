/**
 * Configuration options for creating a WebGL context
 */
export interface CanvasContextOptions extends WebGLContextAttributes {
  /**
   * Suppress console error logging if WebGL cannot be created (unsupported, browser or device limits)
   *
   * @default false
   */
  silently?: boolean
}

/**
 * Safely obtain a WebGL rendering context from a canvas element
 *
 * **Parameters**
 * - `canvas` – Target canvas element to initialize **WebGL** on
 * - `options` – Optional canvas context options (extends **WebGL** context attributes)
 *    - `*` - Inherits all standard **WebGL** context attributes
 *    - `silently` - Suppress error logging if **WebGL** cannot be created (default: false)
 *
 * **Usage**
 * ```ts
 * // Default usage
 * const gl = canvasContext({ canvas })
 *
 * // Custom options
 * const gl = canvasContext({
 *   canvas,
 *   options: { antialias: false, depth: false, silently: true }
 * })
 *
 * if (!gl) {
 *   // Handle fallback manually if needed
 * }
 * ```
 */
export function canvasContext({
  canvas,
  options = {}
}: {
  canvas: HTMLCanvasElement
  options?: CanvasContextOptions
}): WebGLRenderingContext | null {
  // Attempt to obtain a WebGL rendering context from the given canvas
  const webGL = canvas.getContext("webgl", options)

  // If WebGL is not supported and silently is not enabled, log an error
  if (!webGL && !options.silently) {
    console.error(
      "Failed to initialize WebGL context. " +
      "This browser or device may not support WebGL, " +
      "or the provided context attributes are not compatible.",
      { canvas, options }
    )
  }

  // Return the WebGLRenderingContext if available, otherwise null
  return webGL
}

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
): void {
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
