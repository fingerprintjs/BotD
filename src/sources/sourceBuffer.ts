export default function getSourceBufferType(): string[] {
  return [typeof SourceBuffer, typeof SourceBufferList]
}
