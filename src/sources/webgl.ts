import { BotdError, State } from '../types'
import getInstallTrigger from './install-trigger'

export default function getWebGL(): string[] {
  const canvasElement = document.createElement('canvas')

  if (typeof canvasElement.getContext !== 'function') {
    throw new BotdError(State.NotFunction, 'HTMLCanvasElement.getContext is not a function')
  }

  const webGLContext = canvasElement.getContext('webgl')

  if (webGLContext === null) {
    throw new BotdError(State.Null, 'WebGLRenderingContext is null')
  }

  if (typeof webGLContext.getParameter !== 'function') {
    throw new BotdError(State.NotFunction, 'WebGLRenderingContext.getParameter is not a function')
  }

  const vendor = webGLContext.getParameter(webGLContext.VENDOR)
  const renderer = webGLContext.getParameter(webGLContext.RENDERER)
  const version = webGLContext.getParameter(webGLContext.VERSION)

  if (getInstallTrigger()) return [vendor, renderer, version]

  const webGLDebugInfo = webGLContext.getExtension('WEBGL_debug_renderer_info')

  if (webGLDebugInfo === null) {
    throw new BotdError(State.Null, 'WEBGL_debug_renderer_info extension is null')
  }

  const unmaskedVendor = webGLContext.getParameter(webGLDebugInfo.UNMASKED_VENDOR_WEBGL)
  const unmaskedRenderer = webGLContext.getParameter(webGLDebugInfo.UNMASKED_RENDERER_WEBGL)

  return [vendor, renderer, version, unmaskedVendor, unmaskedRenderer]
}
