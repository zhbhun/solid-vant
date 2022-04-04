import { createSignal, type Component } from 'solid-js';
import { Cell, Switch } from 'solid-vant/index';
import { useTranslate } from '../../utils/use-translate';
import DemoBlock from '../../components/DemoBlock';
import './index.less';

const t = useTranslate({
  'zh-CN': {
    title: '标题',
    confirm: '提醒',
    message: '是否切换开关？',
    withCell: '搭配单元格使用',
    customSize: '自定义大小',
    customColor: '自定义颜色',
    asyncControl: '异步控制',
  },
  'en-US': {
    title: 'Title',
    confirm: 'Confirm',
    message: 'Are you sure to toggle switch?',
    withCell: 'Inside a Cell',
    customSize: 'Custom Size',
    customColor: 'Custom Color',
    asyncControl: 'Async Control',
  },
});

const PopupExample: Component = () => {
  const [checked, setChecked] = createSignal(true);
  const [checked2, setChecked2] = createSignal(true);
  const [checked3, setChecked3] = createSignal(true);
  const [checked4, setChecked4] = createSignal(true);
  const [checked5, setChecked5] = createSignal(true);
  // const onUpdateValue = (checked: boolean) => {
  //   Dialog.confirm({
  //     title: t('title'),
  //     message: t('message'),
  //   }).then(() => {
  //     checked4.value = checked;
  //   });
  // };
  return (
    <div class="demo-switch">
      <DemoBlock title={t('basicUsage')}>
        <Switch value={checked()} onChange={setChecked} />
      </DemoBlock>

      <DemoBlock title={t('disabled')}>
        <Switch value={checked()} disabled onChange={setChecked} />
      </DemoBlock>

      <DemoBlock title={t('loadingStatus')}>
        <Switch value={checked()} loading onChange={setChecked} />
      </DemoBlock>

      <DemoBlock title={t('customSize')}>
        <Switch value={checked2()} size="24px" onChange={setChecked2} />
      </DemoBlock>

      <DemoBlock title={t('customColor')}>
        <Switch
          value={checked3()}
          activeColor="#ee0a24"
          inactiveColor="#dcdee0"
          onChange={setChecked3}
        />
      </DemoBlock>

      {/* <DemoBlock title={t('asyncControl')}>
    <Switch value={checked4()} @update:model-value="onUpdateValue" />
  </DemoBlock> */}

      <DemoBlock title={t('withCell')}>
        <Cell
          center
          title={t('title')}
          rightIcon={
            <Switch value={checked5()} size="24" onChange={setChecked5} />
          }
        ></Cell>
      </DemoBlock>
    </div>
  );
};

export default PopupExample;
