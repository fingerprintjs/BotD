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
import { detectWindowExternal } from './window-external'
import { detectWindowProperties } from './window-properties'
import { detectWindowSize } from './window-size'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function getDetectors() {
  return {
    detectAppVersion,
    detectDocumentAttributes,
    detectDocumentProperties,
    detectErrorTrace,
    detectEvalLengthInconsistency,
    detectFunctionBind,
    detectLanguagesLengthInconsistency,
    detectPermissions,
    detectPluginsArray,
    detectPluginsLengthInconsistency,
    detectProcess,
    detectRTT,
    detectUserAgent,
    detectWebDriver,
    detectWebGL,
    detectWindowExternal,
    detectWindowProperties,
    detectWindowSize,
  }
}
