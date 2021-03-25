import handleAll from "./types.js";
import getUserAgent from "./sources/userAgent.js";
import hasUserAgentData from "./sources/userAgentData.js";
import getAppVersion from "./sources/appVersion.js";
import hasWebDriver from "./sources/webDriver.js";
import getRTT from "./sources/rtt.js";
import getWindowOuterSize from "./sources/windowOuterSize.js";
import arePermissionsInconsistent from "./sources/permissions.js";
import getWebGL from "./sources/webgl.js";
import getScreen from "./sources/screen.js";
import getDeviceMemory from "./sources/deviceMemory.js";
import isBigEndian from "./sources/endian.js";
import getHardwareConcurrency from "./sources/hardwareConcurrency.js";
import hasChrome from "./sources/chrome.js";
import isSelenium from "./sources/selenium.js";
import getEmptyEvalLength from "./sources/emptyEvalLength.js";
import isPhantomJS from "./sources/phantomjs.js";

export default async function collect() {
    return handleAll({
        "user_agent": getUserAgent,
        "user_agent_data": hasUserAgentData,
        "app_version": getAppVersion,
        "rtt": getRTT,
        "window_outer_size": getWindowOuterSize,
        "notification_permissions": arePermissionsInconsistent,
        "webgl": getWebGL,
        "screen": getScreen,
        "device_memory": getDeviceMemory,
        "endian": isBigEndian,
        "cores": getHardwareConcurrency,
        "chrome": hasChrome,
        "selenium": isSelenium,
        "phantomjs": isPhantomJS,
        "web_driver": hasWebDriver,
        "empty_eval_length": getEmptyEvalLength
    })
}