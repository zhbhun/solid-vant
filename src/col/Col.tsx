import classNames from 'classnames';
import type { Component, JSX } from 'solid-js';
import { createMemo, mergeProps, splitProps } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import { addUnit, createNamespace, mergeStyles } from '../utils';
import { useRow } from '../row';

export interface ColProps extends JSX.HTMLAttributes<any> {
  tag?: keyof HTMLElementTagNameMap;
  span: number;
  offset?: number;
}

export const defaultColProps: Partial<ColProps> = {
  tag: 'div',
  span: 0,
};

const [name, bem] = createNamespace('col');

export const Col: Component<ColProps> = (props) => {
  const context = useRow();
  const [_props, attrs] = splitProps(mergeProps(defaultColProps, props), [
    'tag',
    'span',
    'offset',
  ]);
  const style = createMemo(() => {
    const currentPadding = context?.padding();
    if (currentPadding) {
      return mergeStyles(
        {
          'padding-left': addUnit(currentPadding),
          'padding-right': addUnit(currentPadding),
        },
        attrs.style
      );
    }
    return attrs.style;
  });
  return (
    <Dynamic
      {...attrs}
      component={_props.tag}
      class={classNames(
        bem({
          [_props.span]: _props.span,
          [`offset-${_props.offset}`]: _props.offset,
        }),
        attrs.class
      )}
      style={style()}
    >
      {attrs.children}
    </Dynamic>
  );
};

export default Col;
