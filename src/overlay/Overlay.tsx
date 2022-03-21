import classNames from 'classnames';
import { Component, createMemo, JSX } from 'solid-js';
import { Transition } from 'solid-transition-group';
import { mergeProps, splitProps } from 'solid-js';
import {
  createNamespace,
  getZIndexStyle,
  isDef,
  mergeStyles,
  noop,
  preventDefault,
} from '../utils';

export interface OverlayProps extends JSX.HTMLAttributes<any> {
  show?: boolean;
  zIndex?: number;
  duration?: number;
  lockScroll?: boolean;
  lazyRender?: true;
}

export const defaultOverlayProps = {
  lockScroll: true,
  lazyRender: true,
};

const [name, bem] = createNamespace('overlay');

const preventTouchMove = (event: TouchEvent) => {
  preventDefault(event, true);
};

export const Overlay: Component<OverlayProps> = (props) => {
  const [_props, attrs] = splitProps(mergeProps(defaultOverlayProps, props), [
    'show',
    'zIndex',
    'duration',
    'lockScroll',
    'lazyRender',
  ]);

  const style = createMemo(() => {
    const value: JSX.CSSProperties = mergeStyles(
      getZIndexStyle(_props.zIndex),
      attrs.style
    );

    if (isDef(_props.duration)) {
      value.animationDuration = `${_props.duration}s`;
    }

    return value;
  });

  const renderOverlay = () => {
    if (!_props.show) {
      return null;
    }
    return (
      <div
        {...attrs}
        style={style()}
        class={classNames(bem(), attrs.class)}
        onTouchMove={_props.lockScroll ? preventTouchMove : noop}
      >
        {attrs.children}
      </div>
    );
  };

  return () => (
    <Transition
      name="van-fade"
      enterClass="van-fade-enter-from"
      enterActiveClass="van-fade-enter-active"
      enterToClass="van-fade-enter-to"
      exitClass="van-fade-leave-from"
      exitActiveClass="van-fade-leave-active"
      exitToClass="van-fade-leave-to"
      appear
    >
      {renderOverlay()}
    </Transition>
  );
};

export default Overlay;
