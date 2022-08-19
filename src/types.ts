export type BotDetectionResult =
  | {
      bot: true
      botKind: BotKind
    }
  | {
      bot: false
    }

export enum State {
  Success,
  UnexpectedBehaviour,
}

export enum BotKind {
  HeadlessChrome = 'headless_chrome',
  Unrecognized = 'unrecognized',
}

export type DetectionResponse = boolean | typeof BotKind

type SimpleComponentValue = string | number | boolean

type ComponentValue = SimpleComponentValue | SimpleComponentValue[]

export type Source = () => ComponentValue | Promise<ComponentValue>

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

export interface BotDetectorInterface {
  detect(): BotDetectionResult

  collect(): Promise<void>
}
