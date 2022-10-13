import { detectAppVersion } from './app_version'
import { detectDocumentAttributes } from './document_attributes'
import { detectDocumentProperties } from './document_properties'
import { detectErrorTrace } from './error_trace'
import { detectEvalLengthInconsistency } from './eval_length'
import { detectFunctionBind } from './function_bind'
import { detectLanguagesLengthInconsistency } from './languages_inconsistency'
import detectMimeTypesConsistent from './mime_types_consistence'
import { detectNotificationPermissions } from './notification_permissions'
import { detectPluginsArray } from './plugins_array'
import { detectPluginsLengthInconsistency } from './plugins_inconsistency'
import { detectProcess } from './process'
import detectProductSub from './product_sub'
import { detectRTT } from './rtt'
import { detectUserAgent } from './user_agent'
import { detectWebDriver } from './webdriver'
import { detectWebGL } from './webgl'
import { detectWindowExternal } from './window_external'
import { detectWindowProperties } from './window_properties'
import { detectWindowSize } from './window_size'

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
    detectPermissions: detectNotificationPermissions,
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
    detectMimeTypesConsistent,
    detectProductSub,
  }
}
