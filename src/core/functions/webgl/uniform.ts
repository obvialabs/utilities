/**
 * Set a float uniform (e.g. time, intensity, or scalar value)
 *
 * **Parameters**
 * - `gl` – Target WebGL rendering context
 * - `program` – Linked shader program
 * - `name` – Uniform name in the shader (e.g. "uTime")
 * - `value` – Float value to assign
 *
 * **Usage**
 * ```ts
 * // Fragment shader example:
 * // uniform float uTime;
 *
 * // Set the time uniform to seconds since start
 * setUniform1f(gl, program, "uTime", performance.now() / 1000)
 *
 * // Or set a scalar intensity value
 * setUniform1f(gl, program, "uIntensity", 0.75)
 * ```
 */
export function setUniform1f(
  gl: WebGLRenderingContext,
  program: WebGLProgram,
  name: string,
  value: number
): void {
  const location = gl.getUniformLocation(program, name)
  if (!location) throw new Error(`Uniform "${name}" not found in shader program`)
  gl.uniform1f(location, value)
}

/**
 * Set an integer/boolean uniform (commonly used for flags or texture units)
 *
 * **Parameters**
 * - `gl` – Target WebGL rendering context
 * - `program` – Linked shader program
 * - `name` – Uniform name in the shader (e.g. "uEnabled" or "uTexture")
 * - `value` – Integer value (0/1 for boolean, or texture unit index)
 *
 * **Usage**
 * ```ts
 * // Fragment shader example:
 * // uniform int uEnabled;
 *
 * // Enable a feature flag
 * setUniform1i(gl, program, "uEnabled", 1)
 *
 * // Fragment shader example:
 * // uniform sampler2D uTexture;
 *
 * // Bind texture to unit 0 and assign sampler
 * gl.activeTexture(gl.TEXTURE0)
 * gl.bindTexture(gl.TEXTURE_2D, texture)
 * setUniform1i(gl, program, "uTexture", 0)
 * ```
 */
export function setUniform1i(
  gl: WebGLRenderingContext,
  program: WebGLProgram,
  name: string,
  value: number
): void {
  const location = gl.getUniformLocation(program, name)
  if (!location) throw new Error(`Uniform "${name}" not found in shader program`)
  gl.uniform1i(location, value)
}

/**
 * Set a vec2 uniform (e.g. resolution or offset)
 *
 * **Parameters**
 * - `gl` – Target WebGL rendering context
 * - `program` – Linked shader program
 * - `name` – Uniform name in the shader (e.g. "uResolution")
 * - `x` – First component (e.g. width)
 * - `y` – Second component (e.g. height)
 *
 * **Usage**
 * ```ts
 * // Fragment shader example:
 * // uniform vec2 uResolution;
 *
 * // Set the resolution uniform to canvas size
 * setUniform2f(gl, program, "uResolution", canvas.width, canvas.height)
 *
 * // You can also use it for offsets or directions
 * setUniform2f(gl, program, "uOffset", 10.0, 20.0)
 * ```
 */
export function setUniform2f(
  gl: WebGLRenderingContext,
  program: WebGLProgram,
  name: string,
  x: number,
  y: number
): void {
  const location = gl.getUniformLocation(program, name)
  if (!location) throw new Error(`Uniform "${name}" not found in shader program`)
  gl.uniform2f(location, x, y)
}

/**
 * Set a vec3 uniform (e.g. color or direction)
 *
 * **Parameters**
 * - `gl` – Target WebGL rendering context
 * - `program` – Linked shader program
 * - `name` – Uniform name in the shader (e.g. "uColor")
 * - `x` – First component (e.g. red)
 * - `y` – Second component (e.g. green)
 * - `z` – Third component (e.g. blue)
 *
 * **Usage**
 * ```ts
 * // Fragment shader example:
 * // uniform vec3 uColor;
 *
 * // Set the uniform to red
 * setUniform3f(gl, program, "uColor", 1.0, 0.0, 0.0)
 *
 * // Later you can change it dynamically, e.g. to green
 * setUniform3f(gl, program, "uColor", 0.0, 1.0, 0.0)
 * ```
 */
export function setUniform3f(
  gl: WebGLRenderingContext,
  program: WebGLProgram,
  name: string,
  x: number,
  y: number,
  z: number
): void {
  const location = gl.getUniformLocation(program, name)
  if (!location) throw new Error(`Uniform "${name}" not found in shader program`)
  gl.uniform3f(location, x, y, z)
}

/**
 * Set a mat2 uniform (e.g. rotation matrix)
 *
 * **Parameters**
 * - `gl` – Target WebGL rendering context
 * - `program` – Linked shader program
 * - `name` – Uniform name in the shader (e.g. "uRotation")
 * - `matrix` – 2×2 matrix as a `Float32Array`
 *
 * **Usage**
 * ```ts
 * // Vertex shader example:
 * // uniform mat2 uRotation;
 *
 * // Create a rotation matrix (identity in this case)
 * const rotationMatrix = new Float32Array([
 *   1, 0,
 *   0, 1
 * ])
 *
 * // Bind the matrix to the "uRotation" uniform in the shader
 * setUniformMatrix2fv(gl, program, "uRotation", rotationMatrix)
 * ```
 */
export function setUniformMatrix2fv(
  gl: WebGLRenderingContext,
  program: WebGLProgram,
  name: string,
  matrix: Float32Array
): void {
  const location = gl.getUniformLocation(program, name)
  if (!location) throw new Error(`Uniform "${name}" not found in shader program`)
  gl.uniformMatrix2fv(location, false, matrix)
}

/**
 * Set a mat3 uniform (e.g. normal matrix)
 *
 * **Parameters**
 * - `gl` – Target WebGL rendering context
 * - `program` – Linked shader program
 * - `name` – Uniform name in the shader (e.g. "uNormalMatrix")
 * - `matrix` – 3×3 matrix as a `Float32Array`
 *
 * **Usage**
 * ```ts
 * // Vertex shader example:
 * // uniform mat3 uNormalMatrix;
 *
 * // Create a normal matrix (identity in this case)
 * const normalMatrix = new Float32Array([
 *   1, 0, 0,
 *   0, 1, 0,
 *   0, 0, 1
 * ])
 *
 * // Bind the matrix to the "uNormalMatrix" uniform in the shader
 * setUniformMatrix3fv(gl, program, "uNormalMatrix", normalMatrix)
 * ```
 */
export function setUniformMatrix3fv(
  gl: WebGLRenderingContext,
  program: WebGLProgram,
  name: string,
  matrix: Float32Array
): void {
  const location = gl.getUniformLocation(program, name)
  if (!location) throw new Error(`Uniform "${name}" not found in shader program`)
  gl.uniformMatrix3fv(location, false, matrix)
}

/**
 * Set a mat4 uniform (e.g. transformation matrix)
 *
 * **Parameters**
 * - `gl` – Target WebGL rendering context
 * - `program` – Linked shader program
 * - `name` – Uniform name in the shader (e.g. "uProjection")
 * - `matrix` – 4×4 matrix as a `Float32Array`
 *
 * **Usage**
 * ```ts
 * // Vertex shader example:
 * // uniform mat4 uProjection;
 *
 * // Create a projection matrix (identity in this case)
 * const projectionMatrix = new Float32Array([
 *   1, 0, 0, 0,
 *   0, 1, 0, 0,
 *   0, 0, 1, 0,
 *   0, 0, 0, 1
 * ])
 *
 * // Bind the matrix to the "uProjection" uniform in the shader
 * setUniformMatrix4fv(gl, program, "uProjection", projectionMatrix)
 * ```
 */
export function setUniformMatrix4fv(
  gl: WebGLRenderingContext,
  program: WebGLProgram,
  name: string,
  matrix: Float32Array
): void {
  const location = gl.getUniformLocation(program, name)
  if (!location) throw new Error(`Uniform "${name}" not found in shader program`)
  gl.uniformMatrix4fv(location, false, matrix)
}

/**
 * Set a sampler uniform (e.g. texture binding)
 *
 * **Parameters**
 * - `gl` – Target WebGL rendering context
 * - `program` – Linked shader program
 * - `name` – Uniform name in the shader (e.g. "uTexture")
 * - `unit` – Texture unit index (e.g. 0 for GL_TEXTURE0)
 *
 * **Usage**
 * ```ts
 * // Fragment shader example:
 * // uniform sampler2D uTexture;
 *
 * gl.activeTexture(gl.TEXTURE0)
 * gl.bindTexture(gl.TEXTURE_2D, texture)
 * setUniformSampler(gl, program, "uTexture", 0)
 * ```
 */
export function setUniformSampler(
  gl: WebGLRenderingContext,
  program: WebGLProgram,
  name: string,
  unit: number
): void {
  const location = gl.getUniformLocation(program, name)
  if (!location) throw new Error(`Uniform "${name}" not found in shader program`)
  gl.uniform1i(location, unit)
}
