export default function getWebGL(): string[] {
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
    throw new Error('can`t get webgl data');
}