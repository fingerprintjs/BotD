import { SignalKind } from "../signals";
import { BrowserKind, ComponentDict, DetectionResponse, State } from "../types";

export function detectEvalLengthInconsistency({
  [SignalKind.EvalLength]: evalLength,
  [SignalKind.BrowserKind]: browserKind,
}: ComponentDict): DetectionResponse {
  if (
    evalLength.state === State.Success &&
    browserKind.state === State.Success
  ) {
    const length = evalLength.value;
    const browser = browserKind.value;
    return (
      (length === 37 &&
        ![BrowserKind.Firefox, BrowserKind.Safari].includes(browser)) ||
      (length === 39 && ![BrowserKind.IE].includes(browser)) ||
      (length === 33 &&
        ![BrowserKind.Chrome, BrowserKind.Opera].includes(browser))
    );
  }
}
