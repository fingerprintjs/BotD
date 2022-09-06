import { detectAppVersion } from './app-version'
import { detectDocumentAttributes } from './document-attributes'
import { detectDocumentProperties } from './document-properties'
import { detectErrorTrace } from './error-trace'
import { detectEvalLengthInconsistency } from './eval-length'
import { detectFunctionBind } from './function-bind'
import { detectLanguagesLengthInconsistency } from './languages-inconsistency'
import { detectPermissions } from './permissions'
import { detectPluginsArray } from './plugins-array'
import { detectPluginsLengthInconsistency } from './plugins-inconsistency'
import { detectProcess } from './process'
import { detectRTT } from './rtt'
import { detectUserAgent } from './user-agent'
import { detectWebDriver } from './web-driver'
import { detectWebGL } from './webgl'
import { detectWindowClose } from './window-close'
import { detectWindowProperties } from './window-properties'
import { detectWindowSize } from './window-size'

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
    detectWindowClose,
    detectProcess,
    detectDocumentProperties,
    detectPluginsArray,
    detectFunctionBind,
    detectWindowSize,
    detectDocumentAttributes,
  ]
}
