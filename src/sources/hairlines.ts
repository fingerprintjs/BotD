import { BotdError, State } from '../types'

export default function getHairlines(): number[] {
  if (window.devicePixelRatio === undefined) {
    throw new BotdError(State.Undefined, 'window.devicePixelRatio is undefined')
  }
  const el = document.createElement('div')
  el.style.border = '.5px dotted transparent'
  document.body.appendChild(el)
  const offsetHeight = el.offsetHeight
  document.body.removeChild(el)
  return [window.devicePixelRatio, offsetHeight]
}
