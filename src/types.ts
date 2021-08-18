type SimpleSourceResult = string | number | boolean
type SourceResult = SimpleSourceResult | SimpleSourceResult[]
type SourceFunction = () => SourceResult | Promise<SourceResult>
type SourceDict = Record<string, SourceFunction>
export type SourceResultDict = Record<string, Source>

type Source =
  | {
      state: State.Success
      value: SourceResult
    }
  | {
      state: State.Failure
      value: string
    }

export interface BotDetectorInterface {
  detect(tag?: string): Promise<Record<string, unknown>>
  collect(): Promise<SourceResultDict>
}

export interface Options {
  token: string
  mode?: string
  endpoint?: string
}

export const enum Modes {
  RequestID = 'requestId',
  AllData = 'allData',
}

export const enum State {
  Success = 1,
  Failure = -1,
}

async function handleSource(sourceFunction: SourceFunction): Promise<Source> {
  let sourceResult: SourceResult
  let result: Source
  try {
    sourceResult = await sourceFunction()
    result = { state: State.Success, value: sourceResult }
  } catch (e) {
    result = { state: State.Failure, value: e.toString() }
  }
  return result
}

export async function handleAll(sources: SourceDict): Promise<SourceResultDict> {
  const results: SourceResultDict = {}
  for (const name in sources) {
    if (Object.prototype.hasOwnProperty.call(sources, name)) {
      const sourceFunction = sources[name]
      results[name] = await handleSource(sourceFunction)
    }
  }
  return results
}

export function getCookie(name: string): string | undefined {
  const matches = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1') + '=([^;]*)'),
  )
  return matches ? decodeURIComponent(matches[1]) : undefined
}

export function setCookie(name: string, value: string): void {
  value = encodeURIComponent(value)
  document.cookie = name + '=' + value
}
