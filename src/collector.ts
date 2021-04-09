import handleAll from "./types";
import getUserAgent from "./sources/userAgent";
import hasUserAgentData from "./sources/userAgentData";
import getAppVersion from "./sources/appVersion";
import getRTT from "./sources/rtt";
import getWindowOuterSize from "./sources/windowOuterSize";
import arePermissionsInconsistent from "./sources/permissions";
import getWebGL from "./sources/webgl";
import getScreen from "./sources/screen";
import getDeviceMemory from "./sources/deviceMemory";
import isBigEndian from "./sources/endian";
import getHardwareConcurrency from "./sources/hardwareConcurrency";
import hasChrome from "./sources/chrome";
import getEvalLength from "./sources/evalLength";
import getPluginsLength from "./sources/pluginsLength";
import arePluginsConsistent from "./sources/pluginsConsistence";
import getErrorTrace from "./sources/errorTrace";
import getErrorFF from "./sources/errorFF";
import getOSCPU from "./sources/oscpu";
import getPlatform from "./sources/platform";
import getProductSub from "./sources/productSub";
import getVendor from "./sources/vendor";
import isFramework from "./sources/frameworks";
import getWebDriver from "./sources/webDriver";
import getInstallTrigger from "./sources/installTrigger";
import getFrequency from "./sources/frequency";
import getWindowProperties from "./sources/window";
import getDocumentProperties from "./sources/document";
import getNavigatorProperties from "./sources/navigator";

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
        "install_trigger": getInstallTrigger,
        "framework": isFramework,
        "webdriver": getWebDriver,
        "eval_length": getEvalLength,
        "plugins_length": getPluginsLength,
        "plugins_consistence": arePluginsConsistent,
        "error_trace": getErrorTrace,
        "error_ff": getErrorFF,
        "oscpu": getOSCPU,
        "platform": getPlatform,
        "product_sub": getProductSub,
        "vendor": getVendor,
        "frequency": getFrequency,
        "window": getWindowProperties,
        "document": getDocumentProperties,
        "navigator": getNavigatorProperties
    })
}