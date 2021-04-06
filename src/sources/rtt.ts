export default function getRTT(): number {
    if (navigator.connection === undefined)
        throw new Error('navigator.connection is undefined');
    return navigator.connection.rtt
}