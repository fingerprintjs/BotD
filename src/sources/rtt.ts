export default function getRTT(): number | undefined {
    return navigator.connection?.rtt
}