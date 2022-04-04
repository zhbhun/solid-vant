import { type Component } from 'solid-js';
import { render } from 'solid-js/web';

export interface MountedApp<T> {
  instance: T;
  unmount(): void;
}

export function mountComponent<T = any>(
  RootComponent: Component
): MountedApp<T> {
  const root = document.createElement('div');

  document.body.appendChild(root);

  let instance: T;
  const dispose = render(
    () => (
      <RootComponent
        ref={(current: T) => {
          instance = current;
        }}
      />
    ),
    root
  );
  return {
    get instance() {
      return instance;
    },
    unmount() {
      dispose();
      document.body.removeChild(root);
    },
  };
}
