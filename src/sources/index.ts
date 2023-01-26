import getAppVersion from './app_version'
import getDocumentElementKeys from './document_element_keys'
import getDocumentProperties from './document_properties'
import getErrorTrace from './error_trace'
import getEvalLength from './eval_length'
import getFunctionBind from './function_bind'
import getLanguages from './languages'
import areMimeTypesConsistent from './mime_types_consistence'
import getNotificationPermissions from './notification_permissions'
import getPluginsArray from './plugins_array'
import getPluginsLength from './plugins_length'
import getProcess, { ProcessPayload } from './process'
import getProductSub from './product_sub'
import getRTT from './rtt'
import getUserAgent from './user_agent'
import getWebDriver from './webdriver'
import getWebGL from './webgl'
import getWindowExternal from './window_external'
import getWindowProperties from './window_properties'
import getWindowSize, { WindowSizePayload } from './window_size'
import getPlatform from './platform'
import getPluginNamesArray from './plugin_names_array'
import getDeviceMemory from './device_memory'
import getScreenDimensions from './screen_dimensions'

export const sources = {
  userAgent: getUserAgent,
  appVersion: getAppVersion,
  rtt: getRTT,
  windowSize: getWindowSize,
  pluginsLength: getPluginsLength,
  pluginsArray: getPluginsArray,
  errorTrace: getErrorTrace,
  productSub: getProductSub,
  windowExternal: getWindowExternal,
  mimeTypesConsistent: areMimeTypesConsistent,
  evalLength: getEvalLength,
  webGL: getWebGL,
  webDriver: getWebDriver,
  languages: getLanguages,
  notificationPermissions: getNotificationPermissions,
  documentElementKeys: getDocumentElementKeys,
  functionBind: getFunctionBind,
  process: getProcess,
  documentProps: getDocumentProperties,
  windowProps: getWindowProperties,
  platform: getPlatform,
  pluginsNameArray: getPluginNamesArray,
  deviceMemory: getDeviceMemory,
  screenDimensions: getScreenDimensions,
}

export { WindowSizePayload, ProcessPayload }
