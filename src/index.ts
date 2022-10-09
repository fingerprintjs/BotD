import BotDetector from './detector'
import { BotDetectorInterface } from './types'
export * from './sources'

export async function load(): Promise<BotDetectorInterface> {
  const detector = new BotDetector()
  await detector.collect()
  return detector
}

export default { load }
