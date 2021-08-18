import BotDetector from './detector'
import { BotDetectorInterface, Options } from './types'

export async function load(options: Options): Promise<BotDetectorInterface> {
  const detector = new BotDetector(options)
  await detector.collect()
  return detector
}

export default { load }
