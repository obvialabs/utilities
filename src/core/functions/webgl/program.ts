/**
 * Create a new WebGL program object
 *
 * **Parameters**
 * - `context` – Target WebGL rendering context
 *
 * **Usage**
 * ```ts
 * // Create program object
 * const program = createProgram(context)
 *
 * // Compile shaders
 * const vertexShader = compileShader(context, { source: vsSource, type: context.VERTEX_SHADER })
 * const fragmentShader = compileShader(context, { source: fsSource, type: context.FRAGMENT_SHADER })
 *
 * // Link shaders into program
 * linkProgram(context, program, {
 *   vertexShader,
 *   fragmentShader
 * })
 *
 * // Use the program
 * context.useProgram(program)
 * ```
 */
export function createProgram(context: WebGLRenderingContext): WebGLProgram {
  // Attempt to create a new program object
  const program = context.createProgram()

  // If creation failed, throw an error
  if (!program) throw new Error("Failed to create program")

  // Return the successfully created program
  return program
}

export interface LinkProgramOptions {
  vertexShader: WebGLShader
  fragmentShader: WebGLShader
}

/**
 * Attach shaders and link a WebGL program
 *
 * **Parameters**
 * - `context` – Target WebGL rendering context
 * - `program` – Program object created with `createProgram`
 * - `options` – Program configuration
 *    - `vertexShader` – Compiled vertex shader
 *    - `fragmentShader` – Compiled fragment shader
 *
 * **Usage**
 * ```ts
 * // Compile shaders first
 * const vertexShader = compileShader(context, { source: vsSource, type: context.VERTEX_SHADER })
 * const fragmentShader = compileShader(context, { source: fsSource, type: context.FRAGMENT_SHADER })
 *
 * // Create program
 * const program = createProgram(context)
 *
 * // Link shaders into program
 * linkProgram(context, program, {
 *   vertexShader,
 *   fragmentShader
 * })
 *
 * // Use the program
 * context.useProgram(program)
 * ```
 */
export function linkProgram(
  context: WebGLRenderingContext,
  program: WebGLProgram,
  { vertexShader, fragmentShader }: LinkProgramOptions
): void {
  // Attach shaders
  context.attachShader(program, vertexShader)
  context.attachShader(program, fragmentShader)

  // Link program
  context.linkProgram(program)

  // Validate link status
  if (! context.getProgramParameter(program, context.LINK_STATUS)) {
    throw new Error("Program linking failed : " + context.getProgramInfoLog(program))
  }
}
