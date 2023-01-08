import classNames from 'classnames';
import type { Component, JSX } from 'solid-js';
import { createMemo, mergeProps, splitProps } from 'solid-js';
import { Show } from 'solid-js/web';
import { addUnit, createNamespace, getSizeStyle, mergeStyles } from '../utils';

export type LoadingType = 'circular' | 'spinner';

export interface LoadingProps extends JSX.HTMLAttributes<any> {
  size?: number | string;
  type?: LoadingType;
  color?: string;
  vertical?: boolean;
  textSize?: number | string;
  textColor?: string;
}

export const loadingProps = {
  type: 'circular',
};

const [name, bem] = createNamespace('loading');

const SpinIcon: Component = () => (
  <>
    {Array(12)
      .fill(null)
      .map((_, index) => (
        <i class={bem('line', String(index + 1))} />
      ))}
  </>
);

const CircularIcon: Component = () => (
  <svg class={bem('circular')} viewBox="25 25 50 50">
    <circle cx="50" cy="50" r="20" fill="none" />
  </svg>
);

export const Loading: Component<LoadingProps> = (prop) => {
  const [_props, attrs] = splitProps(mergeProps(loadingProps, prop), [
    'size',
    'type',
    'color',
    'vertical',
    'textSize',
    'textColor',
  ]);

  const spinnerStyle = createMemo(() =>
    mergeStyles({ color: _props.color }, getSizeStyle(_props.size))
  );

  return (
    <div
      {...attrs}
      class={classNames(
        bem([_props.type, { vertical: _props.vertical }]),
        attrs.class
      )}
    >
      <span class={bem('spinner', _props.type)} style={spinnerStyle()}>
        <Show when={_props.type === 'spinner'} fallback={<CircularIcon />}>
          {<SpinIcon />}
        </Show>
      </span>
      <Show when={!!attrs.children}>
        <span
          class={bem('text')}
          style={{
            'font-size': addUnit(_props.textSize),
            color: _props.textColor ?? _props.color,
          }}
        >
          {attrs.children}
        </span>
      </Show>
    </div>
  );
};

export default Loading;
