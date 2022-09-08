import { BotdError, State } from "../types";

export default function getDocumentAttributes(): string[] {
  if (document.documentElement === undefined) {
    throw new BotdError(
      State.Undefined,
      "document.documentElement is undefined",
    );
  }
  const names: string[] = [];
  for (const attr of document.documentElement.attributes) {
    names.push(attr.name);
  }
  return names;
}
