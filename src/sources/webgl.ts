import { BotdError, State } from '../types'
import { getMozAppearanceSupport } from '../utils/browser'

export interface WebGLPayload {
  version: string
  vendor: string
  renderer: string
  shadingLanguageVersion: string
  vendorUnmasked: string
  rendererUnmasked: string
}

export interface WebGLMozPayload {
  version: string
  vendor: string
  renderer: string
  shadingLanguageVersion: string
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

  const version = webGLContext.getParameter(webGLContext.VERSION)
  const vendor = webGLContext.getParameter(webGLContext.VENDOR)
  const renderer = webGLContext.getParameter(webGLContext.RENDERER)
  const shadingLanguageVersion = webGLContext.getParameter(webGLContext.SHADING_LANGUAGE_VERSION)

  if (getMozAppearanceSupport())
    return {
      version: version,
      vendor: vendor,
      renderer: renderer,
      shadingLanguageVersion: shadingLanguageVersion,
    }

  const webGLDebugInfo = webGLContext.getExtension('WEBGL_debug_renderer_info')

  if (webGLDebugInfo === null) {
    throw new BotdError(State.Null, 'WEBGL_debug_renderer_info extension is null')
  }

  const unmaskedVendor = webGLContext.getParameter(webGLDebugInfo.UNMASKED_VENDOR_WEBGL)
  const unmaskedRenderer = webGLContext.getParameter(webGLDebugInfo.UNMASKED_RENDERER_WEBGL)

  return {
    version: version,
    vendor: vendor,
    renderer: renderer,
    shadingLanguageVersion: shadingLanguageVersion,
    vendorUnmasked: unmaskedVendor,
    rendererUnmasked: unmaskedRenderer,
  }
}
