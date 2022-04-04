import classNames from 'classnames';
import type { Component, JSX } from 'solid-js';
import {
  createEffect,
  mergeProps,
  on,
  onCleanup,
  onMount,
  splitProps,
} from 'solid-js';
import { Match, Show, Switch } from 'solid-js/web';
import { callCustomEventHandler, createNamespace, isDef } from '../utils';
import { Icon } from '../icon';
import { Loading } from '../loading';
import { Popup } from '../popup';
import type { ToastPopupProps, ToastProps } from './types';
import { lockClick } from './lock-click';

const toastPopupPropKeys: (keyof ToastPopupProps)[] = [
  'show',
  'overlay',
  'teleport',
  'transition',
  'overlayClass',
  'overlayStyle',
  'closeOnClickOverlay',
  'onUpdateShow',
  'onClose',
  'onOpen',
  'onOpened',
  'onClosed',
];

export const toastPropKeys: (keyof ToastProps)[] = [
  ...toastPopupPropKeys,
  'duration',
  'icon',
  'type',
  'message',
  'iconSize',
  'position',
  'loadingType',
  'forbidClick',
  'closeOnClick',
];

export const defaultToastProps = {
  type: 'text',
  duration: 2000,
  position: 'middle',
  transition: 'van-fade',
};

export interface ToastHTMLProps extends JSX.HTMLAttributes<any>, ToastProps {}

const [name, bem] = createNamespace('toast');

const Toast: Component<ToastHTMLProps> = (prop) => {
  const propsWithDefault = mergeProps(defaultToastProps, prop);
  const [_props, attrs] = splitProps(propsWithDefault, toastPropKeys);
  const [_popupPops] = splitProps(propsWithDefault, toastPopupPropKeys);

  let timer: NodeJS.Timeout;
  let clickable = false;

  const toggleClickable = () => {
    const newValue = !!(_props.show && _props.forbidClick);
    if (clickable !== newValue) {
      clickable = newValue;
      lockClick(clickable);
    }
  };

  const updateShow = (show: boolean) =>
    callCustomEventHandler(_props.onUpdateShow, show);

  const onClick = () => {
    if (_props.closeOnClick) {
      updateShow(false);
    }
  };

  const clearTimer = () => clearTimeout(timer);

  const renderIcon = () => {
    return (
      <Switch>
        <Match
          when={
            _props.icon || _props.type === 'success' || _props.type === 'fail'
          }
        >
          <Icon
            name={_props.icon || _props.type}
            size={_props.iconSize}
            class={bem('icon')}
          />
        </Match>
        <Match when={_props.type === 'loading'}>
          <Loading
            class={bem('loading')}
            size={_props.iconSize}
            type={_props.loadingType}
          />
        </Match>
      </Switch>
    );
  };

  const renderMessage = () => {
    return (
      <Show
        when={isDef(_props.message) && _props.message !== ''}
        fallback={null}
      >
        <Show
          when={_props.type === 'html'}
          fallback={<div class={bem('text')}>{_props.message}</div>}
        >
          <div class={bem('text')} innerHTML={String(_props.message)} />
        </Show>
      </Show>
    );
  };

  createEffect(
    on(() => [_props.show, _props.forbidClick], toggleClickable, {
      defer: true,
    })
  );

  createEffect(
    on(
      () => [_props.show, _props.type, _props.message, _props.duration],
      () => {
        clearTimer();
        if (_props.show && _props.duration > 0) {
          timer = setTimeout(() => {
            updateShow(false);
          }, _props.duration);
        }
      },
      { defer: true }
    )
  );

  onMount(toggleClickable);
  onCleanup(toggleClickable);

  return (
    <Popup
      {...attrs}
      {..._popupPops}
      class={classNames(
        bem([_props.position, { [_props.type]: !_props.icon }]),
        attrs.class
      )}
      lockScroll={false}
      onClick={onClick}
      onClosed={clearTimer}
      onUpdateShow={_props.onUpdateShow}
    >
      {renderIcon()}
      {renderMessage()}
    </Popup>
  );
};

export default Toast;
