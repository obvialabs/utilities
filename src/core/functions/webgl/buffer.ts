/**
 * Create a generic WebGL buffer and upload data
 *
 * **Parameters**
 * - `gl` – Target WebGL rendering context
 * - `target` – Buffer target (`gl.ARRAY_BUFFER` for vertex data, `gl.ELEMENT_ARRAY_BUFFER` for indices)
 * - `data` – Typed array containing vertex or index data
 * - `usage` – Buffer usage hint (default: `gl.STATIC_DRAW`)
 *
 * **Notes**
 * - This is the core utility used by all specialized buffer helpers
 * - Always pair vertex and index buffers appropriately before drawing
 *
 * **Usage**
 * ```ts
 * // Create a vertex buffer with 3 vertices (triangle)
 * const vertices = new Float32Array([0,0, 1,0, 0,1])
 * const vbo = createBuffer(gl, gl.ARRAY_BUFFER, vertices)
 *
 * // Create an index buffer for a quad (2 triangles)
 * const indices = new Uint16Array([0,1,2, 2,1,3])
 * const ibo = createBuffer(gl, gl.ELEMENT_ARRAY_BUFFER, indices)
 *
 * // Draw using the buffers
 * gl.drawArrays(gl.TRIANGLES, 0, 3) // with vbo
 * gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0) // with ibo
 * ```
 */
export function createBuffer(
  gl: WebGLRenderingContext,
  target: number,
  data: BufferSource,
  usage: number = gl.STATIC_DRAW
): WebGLBuffer {
  const buffer = gl.createBuffer()
  if (!buffer) {
    throw new Error(
      `Failed to create WebGL buffer (target=${target}).
       This usually indicates that the WebGL context is lost or resources are exhausted.`
    )
  }

  gl.bindBuffer(target, buffer)
  gl.bufferData(target, data, usage)

  return buffer
}

/**
 * Create a buffer for a full‑screen quad
 *
 * **Parameters**
 * - `gl` – Target WebGL rendering context
 * - `position` – Attribute location index for vertex positions
 *
 * **Notes**
 * - Produces 4 vertices covering the entire screen
 * - Can be drawn directly with `gl.drawArrays` (triangle strip) or with `gl.drawElements` using an index buffer
 *
 * **Usage**
 * ```ts
 * // Option 1: Draw with vertex buffer only
 * const vbo = createQuadBuffer(gl, positionLocation)
 * gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
 *
 * // Option 2: Draw with vertex + index buffers
 * const vbo = createQuadBuffer(gl, positionLocation)
 * const ibo = createQuadIndexBuffer(gl)
 * gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0)
 * ```
 */
export function createQuadBuffer(gl: WebGLRenderingContext, position: number): WebGLBuffer {
  const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1])
  const buffer = createBuffer(gl, gl.ARRAY_BUFFER, vertices)

  gl.enableVertexAttribArray(position)
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0)

  return buffer
}

/**
 * Create an index buffer for a full‑screen quad
 *
 * **Parameters**
 * - `gl` – Target WebGL rendering context
 *
 * **Notes**
 * - Works together with `createQuadBuffer` (vertex positions)
 * - Produces 6 indices (2 triangles × 3 vertices)
 *
 * **Usage**
 * ```ts
 * // Create both vertex and index buffers
 * const vbo = createQuadBuffer(gl, positionLocation)
 * const ibo = createQuadIndexBuffer(gl)
 *
 * // Draw the quad: 6 indices, unsigned short type
 * gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0)
 * ```
 */
export function createQuadIndexBuffer(gl: WebGLRenderingContext): WebGLBuffer {
  const indices = new Uint16Array([0, 1, 2, 2, 1, 3])
  return createBuffer(gl, gl.ELEMENT_ARRAY_BUFFER, indices)
}

/**
 * Create a buffer for a full‑screen triangle
 *
 * **Parameters**
 * - `gl` – Target WebGL rendering context
 * - `position` – Attribute location index for vertex positions
 *
 * **Notes**
 * - Produces 3 vertices that cover the entire screen
 * - No index buffer is required; this is drawn directly with `gl.drawArrays`
 *
 * **Usage**
 * ```ts
 * // Create the vertex buffer for a full‑screen triangle
 * const vbo = createTriangleBuffer(gl, positionLocation)
 *
 * // Draw the triangle: 3 vertices, no index buffer needed
 * gl.drawArrays(gl.TRIANGLES, 0, 3)
 * ```
 */
export function createTriangleBuffer(gl: WebGLRenderingContext, position: number): WebGLBuffer {
  const vertices = new Float32Array([-1, -1, 3, -1, -1, 3])
  const buffer = createBuffer(gl, gl.ARRAY_BUFFER, vertices)

  gl.enableVertexAttribArray(position)
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0)

  return buffer
}

/**
 * Create an index buffer for a full‑screen triangle
 *
 * **Parameters**
 * - `gl` – Target WebGL rendering context
 *
 * **Notes**
 * - Produces 3 indices (one triangle).
 * - Works together with `createTriangleBuffer` (vertex positions)
 *
 * **Usage**
 * ```ts
 * const vbo = createTriangleBuffer(gl, positionLocation)
 * const ibo = createTriangleIndexBuffer(gl)
 *
 * // Draw the triangle: 3 indices, unsigned short type
 * gl.drawElements(gl.TRIANGLES, 3, gl.UNSIGNED_SHORT, 0)
 * ```
 */
export function createTriangleIndexBuffer(gl: WebGLRenderingContext): WebGLBuffer {
  const indices = new Uint16Array([0, 1, 2])
  return createBuffer(gl, gl.ELEMENT_ARRAY_BUFFER, indices)
}

/**
 * Create a buffer for a unit cube
 *
 * **Parameters**
 * - `gl` – Target WebGL rendering context
 * - `position` – Attribute location index for vertex positions
 *
 * **Notes**
 * - Works together with `createCubeIndexBuffer` (indices)
 * - Produces 8 unique vertices and 36 indices (6 faces × 2 triangles × 3 vertices)
 *
 * **Usage**
 * ```ts
 * // Create both vertex and index buffers
 * const vbo = createCubeBuffer(gl, positionLocation)
 * const ibo = createCubeIndexBuffer(gl)
 *
 * // Draw the cube: 36 indices, unsigned short type
 * gl.drawElements(gl.TRIANGLES, 36, gl.UNSIGNED_SHORT, 0)
 * ```
 */
export function createCubeBuffer(gl: WebGLRenderingContext, position: number): WebGLBuffer {
  const vertices = new Float32Array([
    -1,-1,-1,  1,-1,-1,  1, 1,-1, -1, 1,-1, // back face
    -1,-1, 1,  1,-1, 1,  1, 1, 1, -1, 1, 1  // front face
  ])
  const buffer = createBuffer(gl, gl.ARRAY_BUFFER, vertices)

  gl.enableVertexAttribArray(position)
  gl.vertexAttribPointer(position, 3, gl.FLOAT, false, 0, 0)

  return buffer
}

/**
 * Create an index buffer for a cube
 *
 * **Parameters**
 * - `gl` – Target WebGL rendering context
 *
 * **Notes**
 * - Works together with `createCubeBuffer` (vertex positions)
 * - Produces 36 indices (6 faces × 2 triangles × 3 vertices)
 *
 * **Usage**
 * ```ts
 * // Create both vertex and index buffers
 * const vbo = createCubeBuffer(gl, positionLocation)
 * const ibo = createCubeIndexBuffer(gl)
 *
 * // Draw the cube: 36 indices, unsigned short type
 * gl.drawElements(gl.TRIANGLES, 36, gl.UNSIGNED_SHORT, 0)
 * ```
 */
export function createCubeIndexBuffer(gl: WebGLRenderingContext): WebGLBuffer {
  const indices = new Uint16Array([
    0,1,2, 2,3,0, // back
    4,5,6, 6,7,4, // front
    0,4,7, 7,3,0, // left
    1,5,6, 6,2,1, // right
    3,2,6, 6,7,3, // top
    0,1,5, 5,4,0  // bottom
  ])
  return createBuffer(gl, gl.ELEMENT_ARRAY_BUFFER, indices)
}

/**
 * Update an existing WebGL buffer with new data
 *
 * **Parameters**
 * - `gl` – Target WebGL rendering context
 * - `buffer` – Existing buffer to update
 * - `target` – Buffer target (e.g. `gl.ARRAY_BUFFER`)
 * - `data` – New typed array data to upload
 * - `usage` – Buffer usage hint (default: `gl.STATIC_DRAW`)
 *
 * **Notes**
 * - This uses `gl.bufferData`, which **replaces the entire buffer contents**
 * - The buffer may be reallocated on the GPU, so it’s less efficient for small changes
 * - Use this when you want to completely reset or resize the buffer
 *
 * **Usage**
 * ```ts
 * // Replace the entire buffer with new vertices
 * const newVertices = new Float32Array([0,0, 1,0, 1,1])
 * updateBuffer(gl, vbo, gl.ARRAY_BUFFER, newVertices)
 *
 * // Resize the buffer with more vertices (old data discarded)
 * const largerVertices = new Float32Array([0,0, 1,0, 1,1, 0,1])
 * updateBuffer(gl, vbo, gl.ARRAY_BUFFER, largerVertices, gl.DYNAMIC_DRAW)
 * ```
 */
export function updateBuffer(
  gl: WebGLRenderingContext,
  buffer: WebGLBuffer,
  target: number,
  data: BufferSource,
  usage: number = gl.STATIC_DRAW
): void {
  gl.bindBuffer(target, buffer)
  gl.bufferData(target, data, usage)
}

/**
 * Partially update an existing WebGL buffer with new data
 *
 * **Parameters**
 * - `gl` – Target WebGL rendering context
 * - `buffer` – Existing buffer to update
 * - `target` – Buffer target (e.g. `gl.ARRAY_BUFFER`)
 * - `data` – Typed array containing new data
 * - `offset` – Byte offset in the buffer where data should be written
 *
 * **Notes**
 * - Unlike `updateBuffer`, this does **not** reallocate the buffer
 * - Existing data remains intact; only the specified region is overwritten
 * - More efficient for dynamic updates (animations, particle systems)
 *
 * **Usage**
 * ```ts
 * // Replace only the first vertex (two floats) in the buffer
 * const newVertex = new Float32Array([0.5, 0.5])
 * updateBufferPartial(gl, vbo, gl.ARRAY_BUFFER, newVertex, 0)
 *
 * // Replace the 3rd vertex (offset = 2 * 4 bytes = 8)
 * const anotherVertex = new Float32Array([1.0, 1.0])
 * updateBufferPartial(gl, vbo, gl.ARRAY_BUFFER, anotherVertex, 8)
 * ```
 */
export function updateBufferPartial(
  gl: WebGLRenderingContext,
  buffer: WebGLBuffer,
  target: number,
  data: BufferSource,
  offset: number = 0
): void {
  gl.bindBuffer(target, buffer)
  gl.bufferSubData(target, offset, data)
}

/**
 * Delete a WebGL buffer and free GPU memory
 *
 * **Parameters**
 * - `gl` – Target WebGL rendering context
 * - `buffer` – Buffer object to delete
 *
 * **Notes**
 * - Frees GPU memory associated with the buffer
 * - Always call this when a buffer is no longer needed to avoid memory leaks
 *
 * **Usage**
 * ```ts
 * // Delete a single buffer
 * deleteBuffer(gl, vbo)
 *
 * // Delete both vertex and index buffers when cleaning up
 * deleteBuffer(gl, vbo)
 * deleteBuffer(gl, ibo)
 * ```
 */
export function deleteBuffer(gl: WebGLRenderingContext, buffer: WebGLBuffer): void {
  gl.deleteBuffer(buffer)
}
