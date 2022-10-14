interface NetworkInformation extends EventTarget {
  readonly rtt: number
}

interface NavigatorUAData {
  readonly brands?: Array<Record<string, string>>
  readonly mobile: boolean
}

interface Navigator {
  readonly connection?: NetworkInformation
  readonly userAgentData?: NavigatorUAData
}

interface Window {
  readonly chrome?: unknown
  readonly InstallTrigger?: unknown
  readonly SharedArrayBuffer?: unknown
  readonly callPhantom?: unknown
  readonly _phantom?: unknown
  readonly phantom?: unknown
  readonly __nightmare?: unknown
  readonly process?: {
    type?: string
    versions?: {
      electron?: string
    }
  }
  readonly __fpjs_d_m?: unknown
}

interface Element {
  webkitRequestFullscreen?: unknown
}
