export default function getElectronProcessProps(): boolean[] {
  return [window.process?.type === 'renderer', !!window.process?.versions?.electron]
}
