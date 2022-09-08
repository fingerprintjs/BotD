import { SignalKind } from "../signals";
import { BotKind, ComponentDict, DetectionResponse, State } from "../types";
import { includes } from "../utils";

export function detectDocumentAttributes({
  [SignalKind.DocumentAttributes]: documentAttributes,
}: ComponentDict): DetectionResponse {
  if (documentAttributes.state !== State.Success) return false;
  if (includes(documentAttributes.value, "selenium", "webdriver", "driver")) {
    return BotKind.Selenium;
  }
}
