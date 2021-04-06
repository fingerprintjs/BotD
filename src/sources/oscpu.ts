export default function getOSCPU(): string {
    if (navigator.oscpu == undefined)
        throw new Error('navigator.oscpu is undefined');
    return navigator.oscpu
}