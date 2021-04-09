export default function getFrequency(): number {
    function now() {
        return performance.now() / 1000
    }
    function gcd(a: number, b: number): number {
        if (a < 0.00000001)
            return b;
        if (a < b)
            return gcd(b - Math.floor(b / a) * a, a);
        else if (a === b)
            return a;
        else
            return gcd(b, a);
    }

    let x = now()
    let g = now() - x;
    for (let i = 0; i < 10; i++)
        g = gcd(g, now() - x);
    return Math.round(1 / g)
}