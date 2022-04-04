import type { LoadingType } from '../loading';
import type { PopupProps } from '../popup';

export type ToastType = 'text' | 'loading' | 'success' | 'fail' | 'html';

export type ToastPosition = 'top' | 'middle' | 'bottom';

export type ToastPopupProps = Pick<
  PopupProps,
  | 'show'
  | 'overlay'
  | 'duration'
  | 'teleport'
  | 'transition'
  | 'overlayClass'
  | 'overlayStyle'
  | 'closeOnClickOverlay'
  | 'onUpdateShow'
  | 'onClose'
  | 'onOpen'
  | 'onOpened'
  | 'onClosed'
>;

export interface ToastProps extends ToastPopupProps {
  icon?: string;
  type?: ToastType;
  message?: string;
  iconSize?: number | string;
  position?: ToastPosition;
  // TODO: iconPrefix?: String,
  loadingType?: LoadingType;
  forbidClick?: boolean;
  closeOnClick?: boolean;
}

export type ToastOptions = Omit<ToastProps, 'show' | 'onShowUpdate'>;
