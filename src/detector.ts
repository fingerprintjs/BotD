import getComponents from './components'
import getDetectors from './detection'
import { BotdError, BotDetectionResult, BotDetectorInterface, BotKind, Component, ComponentDict, State } from './types'

/**
 * Class representing a bot detector.
 *
 * @class
 * @implements {BotDetectorInterface}
 */
export default class BotDetector implements BotDetectorInterface {
  private components: ComponentDict | undefined = undefined

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  protected getDetectors() {
    return getDetectors()
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  protected getComponents() {
    return getComponents()
  }

  /**
   * @inheritdoc
   */
  public detect(): BotDetectionResult {
    if (this.components == null) {
      throw new Error("BotDetector.detect can't be called before BotDetector.collect")
    }

    const components = this.components
    const detectors = this.getDetectors()

    for (const detector of detectors) {
      const detectorRes = detector(components)

      if (typeof detectorRes === 'string') {
        return { bot: true, botKind: detectorRes }
      } else if (detectorRes) {
        return { bot: true, botKind: BotKind.Unknown }
      }
    }

    return { bot: false }
  }

  /**
   * @inheritdoc
   */
  public async collect(): Promise<void> {
    const components = this.getComponents()
    const resMap = {} as ComponentDict

    const keys = Object.keys(components) as (keyof typeof components)[]

    await Promise.all(
      keys.map(async (key) => {
        const res = components[key]

        try {
          resMap[key] = {
            value: await res(),
            state: State.Success,
          } as Component<any> as any
        } catch (error) {
          if (error instanceof BotdError) {
            resMap[key] = {
              state: error.state,
              error: `${error.name}: ${error.message}`,
            }
          } else {
            resMap[key] = {
              state: State.UnexpectedBehaviour,
              error: error instanceof Error ? `${error.name}: ${error.message}` : String(error),
            }
          }
        }
      }),
    )

    this.components = resMap
  }
}
