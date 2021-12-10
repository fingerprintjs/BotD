import { BotdError, State } from '../types'

export default function getASTCProfiles(): string {
  const canvasElement = document.createElement('canvas')
  const webGLContext = canvasElement.getContext('webgl')
  if (webGLContext === null) {
    throw new BotdError(State.Null, 'WebGL Context is null')
  } else {
    const astcExtension = webGLContext.getExtension('WEBGL_compressed_texture_astc')
    if (astcExtension === null) return ''
    if (typeof astcExtension.getSupportedProfiles !== 'function') {
      throw new BotdError(State.NotFunction, 'WEBGL_compressed_texture_astc.getSupportedProfiles is not a function')
    }
    return astcExtension.getSupportedProfiles().toString()
  }
}
