import getAppVersion from './app-version'
import getBrowserKind from './browser-kind'
import getDocumentAttributes from './document-attributes'
import getDocumentProperties from './document-properties'
import getErrorTrace from './error-trace'
import getEvalLength from './eval-length'
import getFunctionBind from './function-bind'
import getLanguages from './languages'
import getPermissions from './permissions'
import getPluginsArray from './plugins-array'
import getPluginsLength from './plugins-length'
import getProcess from './process'
import getRTT from './rtt'
import getUserAgent from './user-agent'
import getUserAgentData from './user-agent-data'
import { getWebDriver } from './web-driver'
import getWebGL from './webgl'
import getWindowExternal from './window-external'
import getWindowProperties from './window-properties'
import getWindowSize from './window-size'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function getComponents() {
  return {
    appVersion: getAppVersion,
    browserKind: getBrowserKind,
    documentAttributes: getDocumentAttributes,
    documentProps: getDocumentProperties,
    errorTrace: getErrorTrace,
    evalLength: getEvalLength,
    functionBind: getFunctionBind,
    languages: getLanguages,
    permissions: getPermissions,
    pluginsArray: getPluginsArray,
    pluginsLength: getPluginsLength,
    process: getProcess,
    rtt: getRTT,
    userAgent: getUserAgent,
    userAgentData: getUserAgentData,
    webDriver: getWebDriver,
    webGL: getWebGL,
    windowExternal: getWindowExternal,
    windowProps: getWindowProperties,
    windowSize: getWindowSize,
  }
}
