export default async function areMimeTypesConsistent(): Promise<boolean> {
  if (navigator.mimeTypes === undefined) {
    return false
  }
  const { mimeTypes } = navigator
  let isConsistent = Object.getPrototypeOf(mimeTypes) === MimeTypeArray.prototype
  for (let i = 0; i < mimeTypes.length; i++) {
    isConsistent &&= Object.getPrototypeOf(mimeTypes[i]) === MimeType.prototype
  }
  return isConsistent
}
