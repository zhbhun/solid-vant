import type { Component } from 'solid-js';
import { Cell, CellGroup, Icon } from 'solid-vant/index';
import { useTranslate } from '../../utils/use-translate';
import DemoBlock from '../../components/DemoBlock';
import './index.less';

const t = useTranslate({
  'zh-CN': {
    cell: '单元格',
    group: '分组',
    router: '页面导航',
    urlRoute: 'URL 跳转',
    vueRoute: '路由跳转',
    useSlots: '使用插槽',
    showIcon: '展示图标',
    showArrow: '展示箭头',
    largeSize: '单元格大小',
    valueOnly: '只设置 value',
    groupTitle: '分组标题',
    insetGrouped: '卡片风格',
    verticalCenter: '垂直居中',
  },
  'en-US': {
    cell: 'Cell title',
    group: 'Group',
    router: 'Router',
    urlRoute: 'URL',
    vueRoute: 'Vue Router',
    useSlots: 'Use Slots',
    showIcon: 'Left Icon',
    showArrow: 'Link',
    largeSize: 'Size',
    valueOnly: 'Value only',
    groupTitle: 'Group Title',
    insetGrouped: 'Inset Grouped',
    verticalCenter: 'Vertical center',
  },
});

const CellExample: Component = () => {
  return (
    <div class="demo-cell">
      <DemoBlock title={t('basicUsage')}>
        <CellGroup>
          <Cell title={t('cell')} value={t('content')} />
          <Cell title={t('cell')} value={t('content')} label={t('desc')} />
        </CellGroup>
      </DemoBlock>

      <DemoBlock title={t('insetGrouped')}>
        <CellGroup inset>
          <Cell title={t('cell')} value={t('content')} />
          <Cell title={t('cell')} value={t('content')} label={t('desc')} />
        </CellGroup>
      </DemoBlock>

      <DemoBlock title={t('largeSize')}>
        <Cell title={t('cell')} value={t('content')} size="large" />
        <Cell
          title={t('cell')}
          value={t('content')}
          size="large"
          label={t('desc')}
        />
      </DemoBlock>

      <DemoBlock title={t('showIcon')}>
        <Cell title={t('cell')} value={t('content')} icon="location-o" />
      </DemoBlock>

      <DemoBlock title={t('valueOnly')}>
        <Cell value={t('content')} />
      </DemoBlock>

      <DemoBlock title={t('showArrow')}>
        <Cell title={t('cell')} isLink />
        <Cell title={t('cell')} isLink value={t('content')} />
        <Cell
          title={t('cell')}
          isLink
          arrow-direction="down"
          value={t('content')}
        />
      </DemoBlock>

      <DemoBlock title={t('router')}>
        <Cell title={t('urlRoute')} isLink />
        <Cell title={t('vueRoute')} isLink />
      </DemoBlock>

      <DemoBlock title={t('groupTitle')}>
        <CellGroup title={`${t('group')} 1`}>
          <Cell title={t('cell')} value={t('content')} />
        </CellGroup>
        <CellGroup title={`${t('group')} 2`}>
          <Cell title={t('cell')} value={t('content')} />
        </CellGroup>
      </DemoBlock>

      <DemoBlock title={t('useSlots')}>
        <Cell
          value={t('content')}
          isLink
          title={
            <>
              <span class="custom-title">{t('cell')}</span>
              {/* <van-tag type="danger">{ t('tag') }}</van-tag> */}
            </>
          }
        />

        <Cell
          icon="shop-o"
          title={t('cell')}
          rightIcon={<Icon name="search" class="search-icon" />}
        ></Cell>
      </DemoBlock>

      <DemoBlock title={t('verticalCenter')}>
        <Cell center title={t('cell')} value={t('content')} label={t('desc')} />
      </DemoBlock>
    </div>
  );
};

export default CellExample;
