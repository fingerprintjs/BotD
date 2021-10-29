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
  tag = ''
  performance?: number
  components?: ComponentDict
  private obfuscator: ObfuscationInterface
  private readonly isIntegration: boolean
  private readonly disableObfuscation: boolean
  private readonly disableResponseObfuscation: boolean

  constructor(options: InitOptions) {
    this.endpoint = options.endpoint == undefined ? 'https://botd.fpapi.io/api/v1/' : options.endpoint
    this.endpoint += !this.endpoint.endsWith('/') ? '/' : ''
    this.token = options.token
    this.mode = options.mode == undefined ? 'requestId' : options.mode
    this.obfuscator = new XorWithIndexObfuscation()
    this.isIntegration = options.isIntegration == undefined ? false : options.isIntegration
    this.disableObfuscation = options.disableObfuscation == undefined ? false : options.disableObfuscation
    this.disableResponseObfuscation =
      options.disableResponseObfuscation == undefined ? false : options.disableResponseObfuscation
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
      token: this.token,
      tag: this.tag,
    }
  }

  /**
   * @inheritdoc
   */
  async detect(options: DetectOptions = { tag: '' }): Promise<BotdResponse> {
    this.tag = options.tag

    try {
      const credentials: RequestCredentials | undefined = this.isIntegration ? 'include' : undefined
      const url = new URL(this.endpoint)
      url.pathname += 'detect'
      url.searchParams.append('token', this.token)
      url.searchParams.append('version', version)
      url.search += this.disableResponseObfuscation ? '&deobfuscate' : ''

      const body = this.disableObfuscation
        ? JSON.stringify(this.createRequestBody())
        : this.obfuscator.obfuscate(this.createRequestBody())

      const response = await fetch(url.href, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: body,
        credentials: credentials,
      })

      const responseJSON: BotdResponse =
        this.disableResponseObfuscation || this.disableObfuscation
          ? await response.json()
          : this.obfuscator.deobfuscate(await response.arrayBuffer())

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
