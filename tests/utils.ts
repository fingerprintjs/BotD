import { UAParser } from 'ua-parser-js'

/*
 * Sometimes tests need to know what browser they run in to make proper assertions.
 * Karma doesn't provide this information.
 * The browser detect functions in the `src` directory can't be used because they are objects of testing.
 * Therefore a popular third party library is used to detect browser.
 * The library isn't used in the main code because some visitors tamper user agent while the test environments don't.
 *
 * We should find a way to pass browser settings from the Karma configuration to the tests,
 * otherwise we can't distinguish incognito browsers from regular browsers, Brave from Chrome, etc.
 */
export function isChromium(): boolean {
  return new UAParser().getEngine().name === 'Blink'
}

export function isHeadlessChrome(): boolean {
  return navigator.userAgent.includes('HeadlessChrome')
}

export function isGecko(): boolean {
  return new UAParser().getEngine().name === 'Gecko'
}

export function isWebKit(): boolean {
  return new UAParser().getEngine().name === 'WebKit'
}

export function isMobile(): boolean {
  return new UAParser().getDevice().type === 'mobile'
}

export function isMacOS(): boolean {
  return new UAParser().getOS().name === 'Mac OS'
}

export function getOsMajorVersion(): number | undefined {
  const version = new UAParser().getOS().version
  if (version === undefined) {
    return undefined
  }
  return parseInt(version.split('.')[0])
}

export function getBrowserMajorVersion(): number | undefined {
  const version = new UAParser().getBrowser().version
  if (version === undefined) {
    return undefined
  }
  return parseInt(version.split('.')[0])
}

export function getBrowserVersion(): { major: number; minor: number } | undefined {
  const version = new UAParser().getBrowser().version
  if (version === undefined) {
    return undefined
  }

  return {
    major: parseInt(version.split('.')[0]),
    minor: parseInt(version.split('.')[1]),
  }
}
