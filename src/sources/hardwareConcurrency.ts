export default function getHardwareConcurrency(): number {
    try {
        const concurrency = navigator.hardwareConcurrency
        if(typeof concurrency === "string") {
            let concurrencyInt = parseInt(concurrency)
            return isNaN(concurrencyInt) ? 1 : concurrencyInt
        }
        return concurrency
    } catch (e) {
        throw new Error('navigator.hardwareConcurrency wrong type');
    }
}