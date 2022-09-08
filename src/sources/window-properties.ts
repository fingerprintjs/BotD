import { getObjectProps } from "../utils";

export default function getWindowProperties(): string[] {
  return getObjectProps(window);
}
