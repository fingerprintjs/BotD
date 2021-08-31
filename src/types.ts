type SimpleComponentValue = string | number | boolean
type ComponentValue = SimpleComponentValue | SimpleComponentValue[]

export type Source = () => ComponentValue | Promise<ComponentValue>
export type SourceDict = Record<string, Source>

export type Component =
  | {
      state: State.Success
      value: ComponentValue
    }
  | {
      state: State
      value: string
    }
export type ComponentDict = Record<string, Component>

export type BotdResponse = RequestIdResponse | SuccessResponse | ErrorResponse

type DetectNote = {
  status: string
  probability: number
  type?: string
}

export interface RequestIdResponse {
  requestId: string
}

export interface SuccessResponse {
  requestId: string
  ip: string
  tag: string
  bot: {
    automationTools: DetectNote
    searchEngine: DetectNote
    browserSpoofing: DetectNote
  }
  vm: DetectNote
}

export interface ErrorResponse {
  error: {
    code: ErrorCodes
    message: string
  }
}

export interface BotDetectorInterface {
  detect(options?: DetectOptions): Promise<BotdResponse>
  collect(): Promise<ComponentDict>
  getResult(): Promise<BotdResponse>
}

export interface InitOptions {
  token: string
  mode?: Modes
  endpoint?: string
}

export interface DetectOptions {
  tag: string
}

export interface DetectBody {
  mode: Modes
  performance?: number
  signals?: ComponentDict
  version: string
  token: string
  tag: string
}

export type Modes = 'requestId' | 'allData'

export const enum ErrorCodes {
  BotdFailed = 'BotdFailed',
  DetectNotCalled = 'DetectNotCalled',
}

export const enum State {
  Unexpected = -1,
  Success = 1,
  Undefined = 100,
  Null = 101,
  UnexpectedBehaviour = 102,
  WrongType = 103,
}

export class BotdError extends Error {
  state: State
  constructor(state: State, message: string) {
    super(message)
    this.state = state
    this.name = 'BotdError'
  }
}
