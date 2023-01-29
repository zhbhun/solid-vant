import {
  type Accessor,
  type Component,
  type JSX,
  children,
  createContext,
  createMemo,
  mergeProps,
  splitProps,
  useContext,
} from 'solid-js';
import { createNamespace } from '../utils';
import { SpaceAlign, SpaceDirection, SpaceSize } from './types';

export interface SpaceProps extends JSX.HTMLAttributes<HTMLDivElement> {
  align?: SpaceAlign;
  direction?: SpaceDirection;
  size?: SpaceSize | [SpaceSize, SpaceSize];
  wrap?: boolean;
  fill?: boolean;
}

export const defaultSpaceProps: Partial<SpaceProps> = {
  direction: 'horizontal',
  size: '8px',
  wrap: false,
  fill: false,
};

const [name, bem] = createNamespace('space');

export const Space: Component<SpaceProps> = (props) => {
  const [_props, attrs] = splitProps(mergeProps(defaultSpaceProps, props), [
    'align',
    'direction',
    'size',
    'wrap',
    'fill',
  ]);

  const mergedAlign = createMemo(
    () => _props.align ?? (_props.direction === 'horizontal' ? 'center' : '')
  );

  const getMarginStyle = (isLast: boolean): JSX.CSSProperties => {
    const style: JSX.CSSProperties = {};

    const marginRight = Array.isArray(_props.size)
      ? _props.size[0]
      : _props.size;
    const marginBottom = Array.isArray(_props.size)
      ? _props.size[1]
      : _props.size;

    if (isLast) {
      return _props.wrap
        ? ({ 'margin-bottom': marginBottom } as JSX.CSSProperties)
        : {};
    }

    if (_props.direction === 'horizontal') {
      style['margin-right'] = marginRight;
    }
    if (_props.direction === 'vertical' || _props.wrap) {
      style['margin-bottom'] = marginBottom;
    }

    return style;
  };

  const className = createMemo(() =>
    bem({
      [_props.direction || '']: _props.direction,
      [`align-${mergedAlign()}`]: !!mergedAlign(),
      wrap: _props.wrap,
      fill: _props.fill,
    })
  );

  const resolvedChildren = children(() => attrs.children);
  const wrappedChildren = createMemo(() => {
    const childrenArray = resolvedChildren.toArray();
    return childrenArray.map((c, i) => {
      return (
        <div
          class={`${name}-item`}
          style={getMarginStyle(i === childrenArray.length - 1)}
        >
          {c}
        </div>
      );
    });
  });

  return (
    <div {...attrs} class={className()}>
      {wrappedChildren()}
    </div>
  );
};

export default Space;
