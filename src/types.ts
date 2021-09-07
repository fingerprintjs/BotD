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

type DetectStatus = 'processed' | 'notEnoughData' | 'error'

type DetectNote = {
  status: DetectStatus
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

export const enum ErrorCodes {
  BotdFailed = 'BotdFailed',
  DetectNotCalled = 'DetectNotCalled',
}

export interface BotDetectorInterface {
  detect(optionsOrTag?: string | DetectOptions): Promise<BotdResponse>
  /**
   * @deprecated Will be removed in the next major version, use detect(options: DetectOptions) instead
   */
  detect(tag?: string): Promise<BotdResponse>

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

export const enum State {
  Unexpected = -100,
  Undefined = -1,
  Success = 1,
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
