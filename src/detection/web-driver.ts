import { SignalKind } from "../signals";
import { BotKind, ComponentDict, DetectionResponse, State } from "../types";

export function detectWebDriver({
  [SignalKind.WebDriver]: webDriver,
}: ComponentDict): DetectionResponse {
  if (webDriver.state === State.Success && webDriver.value)
    return BotKind.HeadlessChrome;
}
