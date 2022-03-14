import type { Component, JSX } from "solid-js";
import { createMemo, mergeProps, splitProps } from "solid-js";
import { Dynamic, Show } from "solid-js/web";
import classNames from "classnames";

import { LoadingType } from "../loading";
import { callEventHandler, createNamespace, preventDefault } from "../utils";
import {
  ButtonType,
  ButtonSize,
  ButtonIconPosition,
  ButtonNativeType,
} from "./types";

export interface ButtonProps extends JSX.HTMLAttributes<any> {
  /** HTML Tag */
  tag?: keyof HTMLElementTagNameMap;
  /** Text */
  text?: string;
  /** Left Icon */
  icon?: string | (() => any);
  /** Can be set to primary success warning danger */
  type?: ButtonType;
  /** Can be set to large small mini */
  size?: ButtonSize;
  /** Color, support linear-gradient */
  color?: string;
  /** Whether to set display block */
  block?: boolean;
  /** Whether to be plain button */
  plain?: boolean;
  /** Whether to be round button */
  round?: boolean;
  /** Whether to be square button */
  square?: boolean;
  /** Whether to show loading status */
  loading?: boolean;
  hairline?: boolean;
  /** Whether to disable button */
  disabled?: boolean;
  /** Icon className prefix */
  iconPrefix?: string;
  /** Native Type Attribute */
  nativeType?: ButtonNativeType;
  /** Loading icon size */
  loadingSize?: number | string;
  /** Loading text */
  loadingText?: string;
  /** Loading type, can be set to spinner */
  loadingType?: LoadingType;
  /** Icon position, can be set to right */
  iconPosition?: ButtonIconPosition;
}

export const defaultButtonProps: ButtonProps = {
  tag: "button",
  type: "default",
  size: "normal",
  nativeType: "button",
  iconPosition: "left",
};

const [name, bem] = createNamespace("button");

export const Button: Component<ButtonProps> = (props) => {
  const [_props, attrs] = splitProps(mergeProps(defaultButtonProps, props), [
    "tag",
    "text",
    "icon",
    "type",
    "size",
    "color",
    "block",
    "plain",
    "round",
    "square",
    "loading",
    "hairline",
    "disabled",
    "iconPrefix",
    "nativeType",
    "loadingSize",
    "loadingText",
    "loadingType",
    "iconPosition",
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
      attrs.class,
      attrs.className
    );
  });
  const icon = createMemo(() => {
    if (_props.loading) {
      return "...";
    }

    if (_props.icon) {
      if (typeof _props.icon === "string") {
        return <div>icon</div>;
      } else if (typeof _props.icon === "function") {
        return _props.icon();
      }
    }
    return null;
  });
  const text = createMemo(() => {
    let text;
    if (_props.loading) {
      text = _props.loadingText;
    } else {
      text = attrs.children ? attrs.children : _props.text;
    }
    return text;
  });
  return (
    <Dynamic
      {...attrs}
      component={_props.tag}
      class={classes()}
      disabled={_props.disabled}
      onClick={onClick}
    >
      <div>
        <Show when={_props.iconPosition === "left" && icon()}>{icon()}</Show>
        <Show when={!!text()}>
          <span>{text()}</span>
        </Show>
        <Show when={_props.iconPosition === "right" && icon()}>{icon()}</Show>
      </div>
    </Dynamic>
  );
};

export default Button;
