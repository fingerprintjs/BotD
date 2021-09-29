/**
 * Represents a simple component value. Component value is a result of the source evaluation.
 */
type SimpleComponentValue = string | number | boolean

/**
 * Represents a component value. Component value is a result of the source evaluation.
 */
type ComponentValue = SimpleComponentValue | SimpleComponentValue[]

/**
 * Represents a source. The source is a function that returns a component value.
 */
export type Source = () => ComponentValue | Promise<ComponentValue>

/**
 * Dictionary colletion of the sources.
 */
export type SourceDict = Record<string, Source>

/**
 * Represents a component with state and value.
 */
export type Component =
  | {
      state: State.Success
      value: ComponentValue
    }
  | {
      state: State
      value: string
    }

/**
 * Dictionary of components.
 */
export type ComponentDict = Record<string, Component>

/**
 * Represents the response of the bot detecton API.
 */
export type BotdResponse = RequestIdResponse | SuccessResponse | ErrorResponse

/**
 * Status of the bot detection.
 */
type DetectStatus = 'processed' | 'notEnoughData' | 'error'

/**
 * Detection result note.
 */
type DetectNote = {
  status: DetectStatus
  probability: number
  type?: string
}

/**
 * Interface for request identifier response of the bot detection API.
 *
 * @interface RequestIdResponse
 */
export interface RequestIdResponse {
  requestId: string
}

/**
 * Interface for success response of the bot detection API.
 *
 * @interface SuccessResponse
 */
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

/**
 * Interface for error response of the bot detection API.
 *
 * @interface ErrorResponse
 */
export interface ErrorResponse {
  error: {
    code: ErrorCodes
    message: string
  }
}

/**
 * Enum for bot detection error codes.
 *
 * @readonly
 * @enum {string}
 */
export const enum ErrorCodes {
  BotdFailed = 'BotdFailed',
  DetectNotCalled = 'DetectNotCalled',
}

/**
 * Interface for classes that represent a bot detector.
 *
 * @interface BotDetectorInterface
 */
export interface BotDetectorInterface {
  /**
   * Performs bot detection, internally it will make a network request to the server-side bot detection API.
   *
   * @param {(string|DetectOptions)} optionsOrTag Configuration options for bot detector. It's recommended to use the DetectOptions instead of the string tag.
   * @returns {Promise<BotdResponse>} A promise to the instance of the bot detection response.
   */
  detect(optionsOrTag?: string | DetectOptions): Promise<BotdResponse>

  /**
   * @deprecated Will be removed in the next major version, use detect(options: DetectOptions) instead.
   */
  detect(tag?: string): Promise<BotdResponse>

  /**
   * Collects all the components from the browser.
   *
   * @returns {Promise<ComponentDict>} A promise to the collected components.
   */
  collect(): Promise<ComponentDict>
}

/**
 * Interface for configuration for the bot detector.
 *
 * @interface InitOptions
 */
export interface InitOptions {
  /**
   * A token required to access the server-side bot detection API.
   */
  token: string

  /**
   * Represents mode for querying API. Default is 'requestId'.
   */
  mode?: Modes

  /**
   * Optional endpoint for the server-side bot detection API.
   *
   * @todo Specify the endpoint for the server-side bot detection API once it's available.
   */
  endpoint?: string
  isIntegration?: boolean
}

/**
 * Interface for configuration for detect options.
 *
 * @interface DetectOptions
 */
export interface DetectOptions {
  /**
   * Represents metadata string that you can associate with each bot detection event.
   */
  tag: string
}

/**
 * Interface for classes that represent the request body for the bot detection detect request.
 *
 * @interface DetectBody
 */
export interface DetectBody {
  mode: Modes
  performance?: number
  signals?: ComponentDict
  version: string
  token: string
  tag: string
}

/**
 * Represents mode for querying API.
 * When `requestId` mode is used, only `requestId` field is returned back to the browser. This mode is recommended for production usage.
 * When `allData` mode is used, all data from the bot detection result is returned back to the browser.
 */
export type Modes = 'requestId' | 'allData'

/**
 * Enum for the source state.
 *
 * @readonly
 * @enum {number}
 */
export const enum State {
  Unexpected = -100,
  Undefined = -1,
  Success = 1,
  Null = 101,
  UnexpectedBehaviour = 102,
  WrongType = 103,
  NotFunction = 104,
}

/**
 * Represents the bot detection error.
 */
export class BotdError extends Error {
  state: State

  /**
   * Creates a new BotdError.
   *
   * @class
   */
  constructor(state: State, message: string) {
    super(message)
    this.state = state
    this.name = 'BotdError'
  }
}
