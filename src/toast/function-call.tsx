import { createSignal } from 'solid-js';
import {
  extend,
  inBrowser,
  isObject,
  mountComponent,
} from '../utils';
import VanToast, { ToastHTMLProps } from './Toast';
import type { ToastOptions, ToastType } from './types';

const defaultOptions: ToastOptions = {
  icon: '',
  type: 'text',
  message: '',
  overlay: false,
  onClose: undefined,
  onOpened: undefined,
  duration: 2000,
  teleport: undefined,
  iconSize: undefined,
  position: 'middle',
  transition: 'van-fade',
  forbidClick: false,
  loadingType: undefined,
  overlayClass: '',
  overlayStyle: undefined,
  closeOnClick: false,
  closeOnClickOverlay: false,
};

interface ToastInstance {
  open(option: ToastOptions): void;
  clear(): void;
  message: string;
}

let queue: ToastInstance[] = [];
let allowMultiple = false;
let currentOptions = extend({}, defaultOptions);

// default options of specific type
const defaultOptionsMap = new Map<string, ToastOptions>();

function parseOptions(message: string | ToastOptions): ToastOptions {
  if (isObject(message)) {
    return message;
  }
  return { message };
}

function createInstance(): ToastInstance {
  const app = mountComponent<ToastInstance>((props: any) => {
    const [state, setState] = createSignal<ToastHTMLProps>({
      show: false,
      transitionAppear: true,
    } as any);

    const onClosed = () => {
      if (allowMultiple) {
        queue = queue.filter((item) => item !== instance);
        app.unmount();
      }
    };

    props.ref?.({
      open(options: ToastOptions) {
        setState({
          ...state(),
          ...options,
          show: true,
        });
      },
      clear() {
        setState({
          ...state(),
          show: false,
        });
      },
      get message() {
        return state()?.message;
      },
    });

    const toggle = (show: boolean) => {
      setState({
        ...state(),
        show,
      });
    };

    return <VanToast {...state} onClosed={onClosed} onUpdateShow={toggle} />;
  });

  const instance = {
    open(option: ToastOptions) {
      app.instance.open(option);
    },
    clear() {
      app.instance.clear();
    },
    get message() {
      return app.instance.message;
    },
    set message(value: string) {
      app.instance.open({ message: value });
    },
  };

  return instance;
}

function getInstance() {
  if (!queue.length || allowMultiple) {
    const instance = createInstance();
    queue.push(instance);
  }

  return queue[queue.length - 1];
}

function Toast(options: string | ToastOptions = {}): ToastInstance {
  if (!inBrowser) {
    return {} as any;
  }

  const toast = getInstance();
  const parsedOptions = parseOptions(options);

  toast.open(
    extend(
      {},
      currentOptions,
      defaultOptionsMap.get(parsedOptions.type || currentOptions.type!),
      parsedOptions
    )
  );

  return toast;
}

const createMethod =
  (type: ToastType) =>
  (options: string | ToastOptions): ToastInstance =>
    Toast(extend({ type }, parseOptions(options)));

Toast.loading = createMethod('loading');
Toast.success = createMethod('success');
Toast.fail = createMethod('fail');

Toast.clear = (all?: boolean) => {
  if (queue.length) {
    if (all) {
      queue.forEach((toast) => {
        toast.clear();
      });
      queue = [];
    } else if (!allowMultiple) {
      queue[0].clear();
    } else {
      queue.shift()?.clear();
    }
  }
};

function setDefaultOptions(options: ToastOptions): void;
function setDefaultOptions(type: ToastType, options: ToastOptions): void;
function setDefaultOptions(
  type: ToastType | ToastOptions,
  options?: ToastOptions
) {
  if (typeof type === 'string') {
    defaultOptionsMap.set(type, options!);
  } else {
    extend(currentOptions, type);
  }
}

Toast.setDefaultOptions = setDefaultOptions;

Toast.resetDefaultOptions = (type?: ToastType) => {
  if (typeof type === 'string') {
    defaultOptionsMap.delete(type);
  } else {
    currentOptions = extend({}, defaultOptions);
    defaultOptionsMap.clear();
  }
};

Toast.allowMultiple = (value = true) => {
  allowMultiple = value;
};

export { Toast };
