export default async function arePluginsConsistent(): Promise<boolean> {
  if (navigator.plugins === undefined) {
    return false
  }
  const { plugins } = navigator
  let isConsistent = Object.getPrototypeOf(plugins) === PluginArray.prototype
  for (let i = 0; i < plugins.length; i++) {
    isConsistent &&= Object.getPrototypeOf(plugins[i]) === Plugin.prototype
  }
  return isConsistent
}
