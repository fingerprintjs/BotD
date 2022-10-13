import { BotdError, State } from '../types'
import { getMozAppearanceSupport } from '../utils/browser'

export interface WebGLPayload {
  vendor: string
  renderer: string
}

export interface WebGLMozPayload {
  vendor: string
  renderer: string
}

export default function getWebGL(): WebGLPayload | WebGLMozPayload {
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

  if (getMozAppearanceSupport()) {
    return { vendor: vendor, renderer: renderer }
  }

  const webGLDebugInfo = webGLContext.getExtension('WEBGL_debug_renderer_info')

  if (webGLDebugInfo === null) {
    throw new BotdError(State.Null, 'WEBGL_debug_renderer_info extension is null')
  }

  return { vendor: vendor, renderer: renderer }
}
