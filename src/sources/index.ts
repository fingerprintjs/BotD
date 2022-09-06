import { SignalKind } from '../signals'
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
import getWindowClose from './window-close'
import getWindowExternal from './window-external'
import getWindowProperties from './window-properties'
import getWindowSize from './window-size'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function getSources() {
  return {
    [SignalKind.WebDriver]: getWebDriver,
    [SignalKind.EvalLength]: getEvalLength,
    [SignalKind.UserAgentData]: getUserAgentData,
    [SignalKind.UserAgent]: getUserAgent,
    [SignalKind.BrowserKind]: getBrowserKind,
    [SignalKind.PluginsLength]: getPluginsLength,
    [SignalKind.Languages]: getLanguages,
    [SignalKind.WebGL]: getWebGL,
    [SignalKind.Permissions]: getPermissions,
    [SignalKind.ErrorTrace]: getErrorTrace,
    [SignalKind.AppVersion]: getAppVersion,
    [SignalKind.RTT]: getRTT,
    [SignalKind.WindowProps]: getWindowProperties,
    [SignalKind.WindowClose]: getWindowClose,
    [SignalKind.Process]: getProcess,
    [SignalKind.DocumentProps]: getDocumentProperties,
    [SignalKind.PluginsArray]: getPluginsArray,
    [SignalKind.FunctionBind]: getFunctionBind,
    [SignalKind.WindowSize]: getWindowSize,
    [SignalKind.WindowExternal]: getWindowExternal,
    [SignalKind.DocumentAttributes]: getDocumentAttributes,
  }
}
