import { createSignal, type Component } from 'solid-js';
import { Rate } from 'solid-vant/index';
import { useTranslate } from '../../utils/use-translate';
import DemoBlock from '../../components/DemoBlock';
import './index.less';

const t = useTranslate({
  'zh-CN': {
    halfStar: '半星',
    disabled: '禁用状态',
    customIcon: '自定义图标',
    customStyle: '自定义样式',
    customCount: '自定义数量',
    readonly: '只读状态',
    readonlyHalfStar: '只读状态小数显示',
    changeEvent: '监听 change 事件',
    toastContent: (value: number) => `当前值：${value}`,
  },
  'en-US': {
    halfStar: 'Half Star',
    disabled: 'Disabled',
    customIcon: 'Custom Icon',
    customStyle: 'Custom Style',
    customCount: 'Custom Count',
    readonly: 'Readonly',
    readonlyHalfStar: 'Readonly Half Star',
    changeEvent: 'Change Event',
    toastContent: (value: number) => `current value：${value}`,
  },
});

const RateExample: Component = () => {
  const [value1, setValue1] = createSignal(3);
  const [value2, setValue2] = createSignal(3);
  const [value3, setValue3] = createSignal(3);
  const [value4, setValue4] = createSignal(2.5);
  const [value5, setValue5] = createSignal(4);
  const [value6, setValue6] = createSignal(3);
  const [value7, setValue7] = createSignal(3.3);
  const [value8, setValue8] = createSignal(2);
  return (
    <div class="demo-rate">
      <DemoBlock title={t('basicUsage')}>
        <Rate value={value1()} onChange={setValue1} />
      </DemoBlock>

      <DemoBlock title={t('customIcon')}>
        <Rate
          value={value2()}
          onChange={setValue2}
          icon="like"
          voidIcon="like-o"
        />
      </DemoBlock>

      <DemoBlock title={t('customStyle')}>
        <Rate
          value={value3()}
          onChange={setValue3}
          size={25}
          color="#ffd21e"
          voidIcon="star"
          voidColor="#eee"
        />
      </DemoBlock>

      <DemoBlock title={t('halfStar')}>
        <Rate value={value4()} onChange={setValue4} allowHalf />
      </DemoBlock>

      <DemoBlock title={t('customCount')}>
        <Rate value={value5()} onChange={setValue5} count={6} />
      </DemoBlock>

      <DemoBlock title={t('disabled')}>
        <Rate value={value6()} onChange={setValue6} disabled />
      </DemoBlock>

      <DemoBlock title={t('readonly')}>
        <Rate value={value6()} onChange={setValue6} readonly />
      </DemoBlock>

      <DemoBlock title={t('readonlyHalfStar')}>
        <Rate value={value7()} onChange={setValue7} readonly allowHalf />
      </DemoBlock>

      <DemoBlock title={t('changeEvent')}>
        <Rate value={value8()} onChange={setValue8} />
      </DemoBlock>
    </div>
  );
};

export default RateExample;
