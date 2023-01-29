import { createSignal } from 'solid-js';
import { Slider, Toast } from 'solid-vant/index';
import { useTranslate } from '../../utils/use-translate';
import DemoBlock from '../../components/DemoBlock';
import './index.less';

const t = useTranslate({
  'zh-CN': {
    text: '当前值：',
    title1: '基础用法',
    title2: '双滑块',
    title3: '指定选择范围',
    title4: '禁用',
    title5: '指定步长',
    vertical: '垂直方向',
    customStyle: '自定义样式',
    customButton: '自定义按钮',
  },
  'en-US': {
    text: 'Current value: ',
    title1: 'Basic Usage',
    title2: 'Dual thumb mode',
    title3: 'Range',
    title4: 'Disabled',
    title5: 'Step size',
    vertical: 'Vertical',
    customStyle: 'Custom Style',
    customButton: 'Custom Button',
  },
});

export default () => {
  const [value1, setValue1] = createSignal(50);
  const [value2, setValue2] = createSignal<[number, number]>([20, 60]);
  const [value3, setValue3] = createSignal(0);
  const [value4, setValue4] = createSignal(50);
  const [value5, setValue5] = createSignal(50);
  const [value6, setValue6] = createSignal(50);
  const [value7, setValue7] = createSignal(50);
  const [value8, setValue8] = createSignal(50);
  const [value9, setValue9] = createSignal<[number, number]>([20, 60]);
  const onChange = (value: any) => Toast(t('text') + value);
  return (
    <div class="demo-slider">
      <DemoBlock title={t('title1')}>
        <Slider value={value1()} onInput={setValue1} onChange={onChange} />
      </DemoBlock>

      <DemoBlock title={t('title2')}>
        <Slider
          range
          value={value2()}
          onInput={setValue2}
          onChange={onChange}
        />
      </DemoBlock>

      <DemoBlock title={t('title3')}>
        <Slider
          value={value3()}
          min={-50}
          max={50}
          onInput={setValue3}
          onChange={onChange}
        />
      </DemoBlock>

      <DemoBlock title={t('title4')}>
        <Slider value={value4()} disabled />
      </DemoBlock>

      <DemoBlock title={t('title5')}>
        <Slider
          value={value5()}
          step={10}
          onInput={setValue5}
          onChange={onChange}
        />
      </DemoBlock>

      <DemoBlock title={t('customStyle')}>
        <Slider
          value={value6()}
          barHeight={4}
          activeColor="#ee0a24"
          onInput={setValue6}
          onChange={onChange}
        />
      </DemoBlock>

      <DemoBlock title={t('customButton')}>
        <Slider
          value={value7()}
          button={({ value }) => {
            return <div class="custom-button">{value}</div>;
          }}
          onInput={setValue7}
          onChange={onChange}
        />
      </DemoBlock>

      <DemoBlock title={t('vertical')}>
        <div style={{ height: '150px', 'padding-left': '30px' }}>
          <Slider
            value={value8()}
            vertical
            onInput={setValue8}
            onChange={onChange}
          />
          <Slider
            value={value9()}
            range
            vertical
            style="margin-left: 100px"
            onInput={setValue9}
            onChange={onChange}
          />
        </div>
      </DemoBlock>
    </div>
  );
};
