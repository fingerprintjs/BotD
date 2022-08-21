export default function getLanguages(): string[] {
  return Object.assign([], navigator.languages)
}
