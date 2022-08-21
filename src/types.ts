import getSources from './sources'

export type BotDetectionResult =
  | {
      bot: true
      botKind: BotKind
    }
  | {
      bot: false
    }

export enum State {
  Unexpected = -100,
  Undefined = -1,
  Success = 1,
  Null = 101,
  UnexpectedBehaviour = 102,
  WrongType = 103,
  NotFunction = 104,
  ObfuscationError = 105,
}

export enum BotKind {
  HeadlessChrome = 'headless_chrome',
  Unrecognized = 'unrecognized',
  PhantomJS = 'phantomjs',
  Nightmare = 'nightmare',
  Selenium = 'selenium',
}

export type DetectionResponse = boolean | BotKind

export type Component<T> =
  | {
      state: State.Success
      value: T
    }
  | {
      state: Exclude<State, State.Success>
      error: string
    }

export type SignalType<T> = T extends (...args: any[]) => any ? Awaited<ReturnType<T>> : T

export type ComponentDict<T = ReturnType<typeof getSources>> = {
  [K in keyof T]: Component<SignalType<T[K]>>
}

export interface BotDetectorInterface {
  detect(): BotDetectionResult
  collect(): Promise<void>
}

/**
 * Represents the bot detection error.
 */
export class BotdError extends Error {
  state: Exclude<State, State.Success>

  /**
   * Creates a new BotdError.
   *
   * @class
   */
  constructor(state: Exclude<State, State.Success>, message: string) {
    super(message)
    this.state = state
    this.name = 'BotdError'
    Object.setPrototypeOf(this, BotdError.prototype)
  }
}

export enum BrowserKind {
  Unknown = 'unknown',
  Chrome = 'chrome',
  Firefox = 'firefox',
  Opera = 'opera',
  Safari = 'safari',
  IE = 'internet_explorer',
}
