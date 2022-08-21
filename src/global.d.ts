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
}

interface Document {
  readonly __selenium_unwrapped?: unknown
  readonly __webdriver_evaluate?: unknown
  readonly __driver_evaluate?: unknown
}
