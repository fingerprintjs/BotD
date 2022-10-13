import { version } from '../package.json'
import BotDetector from './detector'
import { BotDetectorInterface } from './types'
import getSources from './sources'
export * from './sources'

/**
 * Options for BotD loading
 */
export interface LoadOptions {
  /**
   * Set `false` to disable the unpersonalized AJAX request that the agent sends to collect installation statistics.
   * It's always disabled in the version published to the FingerprintJS CDN.
   */
  monitoring?: boolean
}

/**
 * Sends an unpersonalized AJAX request to collect installation statistics
 */
function monitor() {
  // The FingerprintJS CDN (https://github.com/f ingerprintjs/cdn) replaces `window.__fpjs_d_m` with `true`
  if (window.__fpjs_d_m || Math.random() >= 0.001) {
    return
  }
  try {
    const request = new XMLHttpRequest()
    request.open('get', `https://m1.openfpcdn.io/botd/v${version}/npm-monitoring`, true)
    request.send()
  } catch (error) {
    // console.error is ok here because it's an unexpected error handler
    // eslint-disable-next-line no-console
    console.error(error)
  }
}

export async function load({ monitoring = true }: Readonly<LoadOptions> = {}): Promise<BotDetectorInterface> {
  if (monitoring) {
    monitor()
  }
  const detector = new BotDetector()
  await detector.collect()
  return detector
}

export default { load }
export { getSources }
