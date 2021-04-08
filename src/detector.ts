import collect from "./collector";
import {Options, SourceResultDict} from "./types";

export default class BotDetector {
    url: string;
    version: string;
    token: string;
    sources: SourceResultDict | undefined;
    result: object | undefined;

    constructor(options: Options) {
        this.url = options.url;
        this.token = options.token;
        this.version = "0.1.0"
    }

    async get(): Promise<boolean> {
        try {
            let timestamp = Date.now()
            this.sources = await collect()

            let body = {
                "timestamp": timestamp,
                "signals": this.sources,
                "version": this.version,
                "token": this.token
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
