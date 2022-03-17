import classNames from 'classnames';
import type { Component, JSX } from 'solid-js';
import { mergeProps, splitProps } from 'solid-js';
import { Show } from 'solid-js/web';
import { addUnit, createNamespace, mergeStyles } from '../utils';
import { Badge, BadgeProps } from '../badge';

export interface IconProps extends JSX.HTMLAttributes<any> {
  tag?: keyof HTMLElementTagNameMap;
  dot?: boolean;
  badge?: JSX.Element;
  name: string;
  color?: string;
  size?: number | string;
  badgeProps?: BadgeProps;
}

export const defaultIconProps: Partial<IconProps> = {
  tag: 'i',
};

const isImage = (name?: string) => name?.includes('/');

const [name, bem] = createNamespace('icon');

export const Icon: Component<IconProps> = (props) => {
  const [_props, attrs] = splitProps(mergeProps(defaultIconProps, props), [
    'tag',
    'badge',
    'name',
    'color',
    'size',
    'badgeProps',
    'children',
  ]);
  return (
    <Badge
      {...attrs}
      tag={_props.tag}
      content={_props.badge}
      class={classNames(name, `${name}-${_props.name}`, attrs.class)}
      style={mergeStyles(
        {
          color: _props.color,
          'font-size': addUnit(_props.size),
        },
        attrs.style
      )}
    >
      {_props.children}
      <Show when={isImage(_props.name)} fallback={null}>
        <img class={bem('image')} src={_props.name} />
      </Show>
    </Badge>
  );
};

export default Icon;
