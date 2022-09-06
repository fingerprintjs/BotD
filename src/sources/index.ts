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
    [SignalKind.AppVersion]: getAppVersion,
    [SignalKind.BrowserKind]: getBrowserKind,
    [SignalKind.DocumentAttributes]: getDocumentAttributes,
    [SignalKind.DocumentProps]: getDocumentProperties,
    [SignalKind.ErrorTrace]: getErrorTrace,
    [SignalKind.EvalLength]: getEvalLength,
    [SignalKind.FunctionBind]: getFunctionBind,
    [SignalKind.Languages]: getLanguages,
    [SignalKind.Permissions]: getPermissions,
    [SignalKind.PluginsArray]: getPluginsArray,
    [SignalKind.PluginsLength]: getPluginsLength,
    [SignalKind.Process]: getProcess,
    [SignalKind.RTT]: getRTT,
    [SignalKind.UserAgent]: getUserAgent,
    [SignalKind.UserAgentData]: getUserAgentData,
    [SignalKind.WebDriver]: getWebDriver,
    [SignalKind.WebGL]: getWebGL,
    [SignalKind.WindowClose]: getWindowClose,
    [SignalKind.WindowExternal]: getWindowExternal,
    [SignalKind.WindowProps]: getWindowProperties,
    [SignalKind.WindowSize]: getWindowSize,
  }
}
