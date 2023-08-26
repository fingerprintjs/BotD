import { detectors } from './detectors'
import { sources } from './sources'
import { BotdError, BotDetectionResult, BotKind, Component, ComponentDict, DetectionDict, State } from './types'

export function detect(components: ComponentDict): [DetectionDict, BotDetectionResult] {
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

  return [detections, finalDetection]
}

export async function collect(): Promise<ComponentDict> {
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

  return components
}
