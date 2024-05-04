import { RefObject } from "react";

export function resizeTextarea(
  ref: RefObject<HTMLTextAreaElement>,
  state: string
) {
  if (ref.current && state.length > 0) {
    ref.current.style.height = "";
    ref.current.style.height = ref.current.scrollHeight + "px";
  }
}
