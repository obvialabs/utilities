/**
 * Enable and bind a vertex attribute to a buffer
 *
 * **Parameters**
 * - `gl` – Target WebGL rendering context
 * - `program` – Linked shader program
 * - `name` – Attribute name in the shader (e.g. "aPosition")
 * - `size` – Number of components per vertex (e.g. 2 for vec2, 3 for vec3)
 * - `type` – Data type (e.g. `gl.FLOAT`)
 * - `stride` – Byte offset between consecutive attributes (default: 0)
 * - `offset` – Byte offset of the first component (default: 0)
 *
 * **Usage**
 * ```ts
 * // Vertex shader example:
 * // attribute vec2 aPosition;
 *
 * // Create a quad vertex buffer
 * const vbo = createQuadBuffer(gl, positionLocation)
 *
 * // Bind the buffer to the "aPosition" attribute in the shader
 * bindAttribute(gl, program, "aPosition", 2, gl.FLOAT)
 *
 * // Now you can draw using the bound attribute
 * gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
 * ```
 */
export function bindAttribute(
  gl: WebGLRenderingContext,
  program: WebGLProgram,
  name: string,
  size: number,
  type: number,
  stride: number = 0,
  offset: number = 0
): void {
  const location = gl.getAttribLocation(program, name)
  if (location === -1) {
    throw new Error(`Attribute "${name}" not found in shader program`)
  }

  gl.enableVertexAttribArray(location)
  gl.vertexAttribPointer(location, size, type, false, stride, offset)
}

/**
 * Enable a vertex attribute
 *
 * **Parameters**
 * - `gl` – Target WebGL rendering context
 * - `program` – Linked shader program
 * - `name` – Attribute name in the shader (e.g. "aPosition")
 *
 * **Usage**
 * ```ts
 * // Vertex shader example:
 * // attribute vec3 aPosition;
 *
 * // Enable the "aPosition" attribute
 * enableAttribute(gl, program, "aPosition")
 *
 * // After enabling, you can bind a buffer and set pointer
 * gl.bindBuffer(gl.ARRAY_BUFFER, vbo)
 * gl.vertexAttribPointer(location, 3, gl.FLOAT, false, 0, 0)
 * ```
 */
export function enableAttribute(
  gl: WebGLRenderingContext,
  program: WebGLProgram,
  name: string
): void {
  const location = gl.getAttribLocation(program, name)
  if (location === -1) {
    throw new Error(`Attribute "${name}" not found in shader program`)
  }
  gl.enableVertexAttribArray(location)
}

/**
 * Disable a vertex attribute
 *
 * **Parameters**
 * - `gl` – Target WebGL rendering context
 * - `program` – Linked shader program
 * - `name` – Attribute name in the shader
 *
 * **Usage**
 * ```ts
 * // Vertex shader example:
 * // attribute vec2 aTexCoord;
 *
 * // Disable the "aTexCoord" attribute when it's not needed
 * disableAttribute(gl, program, "aTexCoord")
 *
 * // This prevents unnecessary GPU work for unused attributes
 * ```
 */
export function disableAttribute(
  gl: WebGLRenderingContext,
  program: WebGLProgram,
  name: string
): void {
  const location = gl.getAttribLocation(program, name)
  if (location !== -1) {
    gl.disableVertexAttribArray(location)
  }
}
