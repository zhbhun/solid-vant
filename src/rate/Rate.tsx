import classNames from 'classnames';
import { createMemo, mergeProps, splitProps, type JSX } from 'solid-js';
import { For, Show } from 'solid-js/web';
import {
  addUnit,
  callCustomEventHandler,
  createNamespace,
  preventDefault,
  type CustomEventHandlerUnion,
} from '../utils';
import { useRect, useTouch } from '../hooks';
import { Icon } from '../icon';

type RateStatus = 'full' | 'half' | 'void';

type RateListItem = {
  value: number;
  status: RateStatus;
};

function getRateStatus(
  value: number,
  index: number,
  allowHalf: boolean,
  readonly: boolean
): RateListItem {
  if (value >= index) {
    return { status: 'full', value: 1 };
  }

  if (value + 0.5 >= index && allowHalf && !readonly) {
    return { status: 'half', value: 0.5 };
  }

  if (value + 1 >= index && allowHalf && readonly) {
    const cardinal = 10 ** 10;
    return {
      status: 'half',
      value: Math.round((value - index + 1) * cardinal) / cardinal,
    };
  }

  return { status: 'void', value: 0 };
}

export interface RateProps<V = boolean> {
  size?: number | string;
  icon?: string;
  color?: string;
  count?: number;
  gutter?: number | string;
  readonly?: boolean;
  disabled?: boolean;
  voidIcon?: string;
  allowHalf?: boolean;
  voidColor?: string;
  touchable?: boolean;
  // iconPrefix?: String,
  value?: number;
  disabledColor?: string;
  onChange?: CustomEventHandlerUnion<number>;
}

export const ratePropsKeys: (keyof RateProps)[] = [
  'size',
  'icon',
  'color',
  'count',
  'gutter',
  'readonly',
  'disabled',
  'voidIcon',
  'allowHalf',
  'voidColor',
  'touchable',
  'value',
  'disabledColor',
  'onChange',
];

export const defaultRateProps = {
  count: 5,
  icon: 'star',
  voidIcon: 'star-o',
  touchable: true,
  value: 0,
};

export interface RateHTMLProps
  extends Omit<JSX.HTMLAttributes<any>, 'onChange'>,
    RateProps {}

const [name, bem] = createNamespace('rate');

export function Rate(prop: RateHTMLProps) {
  const [_props, attrs] = splitProps(
    mergeProps(defaultRateProps, prop),
    ratePropsKeys
  );

  const touch = useTouch();

  const itemRefs: HTMLElement[] = [];
  const setItemRefs = (index: number, element: HTMLElement) => {
    itemRefs[index] = element;
  };

  const untouchable = () =>
    _props.readonly || _props.disabled || !_props.touchable;

  const list = createMemo<RateListItem[]>(() =>
    Array(+_props.count)
      .fill('')
      .map((_, i) =>
        getRateStatus(
          _props.value,
          i + 1,
          !!_props.allowHalf,
          !!_props.readonly
        )
      )
  );

  let ranges: Array<{ left: number; score: number }>;

  const updateRanges = () => {
    const rects = itemRefs.map(useRect);

    ranges = [];
    rects.forEach((rect, index) => {
      if (_props.allowHalf) {
        ranges.push(
          { score: index + 0.5, left: rect.left },
          { score: index + 1, left: rect.left + rect.width / 2 }
        );
      } else {
        ranges.push({ score: index + 1, left: rect.left });
      }
    });
  };

  const getScoreByPosition = (x: number) => {
    for (let i = ranges.length - 1; i > 0; i--) {
      if (x > ranges[i].left) {
        return ranges[i].score;
      }
    }
    return _props.allowHalf ? 0.5 : 1;
  };

  const select = (index: number) => {
    if (!_props.disabled && !_props.readonly && index !== _props.value) {
      callCustomEventHandler(_props.onChange, index);
    }
  };

  const onTouchStart = (event: TouchEvent) => {
    if (untouchable()) {
      return;
    }

    touch.start(event);
    updateRanges();
  };

  const onTouchMove = (event: TouchEvent) => {
    if (untouchable()) {
      return;
    }

    touch.move(event);

    if (touch.isHorizontal()) {
      const { clientX } = event.touches[0];
      preventDefault(event);
      select(getScoreByPosition(clientX));
    }
  };

  const onClickItem = (score: number, event: MouseEvent) => {
    updateRanges();
    select(_props.allowHalf ? getScoreByPosition(event.clientX) : score);
  };

  return (
    <div
      {...attrs}
      role="radiogroup"
      class={classNames(
        bem({
          readonly: _props.readonly,
          disabled: _props.disabled,
        }),
        attrs.class
      )}
      tabindex={_props.disabled ? undefined : 0}
      aria-disabled={_props.disabled}
      aria-readonly={_props.readonly}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
    >
      <For each={list()}>
        {(item, index) => (
          <div
            ref={(element: HTMLElement) => setItemRefs(index(), element)}
            role="radio"
            style={
              _props.gutter && index() + 1 !== +_props.count
                ? {
                    'padding-right': addUnit(_props.gutter),
                  }
                : undefined
            }
            class={bem('item')}
            tabindex={_props.disabled ? undefined : 0}
            aria-setsize={_props.count}
            aria-posinset={index() + 1}
            aria-checked={!(item.status === 'void')}
            onClick={[onClickItem, index() + 1]}
          >
            <Icon
              size={_props.size}
              name={item.status === 'full' ? _props.icon : _props.voidIcon}
              class={bem('icon', {
                disabled: _props.disabled,
                full: item.status === 'full',
              })}
              color={
                _props.disabled
                  ? _props.disabledColor
                  : item.status === 'full'
                  ? _props.color
                  : _props.voidColor
              }
            />
            <Show when={_props.allowHalf && item.value > 0 && item.value < 1}>
              <Icon
                size={_props.size}
                style={{ width: item.value + 'em' }}
                name={item.status === 'void' ? _props.voidIcon : _props.icon}
                class={bem('icon', [
                  'half',
                  {
                    disabled: _props.disabled,
                    full: !(item.status === 'void'),
                  },
                ])}
                color={
                  _props.disabled
                    ? _props.disabledColor
                    : item.status === 'void'
                    ? _props.voidColor
                    : _props.color
                }
              />
            </Show>
          </div>
        )}
      </For>
    </div>
  );
}

export default Rate;
