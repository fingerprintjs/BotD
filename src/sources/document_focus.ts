import { getDocumentFocus } from '../utils/browser'

export default function hasDocumentFocus(): boolean {
  return getDocumentFocus()
}
