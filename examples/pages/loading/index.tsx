import { type Component } from 'solid-js';
import { Loading } from 'solid-vant/index';
import { useTranslate } from '../../utils/use-translate';
import DemoBlock from '../../components/DemoBlock';
import './index.less';

const t = useTranslate({
  'zh-CN': {
    type: '加载类型',
    text: '加载文案',
    size: '自定义大小',
    color: '自定义颜色',
    vertical: '垂直排列',
    textColor: '自定义文本颜色',
  },
  'en-US': {
    type: 'Type',
    text: 'Text',
    size: 'Size',
    color: 'Color',
    vertical: 'Vertical',
    textColor: 'Text Color',
  },
});

const LoadingExample: Component = () => {
  return (
    <div class="demo-loading">
      <DemoBlock title={t('type')}>
        <Loading />
        <Loading type="spinner" />
      </DemoBlock>

      <DemoBlock title={t('color')}>
        <Loading color="#1989fa" />
        <Loading type="spinner" color="#1989fa" />
      </DemoBlock>

      <DemoBlock title={t('size')}>
        <Loading size="24" />
        <Loading type="spinner" size="24" />
      </DemoBlock>

      <DemoBlock title={t('text')}>
        <Loading size="24px">{t('loading')}</Loading>
      </DemoBlock>

      <DemoBlock title={t('vertical')}>
        <Loading size="24px" vertical>
          {t('loading')}
        </Loading>
      </DemoBlock>

      <DemoBlock title={t('textColor')}>
        <Loading size="24px" vertical color="#0094ff">
          {t('loading')}
        </Loading>
        <Loading size="24px" vertical textColor="#0094ff">
          {t('loading')}
        </Loading>
      </DemoBlock>
    </div>
  );
};

export default LoadingExample;
