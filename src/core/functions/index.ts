// Tailwind
export { cn } from "./tailwind/cn"
export { cv, type VariantOf } from "./tailwind/cv"

// WebGL
export {
  canvasContext,
  resizeCanvas,
  type CanvasContextOptions,
  type ResizeCanvasOptions
} from "./webgl/context"
export {
  createBuffer,
  createQuadBuffer,
  createQuadIndexBuffer,
  createCubeBuffer,
  createCubeIndexBuffer,
  createTriangleBuffer,
  createTriangleIndexBuffer,
  updateBuffer,
  updateBufferPartial,
  deleteBuffer
} from "./webgl/buffer"
export {
  bindAttribute,
  disableAttribute
} from "./webgl/attribute"
export {
  setUniform1f,
  setUniform2f,
  setUniform3f,
  setUniformMatrix4fv
} from "./webgl/uniform"
