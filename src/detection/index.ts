import { detectAppVersion } from './app-version'
import { detectErrorTrace } from './error-trace'
import { detectEvalLengthInconsistency } from './eval-length'
import { detectLanguagesLengthInconsistency } from './languages-inconsistency'
import { detectPermissions } from './permissions'
import { detectPluginsLengthInconsistency } from './plugins-inconsistency'
import { detectProcess } from './process'
import { detectRTT } from './rtt'
import { detectSelenium } from './selenium'
import { detectUserAgent } from './user-agent'
import { detectWebDriver } from './web-driver'
import { detectWebGL } from './webgl'
import { detectWindowProperties } from './window-properties'

export default function getDetectors() {
  return [
    detectUserAgent,
    detectPluginsLengthInconsistency,
    detectLanguagesLengthInconsistency,
    detectWebDriver,
    detectSelenium,
    detectEvalLengthInconsistency,
    detectWebGL,
    detectPermissions,
    detectErrorTrace,
    detectAppVersion,
    detectRTT,
    detectWindowProperties,
    detectProcess,
  ]
}
