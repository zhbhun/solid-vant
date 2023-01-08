import classNames from 'classnames';
import type { Component, JSX } from 'solid-js';
import { createMemo, mergeProps, splitProps } from 'solid-js';
import { Dynamic, Show } from 'solid-js/web';
import { addUnit, isDef, mergeStyles } from '../utils';
import { createNamespace } from '../utils/create';
import { BadgePosition } from './types';

export interface BadgeProps extends JSX.HTMLAttributes<any> {
  dot?: boolean;
  max?: number | string;
  /** HTML Tag */
  tag?: keyof HTMLElementTagNameMap;
  color?: string;
  offset?: [string | number, string | number];
  content?: JSX.Element;
  showZero?: boolean;
  position?: BadgePosition;
}

export const defaultBadgeProps: BadgeProps = {
  tag: 'div',
  dot: false,
  showZero: true,
  position: 'top-right',
};

const [name, bem] = createNamespace('badge');

export const Badge: Component<BadgeProps> = (props) => {
  const [_props, attrs] = splitProps(mergeProps(defaultBadgeProps, props), [
    'dot',
    'max',
    'tag',
    'color',
    'offset',
    'content',
    'showZero',
    'position',
    'children',
  ]);
  const hasContent = createMemo(() => {
    if (typeof _props.content === 'number') {
      return _props.showZero ? true : _props.content !== 0;
    } else if (typeof _props.content === 'string') {
      return _props.content !== '';
    }
    return isDef(_props.content);
  });
  const renderContent = createMemo(() => {
    if (!_props.dot && hasContent()) {
      if (
        typeof _props.content === 'number' &&
        isDef(_props.max) &&
        _props.content > _props.max
      ) {
        return `${_props.max}+`;
      }

      return _props.content;
    }
    return null;
  });
  const style = createMemo(() => {
    const style: JSX.CSSProperties = _props.color
      ? {
          'background-color': _props.color,
        }
      : {};

    if (_props.offset) {
      const [x, y] = _props.offset;
      if (_props.children) {
        style.top = addUnit(y);

        if (typeof x === 'number') {
          style.right = addUnit(-x);
        } else {
          style.right = x.startsWith('-') ? x.replace('-', '') : `-${x}`;
        }
      } else {
        style['margin-top'] = addUnit(y);
        style['margin-left'] = addUnit(x);
      }
    }

    return style;
  });
  const renderBadge = (root = false) => {
    if (hasContent() || _props.dot) {
      return (
        <div
          {...(root ? attrs : null)}
          class={classNames(
            bem([
              _props.position,
              { dot: _props.dot, fixed: !!_props.children },
            ]),
            root ? attrs.class : null
          )}
          style={root ? mergeStyles(style(), attrs.style) : style()}
        >
          {renderContent()}
        </div>
      );
    }
    return null;
  };
  return (
    <Show when={!!_props.children} fallback={renderBadge(true)}>
      <Dynamic
        {...attrs}
        component={_props.tag}
        class={classNames(bem('wrapper'), attrs.class)}
      >
        {_props.children}
        {renderBadge()}
      </Dynamic>
    </Show>
  );
};

export default Badge;
