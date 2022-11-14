/**
 * Be careful, NaN can return
 */
export function toFloat(value: unknown): number {
  return parseFloat(value as string)
}

export function replaceNaN<T, U>(value: T, replacement: U): T | U {
  return typeof value === 'number' && isNaN(value) ? replacement : value
}

/**
 * Be careful, NaN can return
 */
export function toInt(value: unknown): number {
  return parseInt(value as string)
}
