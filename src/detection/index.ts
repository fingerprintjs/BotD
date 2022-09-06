import { detectAppVersion } from './app-version'
import { detectDocumentProperties } from './document-properties'
import { detectErrorTrace } from './error-trace'
import { detectEvalLengthInconsistency } from './eval-length'
import { detectLanguagesLengthInconsistency } from './languages-inconsistency'
import { detectPermissions } from './permissions'
import { detectPluginsLengthInconsistency } from './plugins-inconsistency'
import { detectProcess } from './process'
import { detectRTT } from './rtt'
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
    detectEvalLengthInconsistency,
    detectWebGL,
    detectPermissions,
    detectErrorTrace,
    detectAppVersion,
    detectRTT,
    detectWindowProperties,
    detectProcess,
    detectDocumentProperties,
  ]
}
