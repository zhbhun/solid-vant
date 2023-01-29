import { createSignal } from 'solid-js';
import { Button, Space } from 'solid-vant/index';
import { useTranslate } from '../../utils/use-translate';
import DemoBlock from '../../components/DemoBlock';
import './index.less';

const t = useTranslate({
  'zh-CN': {
    vertical: '垂直排列',
    customSize: '自定义间距',
    align: '对齐方式',
    wrap: '自动换行',
  },
  'en-US': {
    vertical: 'Vertical',
    customSize: 'Custom Size',
    align: 'Alignment',
    wrap: 'Auto Wrap',
  },
});

export default () => {
  const [align, setAlign] = createSignal('center');
  return (
    <div class="demo-space">
      <DemoBlock title={t('basicUsage')}>
        <Space>
          <Button type="primary">{t('button')}</Button>
          <Button type="primary">{t('button')}</Button>
          <Button type="primary">{t('button')}</Button>
          <Button type="primary">{t('button')}</Button>
        </Space>
      </DemoBlock>

      <DemoBlock title={t('vertical')}>
        <Space direction="vertical" fill>
          <Button type="primary" block>
            {t('button')}
          </Button>
          <Button type="primary" block>
            {t('button')}
          </Button>
          <Button type="primary" block>
            {t('button')}
          </Button>
        </Space>
      </DemoBlock>

      <DemoBlock title={t('customSize')}>
        <Space size="20px" style="margin-bottom: 16px">
          <Button type="primary">{t('button')}</Button>
          <Button type="primary">{t('button')}</Button>
          <Button type="primary">{t('button')}</Button>
        </Space>

        <Space size="3rem">
          <Button type="primary">{t('button')}</Button>
          <Button type="primary">{t('button')}</Button>
          <Button type="primary">{t('button')}</Button>
        </Space>
      </DemoBlock>

      {/* <DemoBlock title={t('align')}>
    <van-radio-group
      v-model="align"
      direction="horizontal"
      style="margin-bottom: 16px"
    >
      <van-radio name="start">start</van-radio>
      <van-radio name="center">center</van-radio>
      <van-radio name="end">end</van-radio>
      <van-radio name="baseline">baseline</van-radio>
    </van-radio-group>
    <Space :align="align" style="padding: 16px; background: #f3f2f5">
      <Button type="primary">{ align }</Button>
      <div style="padding: 40px 20px; background: #fff">Block</div>
    </Space>
  </DemoBlock> */}

      <DemoBlock title={t('wrap')}>
        <Space wrap>
          <Button type="primary" block>
            {t('button')}
          </Button>
          <Button type="primary" block>
            {t('button')}
          </Button>
          <Button type="primary" block>
            {t('button')}
          </Button>
          <Button type="primary" block>
            {t('button')}
          </Button>
          <Button type="primary" block>
            {t('button')}
          </Button>
          <Button type="primary" block>
            {t('button')}
          </Button>
          <Button type="primary" block>
            {t('button')}
          </Button>
          <Button type="primary" block>
            {t('button')}
          </Button>
        </Space>
      </DemoBlock>
    </div>
  );
};
