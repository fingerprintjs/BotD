import { load } from '../src'
import {
  getBrowserEngineKind,
  getBrowserKind,
  getDocumentFocus,
  getMozAppearanceSupport,
  isAndroid,
  isDesktopSafari,
} from '../src/utils/browser'
import './style.css'

interface Result {
  timeToGetResults: string
  timeToCollectSignals: string
  detectionResult: Record<string, any>
  detailedResults: Record<string, any>
  collectedData: Record<string, any>
}

let result: Result | undefined = undefined

const runDetection = async () => {
  const statusEl = document.getElementById('status')
  const resultsListEl = document.getElementById('results-list')
  const errorSectionEl = document.getElementById('error_section')
  const resultsSectionEl = document.getElementById('result_section')
  const errorEl = document.getElementById('error')
  const perfEl = document.getElementById('perf')
  const timeEl = document.getElementById('time')
  const sourcesEl = document.getElementById('sources')
  const resultEl = document.getElementById('result')
  const detailedResultsEl = document.getElementById('detailed-results')
  const debugDataEl = document.getElementById('debug-data')

  statusEl!.textContent = 'Loading...'
  resultsListEl!.innerHTML = ''
  errorSectionEl!.style.display = 'none'
  resultsSectionEl!.style.display = 'none'

  try {
    const t0 = performance.now()

    const instance = await load()
    const collectTime = performance.now() - t0

    const detectionResult = instance.detect()
    const processTime = performance.now() - t0

    const components = instance.getComponents() ?? {}
    const detections = instance.getDetections() ?? {}

    result = {
      timeToGetResults: collectTime.toFixed(0) + ' ms',
      timeToCollectSignals: processTime.toFixed(0) + ' ms',
      detectionResult,
      collectedData: components,
      detailedResults: detections,
    }

    sourcesEl!.textContent = JSON.stringify(result.collectedData, null, 4)
    errorSectionEl!.style.display = 'none'
    resultsSectionEl!.style.display = 'block'

    perfEl!.textContent = result.timeToGetResults
    timeEl!.textContent = result.timeToCollectSignals

    statusEl!.textContent = 'Result:'
    resultEl!.textContent = JSON.stringify(result.detectionResult, null, 4)

    detailedResultsEl!.textContent = 'Detailed results:'
    detailedResultsEl!.textContent = JSON.stringify(result.detailedResults, null, 4)

    const debugData = {
      browserEngineKind: getBrowserEngineKind(),
      browserKind: getBrowserKind(),
      documentFocus: getDocumentFocus(),
      mozAppearanceSupport: getMozAppearanceSupport(),
      isAndroid: isAndroid(),
      isDesktopSafari: isDesktopSafari(),
    }

    debugDataEl!.textContent = 'Debug data:'
    debugDataEl!.textContent = JSON.stringify(debugData, null, 4)

    resultsListEl!.innerHTML = `<span>Automation tool: ${
      detectionResult.bot
        ? `<span class="green"><b>Detected (${detectionResult.botKind})</b></span>`
        : '<span><b>Not detected</b></span>'
    }</span>`
  } catch (e) {
    resultsSectionEl!.style.display = 'none'
    errorSectionEl!.style.display = 'block'
    statusEl!.textContent = 'Error!'
    errorEl!.textContent = JSON.stringify(e, null, 4)
  }
}

window.onload = async () => {
  document.getElementById('detect-button')!.addEventListener('click', () => runDetection())

  document.getElementById('copy-logs-button')!.addEventListener('click', () => {
    navigator.clipboard.writeText(JSON.stringify(result)).then(() => {
      alert('Copied to clipboard')
    })
  })

  runDetection()
}
