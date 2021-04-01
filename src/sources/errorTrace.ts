export default function getErrorTrace(): string | undefined{
    try {
        // @ts-ignore
        null[0]();
    } catch (error) {
        return error.stack.toString()
    }
}