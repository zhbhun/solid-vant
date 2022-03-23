import {
  createEffect,
  createSignal,
  on,
  type Accessor,
  type JSX,
} from 'solid-js';

export function useLazyRender(show: Accessor<boolean | undefined>) {
  const [inited, setInited] = createSignal(false);

  createEffect(
    on(show, (value) => {
      if (value) {
        setInited(value);
      }
    })
  );

  return (render: () => JSX.Element) => () => inited() ? render() : null;
}
