import type { JSX } from 'solid-js';

export const stopPropagation = (event: Event) => event.stopPropagation();

export function preventDefault(event: Event, isStopPropagation?: boolean) {
  /* istanbul ignore else */
  if (typeof event.cancelable !== 'boolean' || event.cancelable) {
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
    if (typeof handler === 'function') {
      handler(event);
    } else if (typeof handler[0] === 'function') {
      handler[0](handler[1], event);
    }
  }
}

export interface CustomEventHandler<E = any> {
  (e?: E): void;
}

export interface CustomBoundEventHandler<E = any> {
  0: (data?: any, e?: E) => void;
  1: any;
}

export type CustomEventHandlerUnion<E = any> =
  | CustomEventHandler<E>
  | CustomBoundEventHandler<E>;

export function callCustomEventHandler<E = any>(
  eventHandler?: CustomEventHandlerUnion<E>,
  event?: E
) {
  if (eventHandler) {
    if (typeof eventHandler === 'function') {
      eventHandler(event);
    } else if (typeof eventHandler[0] === 'function') {
      eventHandler[0](eventHandler[1], event);
    }
  }
}
