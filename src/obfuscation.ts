import { BotdError, State } from './types'
import { gzipSync } from 'fflate'

const enum Type {
  CompressedXorWithIndex = 2,
}

export interface ObfuscationInterface {
  type: Type
  paddingSize: number
  padding?: ArrayBuffer

  obfuscate(payload: unknown): ArrayBuffer
  deobfuscate<T = unknown>(encoded: BufferSource): T
}

function getUTF8Bytes(text: string): Uint8Array {
  // Benchmark: https://jsbench.me/b6klaaxgwq/1
  // If you want to just count bytes, see solutions at https://jsbench.me/ehklab415e/1
  if (typeof TextEncoder === 'function') {
    return new TextEncoder().encode(text) // From https://stackoverflow.com/a/11411402/1118709
  }

  // From https://stackoverflow.com/a/18722848/1118709
  const binaryText = unescape(encodeURI(text))
  const bytes = new Uint8Array(binaryText.length)

  for (let i = 0; i < binaryText.length; ++i) {
    bytes[i] = binaryText.charCodeAt(i)
  }

  return bytes
}

function parseUTF8Bytes(data: BufferSource): string {
  if (typeof TextDecoder === 'function') {
    const decoded = new TextDecoder().decode(data) // From https://stackoverflow.com/a/11411402/1118709
    if (decoded) {
      return decoded // The decoder always returns empty string in old Blink (e.g. Android 5.1 Browser)
    }
  }

  // From https://stackoverflow.com/a/18722848/111870
  const bytes = (bufferSourceToBytes(data) as unknown) as number[]
  return decodeURIComponent(escape(String.fromCharCode.apply(null, bytes)))
}

function bufferSourceToBytes(source: BufferSource): Uint8Array {
  if (source instanceof ArrayBuffer) {
    return new Uint8Array(source)
  }
  return new Uint8Array(source.buffer, source.byteOffset, source.byteLength)
}

export class CompressedXorWithIndexObfuscation implements ObfuscationInterface {
  type: Type
  paddingSize: number

  constructor() {
    this.type = Type.CompressedXorWithIndex
    this.paddingSize = 0
  }

  obfuscate(payload: unknown): ArrayBuffer {
    const payloadBytes = getUTF8Bytes(JSON.stringify(payload))
    const compressed = gzipSync(payloadBytes)
    const resultSize = 2 + compressed.length // Type + padding size + padding + payload
    const result = new ArrayBuffer(resultSize)
    const resultBytes = new Uint8Array(result)
    let resultOffset = 0

    resultBytes[resultOffset++] = this.type
    resultBytes[resultOffset++] = this.paddingSize
    // No padding

    for (let i = 0; i < compressed.length; ++i) {
      resultBytes[resultOffset++] = compressed[i] ^ i
    }

    return resultBytes
  }

  deobfuscate<T = unknown>(encoded: BufferSource): T {
    const encodedBytes = bufferSourceToBytes(encoded)
    const type = encodedBytes[0]
    const paddingSize = encodedBytes[1]

    if (type !== this.type || paddingSize !== this.paddingSize) {
      throw new BotdError(State.ObfuscationError, 'Wrong type or padding size')
    }

    const headerOffset = 2 // Type and padding size
    const payloadBytes = new Uint8Array(encodedBytes.length - headerOffset)
    for (let i = 0; i < payloadBytes.length; ++i) {
      payloadBytes[i] = encodedBytes[i + headerOffset] ^ i
    }

    return JSON.parse(parseUTF8Bytes(payloadBytes))
  }
}
