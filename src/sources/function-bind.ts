import { BotdError, State } from "../types";

export default function getFunctionBind(): string {
  if (Function.prototype.bind === undefined) {
    throw new BotdError(
      State.NotFunction,
      "Function.prototype.bind is undefined",
    );
  }
  return Function.prototype.bind.toString();
}
