export function getProperties(object: Window | Navigator | Document, properties: string[] = []): string[] {
  if (Object.getPrototypeOf(object) == null) return properties
  return getProperties(Object.getPrototypeOf(object), properties.concat(Object.getOwnPropertyNames(object)))
}

export function wait(n: number): Promise<NodeJS.Timeout> {
  return new Promise((resolve) => setTimeout(resolve, n))
}
