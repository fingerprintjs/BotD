import collect from './collector'
import { version } from '../package.json'
import {
  BotDetectorInterface,
  DetectOptions,
  getCookie,
  Modes,
  InitOptions,
  setCookie,
  ComponentDict,
  ErrorCodes,
} from './types'

export default class BotDetector implements BotDetectorInterface {
  endpoint: string
  token: string
  mode: string
  tag?: string
  performance?: number
  sources?: ComponentDict

  constructor(options: InitOptions) {
    this.mode = options.mode == undefined ? Modes.RequestID : options.mode
    this.endpoint = options.endpoint === undefined ? 'https://botd.fpapi.io/api/v1/' : options.endpoint
    if (!this.endpoint.endsWith('/')) {
      this.endpoint += '/'
    }
    this.token = options.token
  }

  async collect(): Promise<ComponentDict> {
    const timestamp = Date.now()
    this.sources = await collect()
    this.performance = Date.now() - timestamp
    return this.sources
  }

  async detect(options?: DetectOptions): Promise<Record<string, unknown>> {
    const body = {
      mode: this.mode,
      performance: this.performance,
      signals: this.sources,
      version: version,
      token: this.token,
      tag: options ? options.tag : '',
    }

    return fetch(this.endpoint + 'detect?token=' + this.token, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((json) => {
        setCookie('botd-request-id', json['requestId'])
        return json
      })
      .then((json) => {
        if (json['error']) throw json
        return json
      })
      .catch((err) => {
        if (err['error']) throw err
        throw {
          error: {
            code: ErrorCodes.BotdFailed,
            message: err.toString(),
          },
        }
      })
  }

  async getResult(): Promise<Record<string, unknown>> {
    const requestId = getCookie('botd-request-id')
    if (requestId == null) {
      throw {
        error: {
          code: ErrorCodes.DetectNotCalled,
          message: 'Call detect() method first to make a request',
        },
      }
    }

    return fetch(this.endpoint + 'results?id=' + requestId + '&token=' + this.token, { method: 'GET' })
      .then((response) => response.json())
      .then((json) => {
        if (json['error']) throw json
        return json
      })
      .catch((err) => {
        if (err['error']) throw err
        throw {
          error: {
            code: ErrorCodes.BotdFailed,
            message: err.toString(),
          },
        }
      })
  }
}
