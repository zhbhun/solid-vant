import type { Component } from 'solid-js';
import { Col, Row } from 'solid-vant/index';
import { useTranslate } from '../../utils/use-translate';
import DemoBlock from '../../components/DemoBlock';
import './index.less';

const t = useTranslate({
  'zh-CN': {
    title2: '在列元素之间增加间距',
    justify: '对齐方式',
  },
  'en-US': {
    title2: 'Column Spacing',
    justify: 'Justify Content',
  },
});

const LayoutExample: Component = () => {
  return (
    <div class="demo-col">
      <DemoBlock title={t('basicUsage')}>
        <Row>
          <Col span={8}>span: 8</Col>
          <Col span={8}>span: 8</Col>
          <Col span={8}>span: 8</Col>
        </Row>

        <Row>
          <Col span={4}>span: 4</Col>
          <Col span={10} offset={4}>
            {' '}
            offset: 4, span: 10{' '}
          </Col>
        </Row>

        <Row>
          <Col offset={12} span={12}>
            {' '}
            offset: 12, span: 12{' '}
          </Col>
        </Row>
      </DemoBlock>

      <DemoBlock title={t('title2')}>
        <Row gutter={20}>
          <Col span={8}>span: 8</Col>
          <Col span={8}>span: 8</Col>
          <Col span={8}>span: 8</Col>
        </Row>
      </DemoBlock>

      <DemoBlock title={t('justify')}>
        <Row justify="center">
          <Col span={6}>span: 6</Col>
          <Col span={6}>span: 6</Col>
          <Col span={6}>span: 6</Col>
        </Row>

        <Row justify="end">
          <Col span={6}>span: 6</Col>
          <Col span={6}>span: 6</Col>
          <Col span={6}>span: 6</Col>
        </Row>

        <Row justify="space-between">
          <Col span={6}>span: 6</Col>
          <Col span={6}>span: 6</Col>
          <Col span={6}>span: 6</Col>
        </Row>

        <Row justify="space-around">
          <Col span={6}>span: 6</Col>
          <Col span={6}>span: 6</Col>
          <Col span={6}>span: 6</Col>
        </Row>
      </DemoBlock>
    </div>
  );
};

export default LayoutExample;
