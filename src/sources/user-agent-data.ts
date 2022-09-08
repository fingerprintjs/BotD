import { BotdError, State } from "../types";

export default function getUserAgentData(): NavigatorUAData {
  if (navigator.userAgentData === undefined) {
    throw new BotdError(
      State.Undefined,
      "navigator.userAgentData is undefined",
    );
  }
  return navigator.userAgentData;
}
