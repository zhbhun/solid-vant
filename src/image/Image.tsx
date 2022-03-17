import classNames from 'classnames';
import type { Component, JSX } from 'solid-js';
import {
  createEffect,
  createSignal,
  createMemo,
  mergeProps,
  on,
  splitProps,
} from 'solid-js';
import { Show } from 'solid-js/web';
import { addUnit, createNamespace, isDef, mergeStyles } from '../utils';
import { Icon } from '../icon';
import { ImageFit, ImagePosition } from './types';

export interface ImageProps extends JSX.HTMLAttributes<any> {
  src?: string;
  alt?: string;
  fit?: ImageFit;
  position?: ImagePosition;
  round?: boolean;
  width?: number | string;
  height?: number | string;
  radius?: number | string;
  lazyLoad?: boolean;
  iconSize?: number | string;
  showError?: boolean;
  errorIcon?: string;
  showLoading?: boolean;
  loadingIcon?: string;
  renderLoading?(): JSX.Element;
  renderError?(): JSX.Element;
  onLoad?(event?: Event): void;
  onError?(event?: Event): void;
}

export const defaultImageProps = {
  showError: true,
  errorIcon: 'photo-fail',
  showLoading: true,
  loadingIcon: 'photo',
};

const [name, bem] = createNamespace('image');

export const Image: Component<ImageProps> = (props) => {
  const [_props, attrs] = splitProps(mergeProps(defaultImageProps, props), [
    'src',
    'alt',
    'fit',
    'position',
    'round',
    'width',
    'height',
    'radius',
    'lazyLoad',
    'iconSize',
    'showError',
    'errorIcon',
    'showLoading',
    'loadingIcon',
    'renderError',
    'renderLoading',
    'onLoad',
    'onError',
  ]);
  const [error, setError] = createSignal(false);
  const [loading, setLoading] = createSignal(true);
  let imageRef;

  const style = createMemo(() => {
    const style: JSX.CSSProperties = {
      width: addUnit(_props.width),
      height: addUnit(_props.height),
    };

    if (isDef(_props.radius)) {
      style.overflow = 'hidden';
      style['border-radius'] = addUnit(_props.radius);
    }

    return mergeStyles(style, attrs.style);
  });

  createEffect(
    on(
      () => _props.src,
      (a) => {
        setError(false);
        setLoading(true);
      },
      { defer: true }
    )
  );

  const onLoad = (event: Event) => {
    setLoading(false);
    _props.onLoad?.(event);
  };

  const onError = (event?: Event) => {
    setError(true);
    setLoading(false);
    _props.onError?.(event);
  };

  const renderIcon = (
    name: string,
    className: string,
    customRender?: () => JSX.Element
  ) => {
    if (customRender) {
      return customRender();
    }
    return <Icon name={name} size={_props.iconSize} class={className} />;
  };

  const renderPlaceholder = () => {
    if (loading() && _props.showLoading) {
      return (
        <div class={bem('loading')}>
          {renderIcon(
            _props.loadingIcon,
            bem('loading-icon'),
            _props.renderLoading
          )}
        </div>
      );
    }
    if (error() && _props.showError) {
      return (
        <div class={bem('error')}>
          {renderIcon(_props.errorIcon, bem('error-icon'), _props.renderError)}
        </div>
      );
    }
  };

  const renderImage = () => {
    if (error() || !_props.src) {
      return;
    }

    const imgAttrs = {
      alt: _props.alt,
      class: bem('img'),
      style: {
        'object-fit': _props.fit,
        'object-position': _props.position,
      },
    };

    return (
      <img src={_props.src} onLoad={onLoad} onError={onError} {...imgAttrs} />
    );
  };

  return () => (
    <div class={bem({ round: _props.round })} style={style()}>
      {renderImage()}
      {renderPlaceholder()}
      {attrs.children}
    </div>
  );
};

export default Image;
