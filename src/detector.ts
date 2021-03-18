export default class BotDetector {
    url: string;

    constructor(url: string) {
        this.url = url;
    }

    private static async notificationPermissions() {
        if(navigator.permissions !== undefined) {
            let notificationsStatus = await navigator.permissions.query({name: "notifications"})
            return Notification.permission === "denied" && notificationsStatus.state === 'prompt'
        } else
            return undefined
    }

    private static getWebGLInfo(): string[] | undefined[] {
        let canvasElement = document.createElement('canvas');
        let webGLContext = canvasElement.getContext('webgl');
        if(webGLContext !== null) {
            let webGLDebugInfo = webGLContext.getExtension('WEBGL_debug_renderer_info');
            if(webGLDebugInfo !== null) {
                let vendor = webGLContext.getParameter(webGLDebugInfo.UNMASKED_VENDOR_WEBGL);
                let renderer = webGLContext.getParameter(webGLDebugInfo.UNMASKED_RENDERER_WEBGL);
                return [vendor, renderer]
            }
        }
        return [undefined, undefined]
    }

    private static isBigEndian() {
        let buf = new ArrayBuffer(4)
        new Uint32Array(buf)[0] = 0xaa000000;
        return new Uint8Array(buf)[0] === 0xaa;
    }

    private static getRTT(): number | undefined {
        if(navigator.connection === undefined)
            return undefined
        return navigator.connection.rtt
    }

    private static async collect() {
        return {
            "user_agent": navigator.userAgent,
            "is_user_agent_data_undefined": navigator.userAgentData === undefined,
            "app_version": navigator.appVersion,
            "web_driver": navigator.webdriver,
            "rtt": BotDetector.getRTT(),
            "window_outer_size": [window.outerWidth, window.outerHeight],
            "notification_permissions": await BotDetector.notificationPermissions(),
            "webgl": BotDetector.getWebGLInfo(),
            "screen": [screen.width, screen.height],
            "device_memory": navigator.deviceMemory,
            "is_big_endian": BotDetector.isBigEndian(),
            "cores": navigator.hardwareConcurrency
        }
    }

    async detect() {
        return await fetch(this.url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(await BotDetector.collect())
        }).then(resp => resp.json())
    }
}
