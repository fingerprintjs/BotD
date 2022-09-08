import { BotdError, BrowserKind, State } from "../types";
import getBrowserKind from "./browser-kind";

export default function getPermissions(): Promise<boolean> {
  const browserKind = getBrowserKind();

  if (browserKind !== BrowserKind.Chrome)
    throw new BotdError(State.Undefined, "Only Chrome is supported");

  return new Promise<boolean>((resolve) => {
    navigator.permissions
      .query({ name: "notifications" })
      .then(function (permissionStatus) {
        if (
          Notification.permission === "denied" &&
          permissionStatus.state === "prompt"
        ) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
  });
}
