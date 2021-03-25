export default function isPhantomJS(): boolean {
    const w = window

    return (
        'callPhantom' in w ||
        '_phantom' in w
    )
}