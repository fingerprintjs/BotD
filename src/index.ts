import BotDetector from './detector'
import { Options } from './types'

export async function load(options: Options): Promise<BotDetector> {
  const detector = new BotDetector(options)
  await detector.collect()
  return detector
}
