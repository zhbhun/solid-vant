import classNames, { Argument as ClassNames } from 'classnames';
import {
  createEffect,
  createMemo,
  createSignal,
  mergeProps,
  on,
  onMount,
  splitProps,
  type Component,
  type JSX,
} from 'solid-js';
import { Portal, Show } from 'solid-js/web';
import { Transition } from 'solid-transition-group';
import { useEventListener, useLockScroll } from '../hooks';
import {
  HAPTICS_FEEDBACK,
  callInterceptor,
  callEventHandler,
  callCustomEventHandler,
  createNamespace,
  isDef,
  mergeStyles,
  type Interceptor,
  type CustomEventHandlerUnion,
} from '../utils';
import { Icon } from '../icon';
import { Overlay } from '../overlay';
import { PopupPosition, PopupCloseIconPosition } from './types';

export interface PopupBaseProps {
  // whether to show popup
  show?: boolean;
  // z-index
  zIndex?: number;
  // whether to show overlay
  overlay?: boolean;
  // overlay conent
  overlayContent?: JSX.Element;
  // transition duration
  duration?: number;
  // teleport
  // teleport?: string | Element;
  teleport?: Element;
  // prevent body scroll
  lockScroll?: boolean;
  // callback function before close
  beforeClose?: Interceptor;
  // overlay custom style
  overlayStyle?: JSX.CSSProperties;
  // overlay custom class name
  overlayClass?: ClassNames;
  // Initial rendering animation
  transitionAppear?: boolean;
  // whether to close popup when overlay is clicked
  closeOnClickOverlay?: boolean;
}

export const defaultPopupBaseProps = {
  overlay: true,
  lockScroll: true,
  closeOnClickOverlay: true,
};

export interface PopupProps extends PopupBaseProps {
  round?: boolean;
  position?: PopupPosition;
  closeIcon?: string;
  closeable?: boolean;
  transition?: string;
  closeOnPopstate?: boolean;
  closeIconPosition?: PopupCloseIconPosition;
  safeAreaInsetBottom?: boolean;
  onClickOverlay?: JSX.EventHandlerUnion<HTMLElement, MouseEvent>;
  onClickCloseIcon?: JSX.EventHandlerUnion<HTMLElement, MouseEvent>;
  onOpen?: CustomEventHandlerUnion;
  onClose?: CustomEventHandlerUnion;
  onOpened?: CustomEventHandlerUnion;
  onClosed?: CustomEventHandlerUnion;
  onUpdateShow?: CustomEventHandlerUnion<boolean>;
}

export const popupPropKeys: (keyof PopupProps)[] = [
  'show',
  'zIndex',
  'overlay',
  'overlayContent',
  'duration',
  'teleport',
  'lockScroll',
  'beforeClose',
  'overlayStyle',
  'overlayClass',
  'transitionAppear',
  'closeOnClickOverlay',
  'round',
  'position',
  'closeIcon',
  'closeable',
  'transition',
  'closeOnPopstate',
  'closeIconPosition',
  'safeAreaInsetBottom',
  'onClickOverlay',
  'onClickCloseIcon',
  'onOpen',
  'onClose',
  'onOpened',
  'onClosed',
  'onUpdateShow',
];

export const defaultPopupProps = {
  ...defaultPopupBaseProps,
  position: 'center',
  closeIcon: 'cross',
  closeIconPosition: 'top-right',
};

export interface PopupHTMLProps extends JSX.HTMLAttributes<any>, PopupProps {}

const [name, bem] = createNamespace('popup');

let globalZIndex = 2000;

export const Popup: Component<PopupHTMLProps> = (prop) => {
  const [_props, attrs] = splitProps(
    mergeProps(defaultPopupProps, prop),
    popupPropKeys
  );

  let opened: boolean;
  let shouldReopen: boolean;

  const [zIndex, setZIndex] = createSignal<number>();
  const [popupRef, setPopupRef] = createSignal<HTMLElement>();

  const style = createMemo(() => {
    const style: JSX.CSSProperties = {
      'z-index': zIndex(),
    };

    if (isDef(_props.duration)) {
      const key =
        _props.position === 'center'
          ? 'animation-duration'
          : 'transition-duration';
      style[key] = `${_props.duration}s`;
    }

    return mergeStyles(style, attrs.style);
  });

  const open = () => {
    if (!opened) {
      if (_props.zIndex !== undefined) {
        globalZIndex = +_props.zIndex;
      }

      opened = true;
      setZIndex(++globalZIndex);

      callCustomEventHandler(_props.onOpen);
    }
  };

  const close = () => {
    if (opened) {
      callInterceptor(_props.beforeClose, {
        done() {
          opened = false;
          callCustomEventHandler(_props.onClose);
          callCustomEventHandler(_props.onUpdateShow, false);
        },
      });
    }
  };

  const onClickOverlay = (event: MouseEvent) => {
    callEventHandler(_props.onClickOverlay, event);

    if (_props.closeOnClickOverlay) {
      close();
    }
  };

  const renderOverlay = () => {
    return (
      <Show when={_props.overlay}>
        <Overlay
          show={_props.show}
          class={classNames(_props.overlayClass)}
          zIndex={zIndex()}
          duration={_props.duration}
          style={_props.overlayStyle}
          onClick={onClickOverlay}
        >
          {_props.overlayContent}
        </Overlay>
      </Show>
    );
  };

  const onClickCloseIcon = (event: MouseEvent) => {
    callEventHandler(_props.onClickCloseIcon, event);

    close();
  };

  const renderCloseIcon = () => {
    return (
      <Show when={_props.closeable}>
        <Icon
          role="button"
          tabindex={0}
          name={_props.closeIcon}
          class={classNames([
            bem('close-icon', _props.closeIconPosition),
            HAPTICS_FEEDBACK,
          ])}
          onClick={onClickCloseIcon}
        />
      </Show>
    );
  };

  const onOpened = () => callCustomEventHandler(_props.onOpened);
  const onClosed = () => callCustomEventHandler(_props.onClosed);

  const renderPopup = () => {
    if (_props.show) {
      return (
        <div
          ref={setPopupRef}
          {...attrs}
          style={style()}
          class={classNames([
            bem({
              round: _props.round,
              [_props.position]: _props.position,
            }),
            { 'van-safe-area-bottom': _props.safeAreaInsetBottom },
            attrs.class
          ])}
        >
          {attrs.children}
          {renderCloseIcon()}
        </div>
      );
    }
    return null;
  };

  const transitionProps = createMemo(() => {
    const name =
      _props.transition ||
      (_props.position === 'center'
        ? 'van-fade'
        : `van-popup-slide-${_props.position}`);
    return {
      name,
      enterActiveClass: `${name}-enter-active`,
      enterClass: `${name}-enter-from`,
      enterToClass: `${name}-enter-to`,
      exitActiveClass: `${name}-leave-active`,
      exitClass: `${name}-leave-from`,
      exitToClass: `${name}-leave-to`,
    };
  });

  const renderTransition = () => {
    return (
      <Transition
        {...transitionProps()}
        appear={_props.transitionAppear}
        onAfterEnter={onOpened}
        onAfterExit={onClosed}
      >
        {renderPopup()}
      </Transition>
    );
  };

  createEffect(
    on(
      () => _props.show,
      (show) => {
        if (show && !opened) {
          open();

          if (attrs.tabindex === 0) {
            setTimeout(() => {
              popupRef()?.focus();
            }, 0);
          }
        }
        if (!show && opened) {
          opened = false;
          callCustomEventHandler(_props.onClose);
        }
      },
      {
        defer: true,
      }
    )
  );

  useLockScroll(popupRef, () => !!(_props.show && _props.lockScroll));

  useEventListener('popstate', () => {
    if (_props.closeOnPopstate) {
      close();
      shouldReopen = false;
    }
  });

  onMount(() => {
    if (_props.show) {
      open();
    }
  });

  // TODO
  // provide(POPUP_TOGGLE_KEY, () => _props.show);

  return (
    <Show
      when={_props.teleport}
      fallback={
        <>
          {renderOverlay()}
          {renderTransition()}
        </>
      }
    >
      <Portal mount={_props.teleport}>
        {renderOverlay()}
        {renderTransition()}
      </Portal>
    </Show>
  );
};

export default Popup;
