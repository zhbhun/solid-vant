import classNames from 'classnames';
import type { Component, JSX } from 'solid-js';
import { mergeProps, splitProps } from 'solid-js';
import { Show } from 'solid-js/web';
import { BORDER_TOP_BOTTOM, createNamespace } from '../utils';

export interface CellGroupProps extends Omit<JSX.HTMLAttributes<any>, 'title'> {
  title?: JSX.Element;
  inset?: boolean;
  border?: boolean;
}

export const defaultCellGroupProps = {
  border: true,
};

const [name, bem] = createNamespace('cell-group');

export const CellGroup: Component<CellGroupProps> = (prop) => {
  const [_props, attrs] = splitProps(mergeProps(defaultCellGroupProps, prop), [
    'title',
    'inset',
    'border',
  ]);
  const renderGroup = () => (
    <div
      {...attrs}
      class={classNames(
        bem({ inset: _props.inset }),
        { [BORDER_TOP_BOTTOM]: _props.border && !_props.inset },
        attrs.class
      )}
    >
      {attrs.children}
    </div>
  );

  const renderTitle = () => (
    <div class={bem('title', { inset: _props.inset })}>{_props.title}</div>
  );

  return (
    <Show when={!!_props.title} fallback={renderGroup()}>
      <>
        {renderTitle()}
        {renderGroup()}
      </>
    </Show>
  );
};

export default CellGroup;
