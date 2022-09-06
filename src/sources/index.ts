import { SignalKind } from '../signals'
import getAppVersion from './app-version'
import getBrowserKind from './browser-kind'
import getErrorTrace from './error-trace'
import getEvalLength from './eval-length'
import getLanguages from './languages'
import getPermissions from './permissions'
import getPluginsLength from './plugins-length'
import getProcess from './process'
import getRTT from './rtt'
import getSeleniumDocumentProps from './selenium'
import getUserAgent from './user-agent'
import hasUserAgentData from './user-agent-data'
import { getWebDriver } from './web-driver'
import getWebGL from './webgl'
import getWindowClose from './window-close'
import getWindowProperties from './window-properties'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function getSources() {
  return {
    [SignalKind.WebDriver]: getWebDriver,
    [SignalKind.SeleniumDocumentProps]: getSeleniumDocumentProps,
    [SignalKind.EvalLength]: getEvalLength,
    [SignalKind.HasUserAgentData]: hasUserAgentData,
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
  }
}
