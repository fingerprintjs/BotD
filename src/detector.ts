import getDetectors from './detection'
import getSources from './sources'
import { BotDetectionResult, BotDetectorInterface, BotKind, ComponentDict, State } from './types'

export default class BotDetector implements BotDetectorInterface {
  private components: ComponentDict = {}

  public detect(): BotDetectionResult {
    const components = this.components
    const detectors = getDetectors()

    for (const detector of detectors) {
      const detectorRes = detector(components)

      if (typeof detectorRes === 'string') {
        return { bot: true, botKind: BotKind[detectorRes] }
      } else if (detectorRes) {
        return { bot: true, botKind: BotKind.Unrecognized }
      }
    }

    return { bot: false }
  }

  public async collect(): Promise<void> {
    const sources = getSources()
    const components: ComponentDict = {}

    let k: keyof typeof sources

    for (k in sources) {
      try {
        if (Object.prototype.hasOwnProperty.call(sources, k)) {
          components[k] = {
            state: State.Success,
            value: await sources[k](),
          }
        }
      } catch (error) {
        if (error instanceof Error) {
          components[k] = {
            state: State.UnexpectedBehaviour,
            value: `${error.name}: ${error.message}`,
          }
        } else {
          components[k] = {
            state: State.UnexpectedBehaviour,
            value: String(error),
          }
        }
      }
    }

    this.components = components
  }
}
