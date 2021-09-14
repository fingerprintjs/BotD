import collect from './collector'
import { version } from '../package.json'
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
  document.cookie = name + '=' + value + ';Secure;HttpOnly'
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

  constructor(options: InitOptions) {
    this.mode = options.mode == undefined ? 'requestId' : options.mode
    this.endpoint = options.endpoint === undefined ? 'https://botd.fpapi.io/api/v1/' : options.endpoint
    if (!this.endpoint.endsWith('/')) {
      this.endpoint += '/'
    }
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
  async detect(tag?: string): Promise<BotdResponse>

  /**
   * @inheritdoc
   */
  async detect(optionsOrTag?: string | DetectOptions): Promise<BotdResponse> {
    if (optionsOrTag) {
      if (typeof optionsOrTag === 'string') {
        this.tag = optionsOrTag
      } else {
        this.tag = optionsOrTag.tag
      }
    } else {
      this.tag = ''
    }
    try {
      const response = await fetch(this.endpoint + 'detect?token=' + this.token, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify(this.createRequestBody()),
      })
      const responseJSON: BotdResponse = await response.json()
      BotDetector.throwIfError(responseJSON)
      if ('requestId' in responseJSON) {
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
