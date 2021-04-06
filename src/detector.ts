import collect from "./collector";
import {TSourceResultDict} from "./types";

export default class BotDetector {
    url: string;
    version: string;
    sources: TSourceResultDict | undefined;
    result: object | undefined;

    constructor(url: string) {
        this.url = url;
        this.version = "0.1.0"
    }

    async detect(): Promise<boolean> {
        try {
            let timestamp = Date.now()
            this.sources = await collect()

            let body = {
                "timestamp": timestamp,
                "signals": this.sources,
                "version": this.version
            }

            let response = await fetch(this.url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            })
            this.result = await response.json()
        } catch {
            return false
        }

        return true
    }
}
