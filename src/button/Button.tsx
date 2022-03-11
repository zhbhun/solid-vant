import type { Component } from "solid-js";
import { createMemo, mergeProps } from "solid-js";
import { Dynamic, Show } from "solid-js/web";

import { LoadingType } from "../loading";
import { preventDefault } from "../utils/dom";

export type ButtonType =
  | "default"
  | "primary"
  | "success"
  | "warning"
  | "danger";

export type ButtonSize = "large" | "normal" | "small" | "mini";

export type ButtonNativeType = "submit" | "reset" | "button";

export type ButtonIconPosition = "left" | "right";

export interface ButtonProps {
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
  /** Emitted when button is clicked and not disabled or loading */
  onClick?: (event: MouseEvent) => void;
}

export const defaultButtonProps: ButtonProps = {
  tag: "button",
  type: "default",
  size: "normal",
  nativeType: "button",
  iconPosition: "left",
};

const Button: Component<ButtonProps> = (props) => {
  const _props = mergeProps(defaultButtonProps, props);
  const onClick = (event: MouseEvent) => {
    if (_props.loading) {
      preventDefault(event);
    } else if (!_props.disabled) {
      _props.onClick?.(event);
    }
  };
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
      text = _props.children ? _props.children : _props.text;
    }
    return text;
  });
  return (
    <Dynamic
      component={_props.tag}
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
