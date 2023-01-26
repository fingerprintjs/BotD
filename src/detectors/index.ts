import { detectAppVersion } from './app_version'
import { detectDocumentAttributes } from './document_element_keys'
import { detectDocumentProperties } from './document_properties'
import { detectErrorTrace } from './error_trace'
import { detectEvalLengthInconsistency } from './eval_length'
import { detectFunctionBind } from './function_bind'
import { detectLanguagesLengthInconsistency } from './languages_inconsistency'
import { detectMimeTypesConsistent } from './mime_types_consistence'
import { detectNotificationPermissions } from './notification_permissions'
import { detectPluginsArray } from './plugins_array'
import { detectPluginsLengthInconsistency } from './plugins_inconsistency'
import { detectProcess } from './process'
import { detectProductSub } from './product_sub'
import { detectUserAgent } from './user_agent'
import { detectWebDriver } from './webdriver'
import { detectWebGL } from './webgl'
import { detectWindowExternal } from './window_external'
import { detectWindowProperties } from './window_properties'
import { detectWindowSize } from './window_size'
import { detectPlatform } from './platform'
import { detectPluginInconsistencyFirefox } from './plugins_inconsistency_ff'
import { detectVmFromMemoryScreenDimensions } from './memory_screen_dimensions'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const detectors = {
  detectAppVersion,
  detectDocumentAttributes,
  detectDocumentProperties,
  detectErrorTrace,
  detectEvalLengthInconsistency,
  detectFunctionBind,
  detectLanguagesLengthInconsistency,
  detectNotificationPermissions,
  detectPluginsArray,
  detectPluginsLengthInconsistency,
  detectProcess,
  detectUserAgent,
  detectWebDriver,
  detectWebGL,
  detectWindowExternal,
  detectWindowProperties,
  detectWindowSize,
  detectMimeTypesConsistent,
  detectProductSub,
  detectPlatform,
  detectPluginInconsistencyFirefox,
  detectVmFromMemoryScreenDimensions,
}
