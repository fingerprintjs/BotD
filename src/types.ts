type SimpleComponentValue = string | number | boolean
type ComponentValue = SimpleComponentValue | SimpleComponentValue[]
type Source = () => ComponentValue | Promise<ComponentValue>
type SourceDict = Record<string, Source>
export type ComponentDict = Record<string, Component>

type Component =
  | {
      state: State.Success
      value: ComponentValue
    }
  | {
      state: State.Failure
      value: string
    }

export interface BotDetectorInterface {
  detect(options?: DetectOptions): Promise<Record<string, unknown>>
  collect(): Promise<ComponentDict>
  getResult(): Promise<Record<string, unknown>>
}

export interface InitOptions {
  token: string
  mode?: string
  endpoint?: string
}

export interface DetectOptions {
  tag: string
}

export const enum Modes {
  RequestID = 'requestId',
  AllData = 'allData',
}

export const enum ErrorCodes {
  BotdFailed = 'BotdFailed',
  DetectNotCalled = 'DetectNotCalled',
}

export const enum State {
  Success = 1,
  Failure = -1,
}

async function handleSource(sourceFunction: Source): Promise<Component> {
  try {
    return { state: State.Success, value: await sourceFunction() }
  } catch (e) {
    return { state: State.Failure, value: e.toString() }
  }
}

export async function handleAll(sources: SourceDict): Promise<ComponentDict> {
  const components: ComponentDict = {}
  for (const name in sources) {
    if (Object.prototype.hasOwnProperty.call(sources, name)) {
      const sourceFunction = sources[name]
      components[name] = await handleSource(sourceFunction)
    }
  }
  return components
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
