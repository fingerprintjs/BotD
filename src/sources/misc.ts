export function getProperties(object: Window | Navigator | Document, properties: string[] = []): string[] {
  if (Object.getPrototypeOf(object) == null) return properties
  return getProperties(Object.getPrototypeOf(object), properties.concat(Object.getOwnPropertyNames(object)))
}

export const re = /(^(.{0,5})$)|(^.*(-|_|\$|[jJ][sS]|[uU]ser|[sS]cript|[iI]nit|[dD]river|[aA]uto|[aA]gent|[sS]end|[lL]oad|[dD]ev|[cC]all|[bB]..f|[pP]rint|[kK]it|ium|[aA]rray|[pP]romise|[sS]ymbol|[cC]reate|[cC]onst).*$)|(^([A-Z_])*$)|(^([a-z-]){0,9}$)/
