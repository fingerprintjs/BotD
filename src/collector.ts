import { BotdError, Component, ComponentDict, Source, State } from './types'
import getUserAgent from './sources/userAgent'
import hasUserAgentData from './sources/userAgentData'
import getAppVersion from './sources/appVersion'
import getRTT from './sources/rtt'
import getWindowOuterSize from './sources/windowOuterSize'
import arePermissionsInconsistent from './sources/notificationPermissions'
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
import getHairlines from './sources/hairlines'
import isHiDPI from './sources/dpi'
import isDarkTheme from './sources/darkTheme'
import getSABByteLength from './sources/sab'

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

async function handleAll(sources: Source[]): Promise<ComponentDict> {
  const components: ComponentDict = {}
  for (const value of sources) {
    const index = sources.indexOf(value)
    const name = `s${index + 1}`
    components[name] = await handleSource(value)
  }
  return components
}

/**
 * Collects all the components from the browser.
 *
 * @returns {Promise<ComponentDict>} A promise to the collected components.
 */
export default async function collect(): Promise<ComponentDict> {
  return handleAll([
    getUserAgent, // s1
    hasUserAgentData, // s2
    getAppVersion, // s3
    getRTT, // s4
    getWindowOuterSize, // s5
    arePermissionsInconsistent, // s6
    getWebGL, // s7
    getScreen, // s8
    getDeviceMemory, // s9
    isBigEndian, // s10
    getHardwareConcurrency, // s11
    getInstallTrigger, // s12
    getWebDriver, // s13
    getEvalLength, // s14
    getPluginsLength, // s15
    arePluginsConsistent, // s16
    getErrorTrace, // s17
    getErrorFF, // s18
    getOSCPU, // s19
    getPlatform, // s20
    getProductSub, // s21
    getVendor, // s22
    getFrequency, // s23
    getWindowProperties, // s24
    getDocumentProperties, // s25
    getNavigatorProperties, // s26
    getTouchPoints, // s27
    getSourceBufferType, // s28
    getDocumentElementKeys, // s29
    getWindowClose, // s30
    getWindowExternal, // s31
    getLanguages, // s32
    getMimeTypesLength, // s33
    areMimeTypesConsistent, // s34
    requiredAccelerometerPermission, // s35
    getTimestamp, // s36
    getBackdropFilter, // s37
    getASTCProfiles, // s38
    getHairlines, // s39
    isHiDPI, // s40
    isDarkTheme, // s41
    getSABByteLength, // s42
  ])
}
