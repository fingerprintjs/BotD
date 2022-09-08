import { SignalKind } from "../signals";
import { BotKind, ComponentDict, DetectionResponse, State } from "../types";

export function detectPermissions({
  [SignalKind.Permissions]: permissions,
}: ComponentDict): DetectionResponse {
  if (permissions.state === State.Success && permissions.value) {
    return BotKind.HeadlessChrome;
  }
}
