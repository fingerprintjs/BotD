import { SignalKind } from '../signals'
import getBrowserKind from './browser-kind'
import getErrorTrace from './error-trace'
import getEvalLength from './eval-length'
import getLanguages from './languages'
import getNightmareWindowProps from './nightmare'
import getPermissions from './permissions'
import getPhantomWindowProps from './phantom'
import getPluginsLength from './plugins-length'
import getSeleniumDocumentProps from './selenium'
import getUserAgent from './user-agent'
import hasUserAgentData from './user-agent-data'
import { getWebDriver } from './web-driver'
import getWebGL from './webgl'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function getSources() {
  return {
    [SignalKind.WebDriver]: getWebDriver,
    [SignalKind.PhantomWindowProps]: getPhantomWindowProps,
    [SignalKind.NightmareWindowProps]: getNightmareWindowProps,
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
  }
}
