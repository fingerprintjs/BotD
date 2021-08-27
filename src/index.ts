import BotDetector from './detector'
import { BotDetectorInterface, InitOptions } from './types'

export async function load(options: InitOptions): Promise<BotDetectorInterface> {
  const detector = new BotDetector(options)
  await detector.collect()
  return detector
}

export default { load }
