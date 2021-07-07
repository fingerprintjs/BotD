import collect, { SignalName } from './collector'
import { version } from '../package.json'
import { getCookie, Modes, Options, setCookie, SourceResultDict, State } from './types'

export default class BotDetector {
  endpoint: string
  token: string
  mode: string
  timestamp?: number
  tag?: string
  performance?: number
  sources?: SourceResultDict

  constructor(options: Options) {
    this.mode = options.mode == undefined ? Modes.RequestID : options.mode
    this.endpoint = options.endpoint === undefined ? 'https://botd.fpapi.io/api/v1/' : options.endpoint
    if (!this.endpoint.endsWith('/')) {
      this.endpoint += '/'
    }
    this.token = options.token
  }

  setTag(tag: string): void {
    if (this.sources !== undefined) {
      this.tag = tag
      this.sources[SignalName.Tag] = { state: State.Success, value: this.tag }
    }
  }

  async collect(): Promise<SourceResultDict> {
    this.timestamp = Date.now()
    this.sources = await collect()
    this.performance = Date.now() - this.timestamp
    return this.sources
  }

  async detect(tag: string): Promise<Record<string, unknown>> {
    this.setTag(tag)
    const body = {
      mode: this.mode,
      timestamp: this.timestamp,
      performance: this.performance,
      signals: this.sources,
      version: version,
      token: this.token,
    }

    return await fetch(this.endpoint + 'detect?token=' + this.token, {
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
            code: 'BotdFailed',
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
          code: 'DetectNotCalled',
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
            code: 'BotdFailed',
            message: err.toString(),
          },
        }
      })
  }
}
