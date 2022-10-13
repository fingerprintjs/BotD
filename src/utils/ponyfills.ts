export function arrayIncludes<T>(arr: T[], value: T): boolean {
  return arr.indexOf(value) !== -1
}

export function strIncludes(str: string, value: string): boolean {
  return str.indexOf(value) !== -1
}

export function arrayFind<T>(array: T[], callback: (value: T, index: number, array: T[]) => boolean): T | undefined {
  if ('find' in array) return array.find(callback)
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  for (let i = 0; i < array.length; i++) {
    if (callback(array[i], i, array)) return array[i]
  }
  return undefined
}
