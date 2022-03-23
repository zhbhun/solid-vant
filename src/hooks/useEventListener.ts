import { createEffect, on, onCleanup, onMount, type Accessor } from 'solid-js';
import { inBrowser, isFunction } from '../utils';

type TargetRef = EventTarget | Accessor<EventTarget | undefined>;

export type UseEventListenerOptions = {
  target?: TargetRef;
  capture?: boolean;
  passive?: boolean;
};

export function useEventListener(
  type: string,
  listener: EventListener,
  options: UseEventListenerOptions = {}
) {
  if (!inBrowser) {
    return;
  }

  const { target = window, passive = false, capture = false } = options;

  let attached: boolean;

  const add = (target?: TargetRef) => {
    const element = isFunction(target) ? target() : target;

    if (element && !attached) {
      element.addEventListener(type, listener, { capture, passive });
      attached = true;
    }
  };

  const remove = (target?: TargetRef) => {
    const element = isFunction(target) ? target() : target;

    if (element && attached) {
      element.removeEventListener(type, listener, capture);
      attached = false;
    }
  };

  onCleanup(() => remove(target));
  onMount(() => add(target));

  if (isFunction(target)) {
    createEffect(
      on(target, (currentTarget, preTarget) => {
        remove(preTarget);
        add(currentTarget);
      })
    );
  }
}
