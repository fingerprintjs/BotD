export default function getWebGL(): string[] {
  const canvasElement = document.createElement('canvas')
  const webGLContext = canvasElement.getContext('webgl')
  if (webGLContext !== null) {
    const webGLDebugInfo = webGLContext.getExtension('WEBGL_debug_renderer_info')
    if (webGLDebugInfo !== null) {
      const vendor = webGLContext.getParameter(webGLDebugInfo.UNMASKED_VENDOR_WEBGL)
      const renderer = webGLContext.getParameter(webGLDebugInfo.UNMASKED_RENDERER_WEBGL)
      return [vendor, renderer]
    }
  }
  throw new Error('can`t get webgl data')
}
