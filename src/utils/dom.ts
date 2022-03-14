import type { JSX } from "solid-js";

export const stopPropagation = (event: Event) => event.stopPropagation();

export function preventDefault(event: Event, isStopPropagation?: boolean) {
  /* istanbul ignore else */
  if (typeof event.cancelable !== "boolean" || event.cancelable) {
    event.preventDefault();
  }

  if (isStopPropagation) {
    stopPropagation(event);
  }
}

export function callEventHandler(
  handler?: JSX.EventHandlerUnion<any, any>,
  event?: Event
) {
  if (handler) {
    if (typeof handler === "function") {
      handler(event);
    } else if (typeof handler[0] === "function") {
      handler[0](handler[1], event);
    }
  }
}
