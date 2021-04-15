import handleAll, { SourceResultDict } from './types'
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
import hasChrome from './sources/chrome'
import getEvalLength from './sources/evalLength'
import getPluginsLength from './sources/pluginsLength'
import arePluginsConsistent from './sources/pluginsConsistence'
import getErrorTrace from './sources/errorTrace'
import getErrorFF from './sources/errorFF'
import getOSCPU from './sources/oscpu'
import getPlatform from './sources/platform'
import getProductSub from './sources/productSub'
import getVendor from './sources/vendor'
import isFramework from './sources/frameworks'
import getWebDriver from './sources/webDriver'
import getInstallTrigger from './sources/installTrigger'
import getFrequency from './sources/frequency'
import getWindowProperties from './sources/window'
import getDocumentProperties from './sources/document'
import getNavigatorProperties from './sources/navigator'

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
  Chrome = 's12',
  InstallTrigger = 's13',
  Framework = 's14',
  WebDriver = 's15',
  EvalLength = 's16',
  PluginsLength = 's17',
  PluginsConsistent = 's18',
  ErrorTrace = 's19',
  ErrorFF = 's20',
  OSCPU = 's21',
  Platform = 's22',
  ProductSub = 's23',
  Vendor = 's24',
  Frequency = 's25',
  WindowProperties = 's26',
  DocumentProperties = 's27',
  NavigatorProperties = 's28',
  Tag = 's29',
}

export default async function collect(): Promise<SourceResultDict> {
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
    [SignalName.Chrome]: hasChrome,
    [SignalName.InstallTrigger]: getInstallTrigger,
    [SignalName.Framework]: isFramework,
    [SignalName.WebDriver]: getWebDriver,
    [SignalName.EvalLength]: getEvalLength,
    [SignalName.PluginsLength]: getPluginsLength,
    [SignalName.PluginsConsistent]: arePluginsConsistent,
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
  })
}
