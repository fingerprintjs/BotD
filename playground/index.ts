import { load } from '../src'
import BotDetector from '../src/detector'
import './style.css'

const runDetection = async () => {
  const statusEl = document.getElementById('status')
  const resultTableEl = document.getElementById('result-table')
  const errorSectionEl = document.getElementById('error_section')
  const resultsSectionEl = document.getElementById('result_section')
  const errorEl = document.getElementById('error')
  const perfEl = document.getElementById('perf')
  const timeEl = document.getElementById('time')
  const sourcesEl = document.getElementById('sources')
  const resultEl = document.getElementById('result')

  statusEl!.textContent = 'Loading...'
  resultTableEl!.innerHTML = ''
  errorSectionEl!.style.display = 'none'
  resultsSectionEl!.style.display = 'none'

  try {
    const t0 = performance.now()

    const instance = await load()
    const collectTime = performance.now() - t0

    const result = instance.detect()
    const processTime = performance.now() - t0

    errorSectionEl!.style.display = 'none'
    resultsSectionEl!.style.display = 'block'

    perfEl!.textContent = collectTime.toFixed(0) + ' ms'
    timeEl!.textContent = processTime.toFixed(0) + ' ms'

    const components = instance.getComponents()
    sourcesEl!.textContent = JSON.stringify(components, null, 4)

    statusEl!.textContent = 'Result:'
    resultEl!.textContent = JSON.stringify(result, null, 4)

    const resultTableEntries = [
      [
        { text: 'automationTool' },
        result.bot ? { text: '<b>Detected</b>', class: 'green' } : { text: '<b>Not detected</b>' },
        result.bot ? { text: `<b>${result.botKind}</b>`, class: 'green' } : null,
      ],
    ]

    resultTableEl!.innerHTML = resultTableEntries
      .map(
        (row) =>
          `<tr>${row
            .filter((column) => column != null)
            .map(
              (column) =>
                `<td style="width: 25%" ${column?.class != null ? `class=${column.class}` : ''}>${column?.text}</td>`,
            )
            .join('')}</tr>`,
      )
      .join('')
  } catch (e) {
    resultsSectionEl!.style.display = 'none'
    errorSectionEl!.style.display = 'block'
    statusEl!.textContent = 'Error!'
    errorEl!.textContent = JSON.stringify(e, null, 4)
  }
}

window.onload = async () => {
  document.getElementById('detect-button')!.addEventListener('click', () => runDetection())

  runDetection()
}
