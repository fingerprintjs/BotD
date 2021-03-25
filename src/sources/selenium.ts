export default function isSelenium(): boolean {
    const w = window
    const d = document
    const { documentElement } = d

    return (
        'webdriver' in w ||
        '_Selenium_IDE_Recorder' in w ||
        'callSelenium' in w ||
        '_selenium' in w ||
        '__webdriver_script_fn' in d ||
        '__driver_evaluate' in d ||
        '__webdriver_evaluate' in d ||
        '__selenium_evaluate' in d ||
        '__fxdriver_evaluate' in d ||
        '__driver_unwrapped' in d ||
        '__webdriver_unwrapped' in d ||
        '__selenium_unwrapped' in d ||
        '__fxdriver_unwrapped' in d ||
        '__webdriver_script_func' in d ||
        documentElement.getAttribute('selenium') !== null ||
        documentElement.getAttribute('webdriver') !== null ||
        documentElement.getAttribute('driver') !== null
    )
}