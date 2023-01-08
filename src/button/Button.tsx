import type { Component, JSX } from 'solid-js';
import { createMemo, mergeProps, splitProps } from 'solid-js';
import { Dynamic, Show } from 'solid-js/web';
import classNames from 'classnames';
import {
  callEventHandler,
  createNamespace,
  mergeStyles,
  preventDefault,
} from '../utils';
import Icon from '../icon';
import Loading, { type LoadingType } from '../loading';
import {
  ButtonType,
  ButtonSize,
  ButtonIconPosition,
  ButtonNativeType,
} from './types';

export interface ButtonProps extends JSX.HTMLAttributes<HTMLButtonElement> {
  /** HTML Tag */
  tag?: keyof HTMLElementTagNameMap;
  /** Text */
  text?: string;
  /** Left Icon */
  icon?: string | JSX.Element;
  /** Icon position, can be set to right */
  iconPosition?: ButtonIconPosition;
  /** Icon className prefix */
  iconPrefix?: string;
  /** Color, support linear-gradient */
  color?: string;
  /** Can be set to primary success warning danger */
  type?: ButtonType;
  /** Can be set to large small mini */
  size?: ButtonSize;
  /** Whether to set display block */
  block?: boolean;
  hairline?: boolean;
  /** Whether to be plain button */
  plain?: boolean;
  /** Whether to be round button */
  round?: boolean;
  /** Whether to be square button */
  square?: boolean;
  /** Whether to show loading status */
  loading?: boolean;
  /** Custom loading icon */
  loadingIcon?: JSX.Element;
  /** Loading icon size */
  loadingSize?: number | string;
  /** Loading text */
  loadingText?: string;
  /** Loading type, can be set to spinner */
  loadingType?: LoadingType;
  /** Whether to disable button */
  disabled?: boolean;
  /** Native Type Attribute */
  nativeType?: ButtonNativeType;
}

export const defaultButtonProps: ButtonProps = {
  tag: 'button',
  type: 'default',
  size: 'normal',
  plain: false,
  block: false,
  round: false,
  square: false,
  nativeType: 'button',
  iconPosition: 'left',
};

const [, bem] = createNamespace('button');

export const Button: Component<ButtonProps> = (props) => {
  const [_props, attrs] = splitProps(mergeProps(defaultButtonProps, props), [
    'tag',
    'text',
    'icon',
    'type',
    'size',
    'color',
    'block',
    'plain',
    'round',
    'square',
    'loading',
    'loadingIcon',
    'loadingSize',
    'loadingText',
    'loadingType',
    'hairline',
    'disabled',
    'iconPrefix',
    'nativeType',
    'iconPosition',
  ]);
  const onClick = (event: MouseEvent) => {
    if (_props.loading) {
      preventDefault(event);
    } else if (!_props.disabled) {
      callEventHandler(attrs.onClick || attrs.onclick, event);
    }
  };
  const classes = createMemo(() => {
    return classNames(
      bem([
        _props.type,
        _props.size,
        {
          plain: _props.plain,
          block: _props.block,
          round: _props.round,
          square: _props.square,
          loading: _props.loading,
          disabled: _props.disabled,
          hairline: _props.hairline,
        },
      ]),
      attrs.class
    );
  });
  const style = createMemo(() => {
    const style: JSX.CSSProperties = {};
    const { color, plain } = _props;
    if (color) {
      style.color = plain ? color : 'white';
      if (!plain) {
        style.background = color;
      }
      if (color.includes('gradient')) {
        style['border-width'] = 0;
      } else {
        style['border-color'] = color;
      }
    }
    return mergeStyles(style, attrs.style);
  });
  const renderLoadingIcon = () => {
    if (_props.loadingSize) {
      return _props.loadingIcon;
    }

    return (
      <Loading
        size={props.loadingSize}
        type={props.loadingType}
        class={bem('loading')}
      />
    );
  };
  const renderIcon = createMemo(() => {
    if (_props.loading) {
      return renderLoadingIcon();
    }
    if (_props.icon) {
      if (typeof _props.icon === 'string') {
        return <Icon class={bem('icon')} name={_props.icon} />;
      } else if (typeof _props.icon === 'function') {
        return <div class={bem('icon')}>{_props.icon}</div>;
      }
    }
    return null;
  });
  const renderText = createMemo(() => {
    let text;
    if (_props.loading) {
      text = _props.loadingText;
    } else {
      text = attrs.children ? attrs.children : _props.text;
    }
    if (text) {
      return <span class={bem('text')}>{text}</span>;
    }
  });
  return (
    <Dynamic
      {...attrs}
      component={_props.tag}
      class={classes()}
      style={style()}
      disabled={_props.disabled}
      onClick={onClick}
    >
      <div class={bem('content')}>
        <Show when={_props.iconPosition === 'left'}>{renderIcon()}</Show>
        {renderText()}
        <Show when={_props.iconPosition === 'right'}>{renderIcon()}</Show>
      </div>
    </Dynamic>
  );
};

export default Button;
