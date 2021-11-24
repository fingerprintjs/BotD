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
  ObfuscationModes,
} from './types'

function setCookie(name: string, value: string): void {
  value = encodeURIComponent(value)
  document.cookie = `${name}=${value};SameSite=None;Secure`
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
  private readonly obfuscationMode: ObfuscationModes
  private readonly integration: boolean

  constructor(options: InitOptions) {
    this.endpoint = options.endpoint == undefined ? 'https://botd.fpapi.io/api/v1/' : options.endpoint
    this.endpoint += this.endpoint.endsWith('/') ? '' : '/'
    if (this.endpoint.indexOf('://') === -1) {
      this.endpoint = new URL(this.endpoint, document.baseURI).href
    }
    this.token = options.token
    this.integration = options.mode == 'integration'
    this.mode = options.mode == undefined ? 'requestId' : this.integration ? 'requestId' : options.mode
    this.obfuscator = new XorWithIndexObfuscation()
    this.obfuscationMode =
      options.obfuscationMode == undefined ? (this.integration ? 'requestOnly' : 'all') : options.obfuscationMode
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

  static throwIfBotDError(response: BotdResponse): void {
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
      const credentials: RequestCredentials | undefined = this.integration ? 'include' : undefined
      const url = new URL(this.endpoint)
      url.pathname += 'detect'
      url.searchParams.append('token', this.token)
      url.searchParams.append('version', version)
      url.search += this.obfuscationMode != 'all' ? '&deobfuscate' : ''

      const body =
        this.obfuscationMode == 'none'
          ? JSON.stringify(this.createRequestBody())
          : this.obfuscator.obfuscate(this.createRequestBody())

      const response = await fetch(url.href, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: body,
        credentials: credentials,
      })

      const responseJSON: BotdResponse =
        this.obfuscationMode != 'all'
          ? await response.json()
          : this.obfuscator.deobfuscate(await response.arrayBuffer())

      BotDetector.throwIfBotDError(responseJSON)
      if ('requestId' in responseJSON && !this.integration) {
        setCookie('botd-request-id', responseJSON['requestId'])
      }
      return responseJSON
    } catch (err) {
      BotDetector.throwIfBotDError(err)
      throw BotDetector.createError(ErrorCodes.BotdFailed, err.toString())
    }
  }
}
