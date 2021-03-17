export default class BotDetector {
    url: string;

    constructor(url: string) {
        this.url = url;
    }

    // TODO: Fix it
    // private notificationPermissions(): boolean | undefined {
    //     if(navigator.permissions !== undefined) {
    //         let notificationState
    //         navigator.permissions.query({name: "notifications"}).then(
    //             notificationsStatus => notificationState = notificationsStatus.state
    //         )
    //         return Notification.permission === "denied" && notificationState === 'prompt'
    //     } else
    //         return undefined
    // }

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

    private collect() {
        return {
            "user_agent": navigator.userAgent,
            "is_user_agent_data_undefined": navigator.userAgentData === undefined,
            "app_version": navigator.appVersion,
            "web_driver": navigator.webdriver,
            "rtt": BotDetector.getRTT(),
            "window_outer_size": [window.outerWidth, window.outerHeight],
            // "notification_permissions": this.notificationPermissions(),
            "notification_permissions": false,
            "webgl": BotDetector.getWebGLInfo(),
            "screen": [screen.width, screen.height],
            "device_memory": navigator.deviceMemory,
            "is_big_endian": BotDetector.isBigEndian(),
            "cores": navigator.hardwareConcurrency
        }
    }

    async detect() {
        let result = await fetch(this.url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.collect())
        }).then(resp => resp.json())
        console.log(result)
        return result
    }
}
