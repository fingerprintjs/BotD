import { BotdError, State } from '../types'

export default function getWebGL(): string[] {
  const canvasElement = document.createElement('canvas')
  const webGLContext = canvasElement.getContext('webgl')
  if (webGLContext == null) {
    throw new BotdError(State.Null, 'WebGL Context is null')
  } else {
    const webGLDebugInfo = webGLContext.getExtension('WEBGL_debug_renderer_info')
    if (webGLDebugInfo == null) {
      throw new BotdError(State.Null, 'WEBGL_debug_renderer_info extension is null')
    } else {
      const vendor = webGLContext.getParameter(webGLDebugInfo.UNMASKED_VENDOR_WEBGL)
      const renderer = webGLContext.getParameter(webGLDebugInfo.UNMASKED_RENDERER_WEBGL)
      return [vendor, renderer]
    }
  }
}
