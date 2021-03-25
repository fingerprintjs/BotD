import collect from "./collector.js";
import {TSourceResultDict} from "./types.js";

export default class BotDetector {
    url: string;
    sources: TSourceResultDict | undefined;
    result: object | undefined;

    constructor(url: string) {
        this.url = url;
    }

    async detect(): Promise<boolean> {
        try {
            this.sources = await collect()
            let response = await fetch(this.url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.sources)
            })
            this.result = await response.json()
        } catch {
            return false
        }

        return true
    }
}
