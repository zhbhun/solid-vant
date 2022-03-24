import type { Component } from 'solid-js';
import { Button, ConfigProvider } from 'solid-vant/index';
import { useTranslate } from '../../utils/use-translate';
import DemoBlock from '../../components/DemoBlock';
import './index.less';

const t = useTranslate({
  'zh-CN': {
    rate: '评分',
    slider: '滑块',
    switch: '开关',
    submit: '提交',
    customTheme: '定制主题',
    defaultTheme: '默认主题',
  },
  'en-US': {
    rate: 'Rate',
    slider: 'Slider',
    switch: 'Switch',
    submit: 'Submit',
    customTheme: 'Custom Theme',
    defaultTheme: 'DefaultTheme',
  },
});

const themeVars = {
  rateIconFullColor: '#07c160',
  sliderBarHeight: '4px',
  sliderButtonWidth: '20px',
  sliderButtonHeight: '20px',
  sliderActiveBackgroundColor: '#07c160',
  buttonPrimaryBorderColor: '#07c160',
  buttonPrimaryBackgroundColor: '#07c160',
};

const ButtonExample: Component = () => {
  return (
    <div class="demo-config-provider">
      <DemoBlock title={t('defaultTheme')}>
        <Button round block type="primary" native-type="submit">
          {t('submit')}
        </Button>
      </DemoBlock>
      <DemoBlock title={t('customTheme')}>
        <ConfigProvider themeVars={themeVars}>
          <Button round block type="primary" native-type="submit">
            {t('submit')}
          </Button>
        </ConfigProvider>
      </DemoBlock>
    </div>
  );
};

export default ButtonExample;
