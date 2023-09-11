import { BotDetectionResult, BotDetectorInterface, ComponentDict, DetectionDict } from './types'
import { collect, detect } from './api'
import { detectors } from './detectors'
import { sources } from './sources'

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

  /**
   * @inheritdoc
   */
  public detect(): BotDetectionResult {
    if (this.components === undefined) {
      throw new Error("BotDetector.detect can't be called before BotDetector.collect")
    }

    const [detections, finalDetection] = detect(this.components, detectors)

    this.detections = detections
    return finalDetection
  }

  /**
   * @inheritdoc
   */
  public async collect(): Promise<ComponentDict> {
    this.components = await collect(sources)
    return this.components
  }
}
