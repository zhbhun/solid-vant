import classNames from 'classnames';
import { createMemo, mergeProps, splitProps, type JSX } from 'solid-js';
import { Show } from 'solid-js/web';
import {
  addUnit,
  callCustomEventHandler,
  createNamespace,
  mergeStyles,
  type CustomEventHandlerUnion,
} from '../utils';
import { Loading } from '../loading';

export interface SwitchProps<V = boolean> {
  size?: number | string;
  loading?: boolean;
  disabled?: boolean;
  value?: V;
  activeColor?: string;
  inactiveColor?: string;
  activeValue?: V;
  inactiveValue?: V;
  onChange?: CustomEventHandlerUnion<V>;
}

export const switchPropKeys: (keyof SwitchProps)[] = [
  'size',
  'loading',
  'disabled',
  'value',
  'activeColor',
  'inactiveColor',
  'activeValue',
  'inactiveValue',
  'onChange',
];

export const defaultSwitchProps = {
  activeValue: true,
  inactiveValue: false,
};

export interface SwtichHTMLProps<V = boolean>
  extends Omit<JSX.HTMLAttributes<any>, 'onChange'>,
    SwitchProps<V> {}

const [name, bem] = createNamespace('switch');

export function Switch<V = boolean>(prop: SwtichHTMLProps<V>) {
  const [_props, attrs] = splitProps(
    mergeProps(defaultSwitchProps, prop),
    switchPropKeys
  );
  const isChecked = createMemo(() => {
    return _props.value === _props.activeValue
  });

  const onClick = () => {
    if (!_props.disabled && !_props.loading) {
      const newValue = isChecked() ? _props.inactiveValue : _props.activeValue;

      callCustomEventHandler(_props.onChange, newValue)
    }
  };

  const renderLoading = () => {
    return (
      <Show when={_props.loading} fallback={null}>
        <Loading
          class={bem('loading')}
          color={isChecked() ? _props.activeColor : _props.inactiveColor}
        />
      </Show>
    );
  };

  return (
    <div
      {...attrs}
      role="switch"
      class={classNames([
        bem({
          on: isChecked(),
          loading: _props.loading,
          disabled: _props.disabled,
        }),
        attrs.class,
      ])}
      style={mergeStyles(
        {
          'font-size': addUnit(_props.size),
          'background-color': isChecked()
            ? _props.activeColor
            : _props.inactiveColor,
        },
        attrs.style
      )}
      tabindex={_props.disabled ? undefined : 0}
      aria-checked={isChecked()}
      onClick={onClick}
    >
      <div class={bem('node')}>{renderLoading()}</div>
    </div>
  );
}

export default Switch;
