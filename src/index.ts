import BotDetector from './detector'
import { BotDetectorInterface } from './types'

/**
 * Builds an instance of the BotDetector. It's recommended to call it as early as possible, ideally during application startup.
 *
 * @param {InitOptions} options Configuration options.
 * @returns {Promise<BotDetectorInterface>} A promise to the instance of the bot detector.
 */
export async function load(): Promise<BotDetectorInterface> {
  const detector = new BotDetector()
  await detector.collect()
  return detector
}

export default { load }
