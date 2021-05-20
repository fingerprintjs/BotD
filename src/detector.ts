import collect, { SignalName } from './collector'
import { version } from '../package.json'
import { getCookie, Options, setCookie, SourceResultDict, State } from './types'

export default class BotDetector {
  endpoint: string
  token: string
  async: boolean
  timestamp?: number
  tag?: string
  performance?: number
  sources?: SourceResultDict

  constructor(options: Options) {
    this.async = options.async == undefined ? false : options.async
    this.endpoint = options.endpoint === undefined ? 'https://botd.fpapi.io/api/v1/' : options.endpoint
    if (!this.endpoint.endsWith('/')) {
      this.endpoint += '/'
    }
    this.token = options.token
  }

  setTag(tag: unknown): void {
    if (this.sources !== undefined) {
      try {
        this.tag = tag === undefined ? '' : JSON.stringify(tag)
      } catch (e) {
        this.tag = ''
      }
      this.sources[SignalName.Tag] = { state: State.Success, value: this.tag }
    }
  }

  async collect(): Promise<SourceResultDict> {
    this.timestamp = Date.now()
    this.sources = await collect()
    this.performance = Date.now() - this.timestamp
    return this.sources
  }

  async get(tag: unknown): Promise<Record<string, unknown>> {
    this.setTag(tag)
    const body = {
      async: this.async,
      timestamp: this.timestamp,
      performance: this.performance,
      signals: this.sources,
      version: version,
      token: this.token,
    }
    try {
      const response = await fetch(this.endpoint + 'detect', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Auth-Token': this.token,
        },
        body: JSON.stringify(body),
      })
      const json = await response.json()
      if (this.async) setCookie('botd-request-id', json['requestId'])
      return json
    } catch (e) {
      return {
        error: {
          code: 500,
          message: e.toString(),
        },
      }
    }
  }

  async poll(): Promise<Record<string, unknown>> {
    if (!this.async) {
      return {
        error: {
          code: 400,
          message: 'You are in sync mode, set "async" as true in load() method',
        },
      }
    }
    const requestId = getCookie('botd-request-id')
    if (requestId == null) {
      return {
        error: {
          code: 400,
          message: 'Call get() method first to make a request',
        },
      }
    }

    try {
      const response = await fetch(this.endpoint + 'results?id=' + requestId, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Auth-Token': this.token,
        },
      })
      return await response.json()
    } catch (e) {
      return {
        error: {
          code: 500,
          message: e.toString(),
        },
      }
    }
  }
}
