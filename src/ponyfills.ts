export function arrayIncludes<T>(arr: T[], value: T): boolean {
  return arr.indexOf(value) !== -1
}

export function strIncludes(str: string, value: string): boolean {
  return str.indexOf(value) !== -1
}

export function arrayReduce<T extends any[], U>(
  array: T,
  callback: (previousValue: U, currentValue: T, currentIndex: number, array: T[]) => U,
  initialValue: U,
): U {
  if ('reduce' in array) return array.reduce(callback)
  let accumulator = initialValue
  for (let i = 0; i < array.length; i++) {
    accumulator = callback(accumulator, array[i], i, array)
  }
  return accumulator
}

export function arrayFind<T>(array: T[], callback: (value: T, index: number, array: T[]) => boolean): T | undefined {
  if ('find' in array) return array.find(callback)
  for (let i = 0; i < array.length; i++) {
    if (callback(array[i], i, array)) return array[i]
  }
  return undefined
}
