import { getProperties, re } from './misc'

export default function getWindowProperties(): string[] {
  let raw = getProperties(window)
  const chromeIndex = raw.indexOf('chrome')
  const safariIndex = raw.indexOf('safari')
  raw = raw.filter((el, i) => {
    const matchRe = el.match(re) != null
    const chromeAround = chromeIndex != -1 ? i > chromeIndex - 5 && i < chromeIndex + 5 : false
    const safariAround = safariIndex != -1 ? i > safariIndex - 5 && i < safariIndex + 5 : false
    return matchRe || chromeAround || safariAround
  })
  return raw
}
