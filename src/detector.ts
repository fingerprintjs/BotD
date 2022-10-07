import getComponents from './components'
import getDetectors from './detection'
import {
  BotdError,
  BotDetectionResult,
  BotDetectorInterface,
  BotKind,
  Component,
  ComponentDict,
  DetectorsResponsesDict,
  State,
} from './types'

/**
 * Class representing a bot detector.
 *
 * @class
 * @implements {BotDetectorInterface}
 */
export default class BotDetector implements BotDetectorInterface {
  private componentsDict: ComponentDict | undefined = undefined

  private detectorsResponsesDict: DetectorsResponsesDict | undefined = undefined

  public get(): ComponentDict | undefined {
    return this.componentsDict
  }

  public getDetectorsResponses(): DetectorsResponsesDict | undefined {
    return this.detectorsResponsesDict
  }

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
    if (this.componentsDict === undefined) {
      throw new Error("BotDetector.detect can't be called before BotDetector.collect")
    }

    const components = this.componentsDict
    const detectors = this.getDetectors()
    const detectorsResponsesDict = {} as DetectorsResponsesDict

    for (const detectorName in detectors) {
      const detector = detectors[detectorName as keyof typeof detectors]
      const detectorRes = detector(components)

      let detectionRes: BotDetectionResult = { bot: false }

      if (typeof detectorRes === 'string') {
        detectionRes = { bot: true, botKind: detectorRes }
      } else if (detectorRes) {
        detectionRes = { bot: true, botKind: BotKind.Unknown }
      }

      detectorsResponsesDict[detectorName as keyof typeof detectors] = detectionRes
    }

    this.detectorsResponsesDict = detectorsResponsesDict

    return Object.values(detectorsResponsesDict).find((r) => r.bot) ?? { bot: false }
  }

  /**
   * @inheritdoc
   */
  public async collect(): Promise<ComponentDict> {
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

    this.componentsDict = resMap
    return resMap
  }
}
