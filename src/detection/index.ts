import { detectElectronProcessProps } from './electron'
import { detectErrorTrace } from './error-trace'
import { detectEvalLengthInconsistency } from './eval-length'
import { detectLanguagesLengthInconsistency } from './languages-inconsistency'
import { detectNightmare } from './nightmare'
import { detectPermissions } from './permissions'
import { detectPhantom } from './phantom'
import { detectPluginsLengthInconsistency } from './plugins-inconsistency'
import { detectSelenium } from './selenium'
import { detectUserAgent } from './user-agent'
import { detectWebDriver } from './web-driver'
import { detectWebGL } from './webgl'

export default function getDetectors() {
  return [
    detectUserAgent,
    detectPluginsLengthInconsistency,
    detectLanguagesLengthInconsistency,
    detectPhantom,
    detectWebDriver,
    detectNightmare,
    detectSelenium,
    detectEvalLengthInconsistency,
    detectWebGL,
    detectPermissions,
    detectErrorTrace,
    detectElectronProcessProps,
  ]
}
