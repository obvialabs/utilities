/**
 * Configuration options for creating a WebGL shader object
 */
export interface CreateShaderOptions {
  /**
   * Shader type to create (`VERTEX_SHADER` or `FRAGMENT_SHADER`)
   */
  type: number
}

/**
 * Create a WebGL shader object with the given rendering context
 *
 * **Parameters**
 * - `context` – WebGL rendering context to create the shader in
 * - `options` – Shader configuration
 *    - `type` – Shader type (`VERTEX_SHADER` or `FRAGMENT_SHADER`)
 *
 * **Usage**
 * ```ts
 * // Create a vertex shader
 * const vertexShader = createShader(context, { type: context.VERTEX_SHADER })
 *
 * // Create a fragment shader
 * const fragmentShader = createShader(context, { type: context.FRAGMENT_SHADER })
 * ```
 */
export function createShader(
  context: WebGLRenderingContext,
  { type }: { type: number }
): WebGLShader {
  const shader = context.createShader(type)
  if (!shader) {
    throw new Error("Failed to create shader")
  }
  return shader
}

/**
 * Configuration options for compiling a WebGL shader
 */
export interface CompileShaderOptions {
  /**
   * GLSL source code string to compile
   */
  source: string

  /**
   * Shader type (`VERTEX_SHADER` or `FRAGMENT_SHADER`)
   */
  type: number
}

/**
 * Compile a WebGL shader with the given source code
 *
 * **Parameters**
 * - `context` – WebGL rendering context to compile the shader in
 * - `options` – Shader configuration
 *    - `source` – GLSL source code
 *    - `type` – Shader type (`VERTEX_SHADER` or `FRAGMENT_SHADER`)
 *
 * **Usage**
 * ```ts
 * // Create and compile a vertex shader
 * const vertexShader = compileShader(context, {
 *   source: vsSource,
 *   type: context.VERTEX_SHADER
 * })
 *
 * // Create and compile a fragment shader
 * const fragmentShader = compileShader(context, {
 *   source: fsSource,
 *   type: context.FRAGMENT_SHADER
 * })
 * ```
 */
export function compileShader(
  context: WebGLRenderingContext,
  { source, type }: CompileShaderOptions
): WebGLShader {
  // Create shader object using our utility
  const shader = createShader(context, { type })

  // Attach GLSL source code
  context.shaderSource(shader, source)

  // Compile the shader source
  context.compileShader(shader)

  // Check compilation status and throw if failed
  if (!context.getShaderParameter(shader, context.COMPILE_STATUS)) {
    throw new Error("Shader compilation failed: " + context.getShaderInfoLog(shader))
  }

  // Return the compiled shader object
  return shader
}

/**
 * Delete a WebGL shader object
 *
 * **Parameters**
 * - `context` – WebGL rendering context
 * - `shader` – Shader object to delete
 *
 * **Usage**
 * ```ts
 * // Create and compile a shader
 * const vertexShader = compileShader(context, {
 *   source: vsSource,
 *   type: context.VERTEX_SHADER
 * })
 *
 * // Delete the shader when no longer needed
 * deleteShader(context, vertexShader)
 * ```
 */
export function deleteShader(
  context: WebGLRenderingContext,
  shader: WebGLShader
): void {
  context.deleteShader(shader)
}

/**
 * Validate whether a WebGL shader compiled successfully
 *
 * **Parameters**
 * - `context` – WebGL rendering context
 * - `shader` – Shader object to validate
 *
 * **Usage**
 * ```ts
 * // Compile a shader
 * const vertexShader = compileShader(context, {
 *   source: vsSource,
 *   type: context.VERTEX_SHADER
 * })
 *
 * // Validate compilation result
 * if (!validateShader(context, vertexShader)) {
 *   console.error("Vertex shader failed to compile")
 * }
 * ```
 */
export function validateShader(
  context: WebGLRenderingContext,
  shader: WebGLShader
): boolean {
  // Return true if shader compiled successfully, false otherwise
  return context.getShaderParameter(shader, context.COMPILE_STATUS)
}
