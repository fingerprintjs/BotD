import collect, { SignalName } from './collector'
import { version } from '../package.json'
import { getCookie, Modes, Options, setCookie, SourceResultDict, State } from './types'
import { wait } from './misc'

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
      mode: this.mode,
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
      setCookie('botd-request-id', json['requestId'])
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

  async poll(delayMs = 50, attempts = 3): Promise<Record<string, unknown>> {
    const requestId = getCookie('botd-request-id')
    if (requestId == null) {
      return {
        error: {
          code: 400,
          message: 'Call get() method first to make a request',
        },
      }
    }

    while (attempts > 0) {
      try {
        const response = await fetch(this.endpoint + 'results?id=' + requestId, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Auth-Token': this.token,
          },
        })

        const json = await response.json()

        if (json['status'] == 'inProgress') {
          await wait(delayMs)
          attempts--
          if (attempts == 0) {
            return {
              error: {
                code: 'inProgress',
                message: 'Bot detection result is not ready yet',
              },
            }
          }
        } else {
          return json
        }
      } catch (e) {
        return {
          error: {
            code: 'Failed',
            message: e.toString(),
          },
        }
      }
    }
    return Promise.reject()
  }
}
