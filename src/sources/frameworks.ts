export default function isFramework(): boolean {
    const w = window
    const d = document
    const {documentElement} = d

    return (
        'callPhantom' in w ||               //  phantomjs
        '_phantom' in w ||

        '__nightmare' in w ||               //  nightmarejs

        'geb' in w ||                       //  geb

        'awesomium' in w ||                 //  awesomium

        '__phantomas' in w ||               //  phantomas

        'emit' in w ||                      //  couchjs

        'spawn' in w ||                     //  rhino

        'Buffer' in w ||                    //  nodejs

        'domAutomation' in w ||             //  chromium
        'domAutomationController' in w ||

        'webdriver' in w ||                 //  selenium
        '_Selenium_IDE_Recorder' in w ||
        'callSelenium' in w ||
        '_selenium' in w ||

        '__webdriver_script_fn' in d ||
        '__driver_evaluate' in d ||
        '__webdriver_evaluate' in d ||
        '__selenium_evaluate' in d ||
        '__fxdriver_evaluate' in d ||
        '__webdriverFunc' in w ||
        '__driver_unwrapped' in d ||
        '__webdriver_unwrapped' in d ||
        '__selenium_unwrapped' in d ||
        '__fxdriver_unwrapped' in d ||
        '__webdriver_script_fn' in d ||
        '__webdriver_script_func' in d ||
        '__webdriver_script_function' in d ||

        'calledSelenium' in w ||
        '$cdc_asdjflasutopfhvcZLmcfl_' in w ||
        '$chrome_asyncScriptInfo' in w ||

        '__$webdriverAsyncExecutor' in d ||

        '__lastWatirAlert' in w ||
        '__lastWatirConfirm' in w ||
        '__lastWatirPrompt' in w ||

        '_WEBDRIVER_ELEM_CACHE' in w ||

        documentElement.getAttribute('selenium') !== null ||
        documentElement.getAttribute('webdriver') !== null ||
        documentElement.getAttribute('driver') !== null
    )
}
