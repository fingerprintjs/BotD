export default async function arePluginsInconsistent(): Promise<boolean | undefined> {
    const { plugins } = navigator
    if (!plugins)
        return undefined

    let length = plugins.length
    if (length === 0)
        return true

    let isConsistent = Object.getPrototypeOf(plugins) === PluginArray.prototype
    for(let i = 0; i < plugins.length; i++)
        isConsistent &&= Object.getPrototypeOf(plugins[i]) === Plugin.prototype

    return !isConsistent
}