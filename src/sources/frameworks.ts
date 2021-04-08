function checkPhantomJS(): boolean {
    return 'callPhantom' in window || '_phantom' in window || 'phantom' in window
}

function checkNightmareJS(): boolean {
    return '__nightmare' in window
}

function checkGeb(): boolean {
    return 'geb' in window
}

function checkAwesomium(): boolean {
    return 'awesomium' in window
}

function checkPhantomas(): boolean {
    return '__phantomas' in window
}

function checkCouchJS(): boolean {
    return 'emit' in window
}

function checkRhino(): boolean {
    return 'spawn' in window
}

function checkNodeJS(): boolean {
    return 'Buffer' in window
}

function checkSequenium(): boolean {
    const w = window
    return ('external' in w && w['external'].toString().indexOf('Sequentum') !== -1)
}

function checkElectron() {
    return window.close.toString().toLowerCase().indexOf("electron") !== -1
}

function checkChromium(): boolean {
    return 'domAutomation' in window || 'domAutomationController' in window
}

function checkCDCache() {
    const d = document
    for (const k in d) { // @ts-ignore
        if (d.hasOwnProperty(k) && k.match(/\$[a-z]dc_/) && d[k]['cache_'])
            return true
    }
    return false
}

function checkCDC() {
    const w = window
    for (const k in w)
        if(w.hasOwnProperty(k) && k.match(/[a-z]dc_/))
            return true
    return false
}

function detectKeys(keys: string[], o: Object): boolean {
    for (const i in keys)
        if (keys.hasOwnProperty(i)) {
            const value = keys[i];
            if (o.hasOwnProperty(value))
                return true;
        }
    return false
}

function checkWebdriver() {
    const d = document
    const w = window
    const {documentElement} = d

    const list = [
        'webdriver',
        '__webdriver_script_fn',
        '__driver_evaluate',
        '__webdriver_evaluate',
        '__fxdriver_evaluate',
        '__webdriverFunc',
        '__driver_unwrapped',
        '__webdriver_unwrapped',
        '__fxdriver_unwrapped',
        '__webdriver_script_fn',
        '__webdriver_script_func',
        '__webdriver_script_function',
        '$cdc_asdjflasutopfhvcZLmcf',
        '$cdc_asdjflasutopfhvcZLmcfl_',
        '$chrome_asyncScriptInfo',
        '__$webdriverAsyncExecutor',
        '__lastWatirAlert',
        '__lastWatirConfirm',
        '__lastWatirPrompt',
        '_WEBDRIVER_ELEM_CACHE',
        'ChromeDriverw'
    ]

    const inWindow = detectKeys(list, w)
    const inDocument = detectKeys(list, d)
    const inAttr = documentElement.getAttribute('webdriver') !== null ||
        documentElement.getAttribute('driver') !== null

    return inWindow || inDocument || inAttr
}

function checkSelenium() {
    const d = document
    const w = window
    const {documentElement} = d

    const list = [
        '__selenium_evaluate',
        '__selenium_unwrapped',
        '_Selenium_IDE_Recorder',
        '_selenium',
        'calledSelenium',
        'selenium-evaluate',
    ]

    const inWindow = detectKeys(list, w)
    const inDocument = detectKeys(list, d)
    const inAttr = documentElement.getAttribute('selenium') !== null

    return inWindow || inDocument || inAttr
}

export default function isFramework(): boolean {
    return checkPhantomJS() ||
        checkPhantomas() ||
        checkNightmareJS() ||
        checkAwesomium() ||
        checkGeb() ||
        checkCouchJS() ||
        checkElectron() ||
        checkRhino() ||
        checkNodeJS() ||
        checkChromium() ||
        checkSequenium() ||
        checkCDC() ||
        checkCDCache() ||
        checkWebdriver() ||
        checkSelenium()
}
