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
  readonly deviceMemory?: number
  readonly oscpu?: string
}

interface Window {
  readonly chrome?: unknown
  readonly InstallTrigger?: unknown
  readonly SharedArrayBuffer?: function
  readonly callPhantom?: function
  readonly _phantom?: function
  readonly phantom?: function
  readonly __nightmare?: unknown
  readonly process?: NodeJS.Process & { type?: string }
}

interface Element {
  webkitRequestFullscreen?: unknown
}
