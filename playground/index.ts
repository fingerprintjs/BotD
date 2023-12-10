import { load } from '../src'
import {
  getBrowserEngineKind,
  getBrowserKind,
  getDocumentFocus,
  getMozAppearanceSupport,
  isAndroid,
  isDesktopWebKit,
  isIPad,
} from '../src/utils/browser'
import { getBrowserVersion } from '../tests/utils'
import './style.css'

type DetectionResult =
  | {
      isError: false
      collectionTime: number
      detectionTime: number
      detectedBot?: string
      detectionResult: Record<string, any>
      collectedData: Record<string, any>
      detectorsResults: Record<string, any>
      debugData: Record<string, any>
    }
  | {
      isError: true
      error: any
    }

let _result: DetectionResult | undefined = undefined

const runDetection = async (): Promise<DetectionResult> => {
  try {
    const t0 = performance.now()
    const instance = await load()
    const collectionTime = performance.now() - t0
    const detectionResult = instance.detect()
    const detectionTime = performance.now() - t0
    const components = instance.getComponents() ?? {}
    const detections = instance.getDetections() ?? {}

    const debugData = {
      browserEngineKind: getBrowserEngineKind(),
      browserKind: getBrowserKind(),
      browserVersion: getBrowserVersion(),
      documentFocus: getDocumentFocus(),
      mozAppearanceSupport: getMozAppearanceSupport(),
      isAndroid: isAndroid(),
      isDesktopWebKit: isDesktopWebKit(),
      isIPad: isIPad(),
    }

    return {
      isError: false,
      collectionTime,
      detectionTime,
      detectionResult,
      detectedBot: detectionResult?.bot ? detectionResult.botKind : undefined,
      collectedData: components,
      detectorsResults: detections,
      debugData,
    }
  } catch (e) {
    return { isError: true, error: e }
  }
}

const renderDetectionResult = (result: DetectionResult) => {
  const resultEl = document.getElementById('result')!
  const resultTextEl = document.getElementById('result-text')!
  const collectionTimeEl = document.getElementById('collection-time')!
  const detectionTimeEl = document.getElementById('detection-time')!
  const detectionResultEl = document.getElementById('detection-result')!
  const detectorsEl = document.getElementById('detectors')!
  const debugData = document.getElementById('debug-data')!
  const collectedData = document.getElementById('collected-data')!
  const errorContainerEl = document.getElementById('error-container')!
  const errorMessageEl = document.getElementById('error-message')!

  resultEl.classList.remove('result-detected', 'result-error')

  if (result.isError) {
    resultTextEl.innerHTML = 'An error occured'
    resultEl.classList.add('result-error')
    errorContainerEl.classList.add('error-container-visible')
    errorMessageEl.textContent = result.error.message
    return
  }

  errorContainerEl.classList.remove('error-container-visible')

  if (result.detectedBot != null) {
    resultTextEl.innerHTML = `${result.detectedBot} detected.`
    resultEl.classList.add('result-detected')
  } else {
    resultTextEl.innerHTML = 'You are not a bot.'
  }

  collectionTimeEl.textContent = `${result.collectionTime.toFixed(2)}ms`
  detectionTimeEl.textContent = `${result.detectionTime.toFixed(2)}ms`
  detectionResultEl.textContent = JSON.stringify(result.detectionResult, null, 4)
  detectorsEl.textContent = JSON.stringify(result.detectorsResults, null, 4)
  debugData.textContent = JSON.stringify(result.debugData, null, 4)
  collectedData.textContent = JSON.stringify(result.collectedData, null, 4)
}

const runAndRender = async () => {
  const result = await runDetection()
  _result = result
  renderDetectionResult(result)
}

window.onload = () => {
  const detectButtonEl = document.getElementById('detect-button')!
  const copyLogsButton = document.getElementById('copy-logs-button')!

  detectButtonEl.addEventListener('click', () => {
    runAndRender()
  })

  copyLogsButton.addEventListener('click', () => {
    navigator.clipboard.writeText(JSON.stringify(_result)).then(() => {
      alert('BotD logs copied to clipboard')
    })
  })

  runAndRender()
}
