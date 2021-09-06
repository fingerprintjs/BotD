export default async function areMimeTypesConsistent(): Promise<boolean> {
  const { mimeTypes } = navigator
  if (!mimeTypes) {
    return false
  }

  let isConsistent = Object.getPrototypeOf(mimeTypes) === MimeTypeArray.prototype
  for (let i = 0; i < mimeTypes.length; i++) {
    isConsistent &&= Object.getPrototypeOf(mimeTypes[i]) === MimeType.prototype
  }

  return isConsistent
}
