export default async function arePluginsConsistent(): Promise<boolean> {
    const { plugins } = navigator
    if (!plugins)
        return false

    let isConsistent = Object.getPrototypeOf(plugins) === PluginArray.prototype
    for(let i = 0; i < plugins.length; i++)
        isConsistent &&= Object.getPrototypeOf(plugins[i]) === Plugin.prototype

    return isConsistent
}