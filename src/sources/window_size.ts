export interface WindowSizePayload {
  outerWidth: number
  outerHeight: number
  innerWidth: number
  innerHeight: number
}

export default function getWindowSize(): WindowSizePayload {
  return {
    outerWidth: window.outerWidth,
    outerHeight: window.outerHeight,
    innerWidth: window.innerWidth,
    innerHeight: window.innerHeight,
  }
}
