import collect, { SignalName } from './collector'
import { version } from '../package.json'
import { Options, SourceResultDict, State } from './types'

export default class BotDetector {
  endpoint: string
  token: string
  timestamp?: number
  tag?: string
  performance?: number
  sources?: SourceResultDict

  constructor(options: Options) {
    this.endpoint = options.endpoint === undefined ? 'https://botd.fpapi.io/detect' : options.endpoint
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
      async: false,
      timestamp: this.timestamp,
      performance: this.performance,
      signals: this.sources,
      version: version,
    }
    try {
      const response = await fetch(this.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Auth-Token': this.token,
        },
        body: JSON.stringify(body),
      })
      return await response.json()
    } catch (e) {
      return {
        error: {
          code: 'Failed',
          message: e.toString(),
        },
      }
    }
  }
}
