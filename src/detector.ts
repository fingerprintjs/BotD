import collect from './collector'
import { version } from '../package.json'
import { Options, SourceResultDict } from './types'

export default class BotDetector {
  url: string
  token: string
  timestamp: number | undefined
  performance: number | undefined
  sources: SourceResultDict | undefined

  constructor(options: Options) {
    this.url = options.url
    this.token = options.token
  }
  async collect(): Promise<SourceResultDict> {
    this.timestamp = Date.now()
    this.sources = await collect()
    this.performance = Date.now() - this.timestamp
    return this.sources
  }

  async get(): Promise<string> {
    const body = {
      timestamp: this.timestamp,
      performance: this.performance,
      signals: this.sources,
      version: version,
      token: this.token,
    }

    const response = await fetch(this.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    return await response.json()
  }
}
