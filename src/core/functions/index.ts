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
  setUniform1i,
  setUniform2f,
  setUniform3f,
  setUnform3fv,
  setUniformMatrix2fv,
  setUniformMatrix3fv,
  setUniformMatrix4fv,
  setUniformSampler
} from "./webgl/uniform"
