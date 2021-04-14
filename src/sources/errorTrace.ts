export default function getErrorTrace(): string {
  try {
    // @ts-ignore
    null[0]()
  } catch (error) {
    return error.stack.toString()
  }
  throw new Error('wrong error trace behaviour')
}
