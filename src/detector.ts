import collect from './collector'
import { version } from '../package.json'
import { ObfuscationInterface, XorWithIndexObfuscation } from './obfuscation'
import {
  BotDetectorInterface,
  DetectOptions,
  InitOptions,
  ComponentDict,
  ErrorCodes,
  BotdResponse,
  ErrorResponse,
  DetectBody,
  Modes,
} from './types'

function setCookie(name: string, value: string): void {
  value = encodeURIComponent(value)
  document.cookie = name + '=' + value
}

/**
 * Class representing a bot detector.
 *
 * @class
 * @implements {BotDetectorInterface}
 */
export default class BotDetector implements BotDetectorInterface {
  endpoint: string
  token: string
  mode: Modes
  isIntegration: boolean
  disableObfuscationIn: boolean
  disableObfuscation: boolean
  tag = ''
  performance?: number
  components?: ComponentDict
  private obfuscator: ObfuscationInterface

  constructor(options: InitOptions) {
    this.mode = options.mode == undefined ? 'requestId' : options.mode
    this.isIntegration = options.isIntegration == undefined ? false : options.isIntegration
    this.disableObfuscation = options.disableObfuscation == undefined ? false : options.disableObfuscation
    this.disableObfuscationIn = options.disableObfuscationIn == undefined ? false : options.disableObfuscationIn
    this.endpoint = options.endpoint === undefined ? 'https://botd.fpapi.io/api/v1/' : options.endpoint
    if (!this.endpoint.endsWith('/')) {
      this.endpoint += '/'
    }
    this.obfuscator = new XorWithIndexObfuscation()
    this.token = options.token
  }

  /**
   * @inheritdoc
   */
  async collect(): Promise<ComponentDict> {
    const timestamp = Date.now()
    this.components = await collect()
    this.performance = Date.now() - timestamp
    return this.components
  }

  static throwIfError(response: BotdResponse): void {
    if ('error' in response) {
      throw response
    }
  }

  static createError(code: ErrorCodes, msg: string): ErrorResponse {
    return {
      error: {
        code: code,
        message: msg,
      },
    }
  }

  createRequestBody(): DetectBody {
    return {
      mode: this.mode,
      performance: this.performance,
      signals: this.components,
      version: version,
      token: this.token,
      tag: this.tag,
    }
  }

  /**
   * @inheritdoc
   */
  async detect(options: DetectOptions = { tag: '' }): Promise<BotdResponse> {
    this.tag = options ? options.tag : ''

    try {
      const credentials: RequestCredentials | undefined = this.isIntegration ? 'include' : undefined
      const url = new URL(this.endpoint)
      url.pathname += 'detect'
      url.searchParams.append('token', this.token)
      url.searchParams.append('version', version)
      if (this.disableObfuscationIn) url.search += '&deobfuscate'

      const body = this.disableObfuscation
        ? JSON.stringify(this.createRequestBody())
        : this.obfuscator.obfuscate(this.createRequestBody())

      const response = await fetch(url.href, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: body,
        credentials: credentials,
      })

      let responseJSON: BotdResponse
      if (this.disableObfuscationIn || this.disableObfuscation) {
        responseJSON = await response.json()
      } else {
        responseJSON = this.obfuscator.deobfuscate(await response.arrayBuffer())
      }

      BotDetector.throwIfError(responseJSON)
      if ('requestId' in responseJSON && !this.isIntegration) {
        setCookie('botd-request-id', responseJSON['requestId'])
      }
      return responseJSON
    } catch (err) {
      if (err['error']) {
        throw err
      }
      throw BotDetector.createError(ErrorCodes.BotdFailed, err.toString())
    }
  }
}
