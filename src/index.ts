import BotDetector from "./detector";
import {Options} from "./types";

export async function load(options: Options): Promise<BotDetector> {
    return new BotDetector(options);
}