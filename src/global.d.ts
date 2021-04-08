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
    readonly chrome?: object
    readonly InstallTrigger?: object
}