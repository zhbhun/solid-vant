import classNames from 'classnames';
import type { Accessor, Component, JSX } from 'solid-js';
import {
  createContext,
  createMemo,
  mergeProps,
  splitProps,
  useContext,
} from 'solid-js';
import { Dynamic } from 'solid-js/web';
import { addUnit, createNamespace, mergeStyles } from '../utils';
import { RowAlign, RowJustify } from './types';

export interface RowProps extends JSX.HTMLAttributes<any> {
  tag?: keyof HTMLElementTagNameMap;
  wrap?: boolean;
  align?: RowAlign;
  gutter?: number;
  justify?: RowJustify;
}

export const defaultRowProps: Partial<RowProps> = {
  tag: 'div',
  wrap: true,
  gutter: 0,
};

export const RowContext = createContext<{ padding: Accessor<number> }>();

export function useRow() {
  return useContext(RowContext);
}

const [name, bem] = createNamespace('row');

export const Row: Component<RowProps> = (props) => {
  const [_props, attrs] = splitProps(mergeProps(defaultRowProps, props), [
    'tag',
    'wrap',
    'align',
    'gutter',
    'justify',
  ]);
  const padding = createMemo(() => {
    return _props.gutter ? _props.gutter / 2 : 0;
  });
  const style = createMemo(() => {
    const currentPadding = padding();
    if (currentPadding === 0) {
      return attrs.style;
    }
    return mergeStyles(
      {
        'margin-left': addUnit(-currentPadding),
        'margin-right': addUnit(-currentPadding),
      },
      attrs.style
    );
  });
  const context = {
    padding,
  };
  return (
    <RowContext.Provider value={context}>
      <Dynamic
        {...attrs}
        component={_props.tag}
        class={classNames(
          bem({
            [`align-${_props.align}`]: _props.align,
            [`justify-${_props.justify}`]: _props.justify,
            nowrap: !_props.wrap,
          }),
          attrs.class
        )}
        style={style()}
      >
        {attrs.children}
      </Dynamic>
    </RowContext.Provider>
  );
};

export default Row;
