import getDetectors from './detectors'
import getSources from './sources'
import {
  BotdError,
  BotDetectionResult,
  BotDetectorInterface,
  BotKind,
  Component,
  ComponentDict,
  DetectionDict,
  State,
} from './types'

/**
 * Class representing a bot detector.
 *
 * @class
 * @implements {BotDetectorInterface}
 */
export default class BotDetector implements BotDetectorInterface {
  protected components: ComponentDict | undefined = undefined

  protected detections: DetectionDict | undefined = undefined

  public getComponents(): ComponentDict | undefined {
    return this.components
  }

  public getDetections(): DetectionDict | undefined {
    return this.detections
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  protected getSources() {
    return getSources()
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  protected getDetectors() {
    return getDetectors()
  }

  /**
   * @inheritdoc
   */
  public detect(): BotDetectionResult {
    if (this.components === undefined) {
      throw new Error("BotDetector.detect can't be called before BotDetector.collect")
    }

    const components = this.components
    const detectors = this.getDetectors()

    const detections = {} as DetectionDict
    let finalDetection: BotDetectionResult = {
      bot: false,
    }

    for (const detectorName in detectors) {
      const detector = detectors[detectorName as keyof typeof detectors]
      const detectorRes = detector(components)

      let detection: BotDetectionResult = { bot: false }

      if (typeof detectorRes === 'string') {
        detection = { bot: true, botKind: detectorRes }
      } else if (detectorRes) {
        detection = { bot: true, botKind: BotKind.Unknown }
      }

      detections[detectorName as keyof typeof detectors] = detection

      if (detection.bot) {
        finalDetection = detection
      }
    }

    this.detections = detections

    return finalDetection
  }

  /**
   * @inheritdoc
   */
  public async collect(): Promise<ComponentDict> {
    const sources = this.getSources()
    const components = {} as ComponentDict

    const sourcesKeys = Object.keys(sources) as (keyof typeof sources)[]

    await Promise.all(
      sourcesKeys.map(async (sourceKey) => {
        const res = sources[sourceKey]

        try {
          components[sourceKey] = ({
            value: await res(),
            state: State.Success,
          } as Component<any>) as any
        } catch (error) {
          if (error instanceof BotdError) {
            components[sourceKey] = {
              state: error.state,
              error: `${error.name}: ${error.message}`,
            }
          } else {
            components[sourceKey] = {
              state: State.UnexpectedBehaviour,
              error: error instanceof Error ? `${error.name}: ${error.message}` : String(error),
            }
          }
        }
      }),
    )

    this.components = components
    return this.components
  }
}
