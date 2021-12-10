import BotDetector from './detector'
import { BotDetectorInterface, InitOptions } from './types'

export { BotdResponse } from './types'

/**
 * Builds an instance of the BotDetector. It's recommended to call it as early as possible, ideally during application startup.
 *
 * @param {InitOptions} options Configuration options.
 * @returns {Promise<BotDetectorInterface>} A promise to the instance of the bot detector.
 */
export async function load(options: InitOptions): Promise<BotDetectorInterface> {
  const detector = new BotDetector(options)
  await detector.collect()
  return detector
}

export default { load }
