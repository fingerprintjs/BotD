export function getObjectProps(
  obj: Record<string, any>,
  props: string[] = [],
): string[] {
  if (Object.getPrototypeOf(obj) == null) return props;
  return getObjectProps(
    Object.getPrototypeOf(obj),
    props.concat(Object.getOwnPropertyNames(obj)),
  );
}

export function includes(arr: string[], ...keys: (string | RegExp)[]): boolean {
  for (const key of keys) {
    if (typeof key === "string") {
      if (arr.includes(key)) return true;
    } else {
      const match = arr.find((value) => key.test(value));
      if (match != null) return true;
    }
  }
  return false;
}
