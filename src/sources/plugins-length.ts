import { BotdError, State } from "../types";

export default function getPluginsLength(): number {
  if (navigator.plugins === undefined) {
    throw new BotdError(State.Undefined, "navigator.plugins is undefined");
  }
  return navigator.plugins.length;
}
