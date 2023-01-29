import {
  type Component,
  type JSX,
  createMemo,
  createSignal,
  mergeProps,
  splitProps,
} from 'solid-js';
import {
  type CustomEventHandlerUnion,
  addNumber,
  addUnit,
  callCustomEventHandler,
  callEventHandler,
  clamp,
  createNamespace,
  getSizeStyle,
  isSameValue,
  preventDefault,
  stopPropagation,
  mergeStyles,
} from '../utils';
import { useEventListener, useRect, useTouch } from '../hooks';

type NumberRange = [number, number];

type SliderValue = number | NumberRange;

export interface SliderProps
  extends Omit<JSX.HTMLAttributes<any>, 'onInput' | 'onChange'> {
  min?: number;
  max?: number;
  step?: number;
  range?: boolean;
  reverse?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  vertical?: boolean;
  barHeight?: number;
  buttonSize?: number;
  activeColor?: string;
  inactiveColor?: string;
  value?: SliderValue;
  button?(props: { value: number }): JSX.Element;
  leftButton?(props: { value: number }): JSX.Element;
  rightButton?(props: { value: number }): JSX.Element;
  onInput?: CustomEventHandlerUnion<SliderValue>;
  onChange?: CustomEventHandlerUnion<SliderValue>;
}

export const defaultSliderProps = {
  min: 0,
  max: 100,
  step: 1,
  range: false,
  reverse: false,
  disabled: false,
  readonly: false,
  vertical: false,
  value: 0,
};

const [, bem] = createNamespace('slider');

export const Slider: Component<SliderProps> = (props) => {
  const [$props, $attrs] = splitProps(mergeProps(defaultSliderProps, props), [
    'min',
    'max',
    'step',
    'range',
    'reverse',
    'disabled',
    'readonly',
    'vertical',
    'barHeight',
    'buttonSize',
    'activeColor',
    'inactiveColor',
    'value',
    'button',
    'leftButton',
    'rightButton',
    'onInput',
    'onChange',
  ]);

  let buttonIndex: 0 | 1;
  let current: SliderValue;
  let startValue: SliderValue;

  let [root, setRoot] = createSignal<HTMLDivElement>();
  let [slider, setSlider] = createSignal<HTMLDivElement>();
  const [dragStatus, setDragStatus] = createSignal<'start' | 'dragging' | ''>(
    ''
  );
  const touch = useTouch();

  const scope = createMemo(() => $props.max - $props.min);

  const wrapperStyle = createMemo(() => {
    const crossAxis = $props.vertical ? 'width' : 'height';
    return mergeStyles(
      {
        background: $props.inactiveColor,
        [crossAxis]: addUnit($props.barHeight),
      },
      $attrs.style
    );
  });

  const isRange = (val: unknown): val is NumberRange =>
    $props.range && Array.isArray(val);

  // 计算选中条的长度百分比
  const calcMainAxis = () => {
    const { value, min } = $props;
    if (isRange(value)) {
      return `${((value[1] - value[0]) * 100) / scope()}%`;
    }
    return `${((value - Number(min)) * 100) / scope()}%`;
  };

  // 计算选中条的开始位置的偏移量
  const calcOffset = () => {
    const { value, min } = $props;
    if (isRange(value)) {
      return `${((value[0] - Number(min)) * 100) / scope()}%`;
    }
    return '0%';
  };

  const barStyle = createMemo(() => {
    const mainAxis = $props.vertical ? 'height' : 'width';
    const style: JSX.CSSProperties = {
      [mainAxis]: calcMainAxis(),
      background: $props.activeColor,
    };

    if (dragStatus()) {
      style.transition = 'none';
    }

    const getPositionKey = () => {
      if ($props.vertical) {
        return $props.reverse ? 'bottom' : 'top';
      }
      return $props.reverse ? 'right' : 'left';
    };

    style[getPositionKey()] = calcOffset();

    return style;
  });

  const format = (value: number) => {
    const min = +$props.min;
    const max = +$props.max;
    const step = +$props.step;

    const diff = Math.round((clamp(value, min, max) - min) / step) * step;
    return addNumber(min, diff);
  };

  const handleRangeValue = (value: NumberRange) => {
    // 设置默认值
    const left = value[0] ?? Number($props.min);
    const right = value[1] ?? Number($props.max);
    // 处理两个滑块重叠之后的情况
    return left > right ? [right, left] : [left, right];
  };

  const updateValue = (value: SliderValue, end?: boolean) => {
    if (isRange(value)) {
      value = handleRangeValue(value).map(format) as NumberRange;
    } else {
      value = format(value);
    }

    if (!isSameValue(value, $props.value)) {
      callCustomEventHandler($props.onInput, value);
    }

    if (end && !isSameValue(value, startValue)) {
      callCustomEventHandler($props.onChange, value);
    }
  };

  const onClick = (event: MouseEvent) => {
    event.stopPropagation();

    if ($props.disabled || $props.readonly) {
      return;
    }

    const { min, reverse, vertical, value: currValue } = $props;
    const rect = useRect(root);

    const getDelta = () => {
      if (vertical) {
        if (reverse) {
          return rect.bottom - event.clientY;
        }
        return event.clientY - rect.top;
      }
      if (reverse) {
        return rect.right - event.clientX;
      }
      return event.clientX - rect.left;
    };

    const total = vertical ? rect.height : rect.width;
    const value = Number(min) + (getDelta() / total) * scope();

    if (isRange(currValue)) {
      const [left, right] = currValue;
      const middle = (left + right) / 2;

      if (value <= middle) {
        updateValue([value, right], true);
      } else {
        updateValue([left, value], true);
      }
    } else {
      updateValue(value, true);
    }
  };

  const onTouchStart = (event: TouchEvent) => {
    if ($props.disabled || $props.readonly) {
      return;
    }

    touch.start(event);
    current = $props.value;

    if (isRange(current)) {
      startValue = current.map(format) as NumberRange;
    } else {
      startValue = format(current);
    }

    setDragStatus('start');
  };

  const onTouchMove = (event: TouchEvent) => {
    if ($props.disabled || $props.readonly) {
      return;
    }

    if (dragStatus() === 'start') {
      callEventHandler($attrs.onDragStart, event);
    }

    preventDefault(event, true);
    touch.move(event);
    setDragStatus('dragging');

    const rect = useRect(root);
    const delta = $props.vertical ? touch.deltaY() : touch.deltaX();
    const total = $props.vertical ? rect.height : rect.width;

    let diff = (delta / total) * scope();
    if ($props.reverse) {
      diff = -diff;
    }

    if (isRange(startValue)) {
      const index = $props.reverse ? 1 - buttonIndex : buttonIndex;
      (current as NumberRange)[index] = startValue[index] + diff;
    } else {
      current = startValue + diff;
    }
    updateValue(current);
  };

  const onTouchEnd = (event: TouchEvent) => {
    if ($props.disabled || $props.readonly) {
      return;
    }

    if (dragStatus() === 'dragging') {
      updateValue(current, true);
      callEventHandler($attrs.onDragEnd, event);
    }

    setDragStatus('');
  };

  const getButtonClassName = (index?: 0 | 1) => {
    if (typeof index === 'number') {
      const position = ['left', 'right'];
      return bem(`button-wrapper`, position[index]);
    }
    return bem('button-wrapper', $props.reverse ? 'left' : 'right');
  };

  const renderButtonValue = (index?: 0 | 1) => {
    return typeof index === 'number'
      ? ($props.value as NumberRange)[index]
      : ($props.value as number);
  };

  const renderButtonContent = (index?: 0 | 1) => {
    if (typeof index === 'number') {
      const slot = $props[index === 0 ? 'leftButton' : 'rightButton'];
      if (slot) {
        return slot({ value: renderButtonValue() });
      }
    }

    if ($props.button) {
      return $props.button({ value: renderButtonValue() });
    }

    return (
      <div class={bem('button')} style={getSizeStyle($props.buttonSize)} />
    );
  };

  const renderButton = (index?: 0 | 1) => {
    return (
      <div
        ref={setSlider}
        role="slider"
        class={getButtonClassName(index)}
        tabindex={$props.disabled ? undefined : 0}
        aria-valuemin={$props.min}
        aria-valuenow={renderButtonValue(index)}
        aria-valuemax={$props.max}
        aria-disabled={$props.disabled || undefined}
        aria-readonly={$props.readonly || undefined}
        aria-orientation={$props.vertical ? 'vertical' : 'horizontal'}
        onTouchStart={(event) => {
          if (typeof index === 'number') {
            // save index of current button
            buttonIndex = index;
          }
          onTouchStart(event);
        }}
        onTouchEnd={onTouchEnd}
        onTouchCancel={onTouchEnd}
        onClick={stopPropagation}
      >
        {renderButtonContent(index)}
      </div>
    );
  };

  // format initial value
  updateValue($props.value);

  // useCustomFieldValue(() => $props.modelValue);

  // useEventListener will set passive to `false` to eliminate the warning of Chrome
  useEventListener('touchmove', onTouchMove, {
    target: root,
  });

  return (
    <div
      {...$attrs}
      ref={setRoot}
      style={wrapperStyle()}
      class={bem({
        vertical: $props.vertical,
        disabled: $props.disabled,
      })}
      onClick={onClick}
    >
      <div class={bem('bar')} style={barStyle()}>
        {$props.range ? [renderButton(0), renderButton(1)] : renderButton()}
      </div>
    </div>
  );
};

export default Slider;
