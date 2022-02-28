import { getProperties, re } from './misc'

export default function getDocumentProperties(): string[] {
  const raw = getProperties(window.document)
  return raw.filter((el) => el.match(re) != null)
}
