import { BotdError, Component, ComponentDict, Source, SourceDict, State } from './types'
import getUserAgent from './sources/userAgent'
import hasUserAgentData from './sources/userAgentData'
import getAppVersion from './sources/appVersion'
import getRTT from './sources/rtt'
import getWindowOuterSize from './sources/windowOuterSize'
import arePermissionsInconsistent from './sources/permissions'
import getWebGL from './sources/webgl'
import getScreen from './sources/screen'
import getDeviceMemory from './sources/deviceMemory'
import isBigEndian from './sources/endian'
import getHardwareConcurrency from './sources/hardwareConcurrency'
import getEvalLength from './sources/evalLength'
import getPluginsLength from './sources/pluginsLength'
import arePluginsConsistent from './sources/pluginsConsistence'
import getErrorTrace from './sources/errorTrace'
import getErrorFF from './sources/errorFF'
import getOSCPU from './sources/oscpu'
import getPlatform from './sources/platform'
import getProductSub from './sources/productSub'
import getVendor from './sources/vendor'
import getWebDriver from './sources/webDriver'
import getInstallTrigger from './sources/installTrigger'
import getFrequency from './sources/frequency'
import getWindowProperties from './sources/windowProperties'
import getDocumentProperties from './sources/documentProperties'
import getNavigatorProperties from './sources/navigatorProperties'
import getTouchPoints from './sources/touch'
import getSourceBufferType from './sources/sourceBuffer'
import getDocumentElementKeys from './sources/documentElementKeys'
import getWindowClose from './sources/windowClose'
import getWindowExternal from './sources/windowExternal'
import getLanguages from './sources/languages'
import getMimeTypesLength from './sources/mimeTypesLength'
import areMimeTypesConsistent from './sources/mimeTypesConsistence'
import requiredAccelerometerPermission from './sources/accelerometerPermission'
import getTimestamp from './sources/timestamp'
import getBackdropFilter from './sources/backdropFilter'
import getASTCProfiles from './sources/astcProfiles'

export const enum SignalName {
  UserAgent = 's1',
  UserAgentData = 's2',
  AppVersion = 's3',
  RTT = 's4',
  WindowOuterSize = 's5',
  NotificationPermissions = 's6',
  WebGL = 's7',
  Screen = 's8',
  DeviceMemory = 's9',
  Endian = 's10',
  HardwareConcurrency = 's11',
  InstallTrigger = 's12',
  WebDriver = 's13',
  EvalLength = 's14',
  PluginsLength = 's15',
  PluginsConsistence = 's16',
  ErrorTrace = 's17',
  ErrorFF = 's18',
  OSCPU = 's19',
  Platform = 's20',
  ProductSub = 's21',
  Vendor = 's22',
  Frequency = 's23',
  WindowProperties = 's24',
  DocumentProperties = 's25',
  NavigatorProperties = 's26',
  Touch = 's27',
  SourceBuffer = 's28',
  DocumentElementKeys = 's29',
  WindowClose = 's30',
  WindowExternal = 's31',
  Languages = 's32',
  MimeTypesLength = 's33',
  MimeTypesConsistence = 's34',
  AccelerometerPermission = 's35',
  ClientTimestamp = 's36',
  BackdropFilter = 's37',
  ASTCProfiles = 's38',
}

async function handleSource(sourceFunction: Source): Promise<Component> {
  try {
    return { state: State.Success, value: await sourceFunction() }
  } catch (e) {
    if (e instanceof BotdError) {
      return { state: e.state, value: e.toString() }
    } else {
      return { state: State.Unexpected, value: e.toString() }
    }
  }
}

async function handleAll(sources: SourceDict): Promise<ComponentDict> {
  const components: ComponentDict = {}
  for (const name in sources) {
    if (Object.prototype.hasOwnProperty.call(sources, name)) {
      const sourceFunction = sources[name]
      components[name] = await handleSource(sourceFunction)
    }
  }
  return components
}

/**
 * Collects all the components from the browser.
 *
 * @returns {Promise<ComponentDict>} A promise to the collected components.
 */
export default async function collect(): Promise<ComponentDict> {
  return handleAll({
    [SignalName.UserAgent]: getUserAgent,
    [SignalName.UserAgentData]: hasUserAgentData,
    [SignalName.AppVersion]: getAppVersion,
    [SignalName.RTT]: getRTT,
    [SignalName.WindowOuterSize]: getWindowOuterSize,
    [SignalName.NotificationPermissions]: arePermissionsInconsistent,
    [SignalName.WebGL]: getWebGL,
    [SignalName.Screen]: getScreen,
    [SignalName.DeviceMemory]: getDeviceMemory,
    [SignalName.Endian]: isBigEndian,
    [SignalName.HardwareConcurrency]: getHardwareConcurrency,
    [SignalName.InstallTrigger]: getInstallTrigger,
    [SignalName.WebDriver]: getWebDriver,
    [SignalName.EvalLength]: getEvalLength,
    [SignalName.PluginsLength]: getPluginsLength,
    [SignalName.PluginsConsistence]: arePluginsConsistent,
    [SignalName.ErrorTrace]: getErrorTrace,
    [SignalName.ErrorFF]: getErrorFF,
    [SignalName.OSCPU]: getOSCPU,
    [SignalName.Platform]: getPlatform,
    [SignalName.ProductSub]: getProductSub,
    [SignalName.Vendor]: getVendor,
    [SignalName.Frequency]: getFrequency,
    [SignalName.WindowProperties]: getWindowProperties,
    [SignalName.DocumentProperties]: getDocumentProperties,
    [SignalName.NavigatorProperties]: getNavigatorProperties,
    [SignalName.Touch]: getTouchPoints,
    [SignalName.SourceBuffer]: getSourceBufferType,
    [SignalName.DocumentElementKeys]: getDocumentElementKeys,
    [SignalName.WindowClose]: getWindowClose,
    [SignalName.WindowExternal]: getWindowExternal,
    [SignalName.Languages]: getLanguages,
    [SignalName.MimeTypesLength]: getMimeTypesLength,
    [SignalName.MimeTypesConsistence]: areMimeTypesConsistent,
    [SignalName.AccelerometerPermission]: requiredAccelerometerPermission,
    [SignalName.ClientTimestamp]: getTimestamp,
    [SignalName.BackdropFilter]: getBackdropFilter,
    [SignalName.ASTCProfiles]: getASTCProfiles,
  })
}
