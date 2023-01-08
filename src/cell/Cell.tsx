import classNames, { Argument as ClassNames } from 'classnames';
import type { Component, JSX } from 'solid-js';
import { createMemo, mergeProps, splitProps } from 'solid-js';
import { createNamespace, isDef } from '../utils';
import { Icon } from '../icon';
import { CellSize, CellArrowDirection } from './types';

export interface CellProps
  extends Omit<JSX.HTMLAttributes<HTMLDivElement>, 'title'> {
  icon?: JSX.Element;
  size?: CellSize;
  title?: JSX.Element;
  value?: JSX.Element;
  label?: JSX.Element;
  extra?: JSX.Element;
  center?: boolean;
  isLink?: boolean;
  rightIcon?: JSX.Element;
  border?: boolean;
  required?: boolean;
  iconPrefix?: string;
  valueClass?: ClassNames;
  labelClass?: ClassNames;
  titleClass?: ClassNames;
  titleStyle?: JSX.CSSProperties | string;
  arrowDirection?: CellArrowDirection;
  clickable?: boolean;
}

export const defaultCellProps = {
  border: true,
};

const [, bem] = createNamespace('cell');

export const Cell: Component<CellProps> = (props) => {
  const [_props, attrs] = splitProps(mergeProps(defaultCellProps, props), [
    'icon',
    'size',
    'title',
    'value',
    'label',
    'extra',
    'center',
    'isLink',
    'rightIcon',
    'border',
    'required',
    'valueClass',
    'labelClass',
    'titleClass',
    'titleStyle',
    'arrowDirection',
    'clickable',
  ]);
  const renderLabel = createMemo(() => {
    if (isDef(_props.label)) {
      return (
        <div class={classNames([bem('label'), _props.labelClass])}>
          {_props.label}
        </div>
      );
    }
  });
  const renderTitle = createMemo(() => {
    if (isDef(_props.title)) {
      return (
        <div
          class={classNames([bem('title'), _props.titleClass])}
          style={_props.titleStyle}
        >
          {_props.title}
          {renderLabel()}
        </div>
      );
    }
  });
  const renderValue = createMemo(() => {
    const content = _props.value || attrs.children;

    if (isDef(content)) {
      return (
        <div
          class={classNames([
            bem('value', { alone: !isDef(_props.title) }),
            _props.valueClass,
          ])}
        >
          {content}
        </div>
      );
    }
  });
  const renderLeftIcon = createMemo(() => {
    if (_props.icon) {
      if (typeof _props.icon === 'string') {
        return <Icon name={_props.icon} class={bem('left-icon')} />;
      }
      return _props.icon;
    }
  });
  const renderRightIcon = createMemo(() => {
    if (_props.rightIcon) {
      return _props.rightIcon;
    }

    if (_props.isLink) {
      const name = _props.arrowDirection
        ? `arrow-${_props.arrowDirection}`
        : 'arrow';
      return <Icon name={name} class={bem('right-icon')} />;
    }
  });
  return (
    <div
      {...attrs}
      class={classNames(
        bem({
          center: _props.center,
          required: _props.required,
          clickable: _props.clickable,
          borderless: !_props.border,
          [_props.size ?? '']: !!_props.size,
        }),
        attrs.class
      )}
      role={_props.clickable ?? _props.isLink ? 'button' : undefined}
    >
      {renderLeftIcon()}
      {renderTitle()}
      {renderValue()}
      {renderRightIcon()}
      {_props.extra}
    </div>
  );
};

export default Cell;
