import type { Component } from 'solid-js';
import { For } from 'solid-js/web';
import { Col, Image, Row } from 'solid-vant/index';
import { useTranslate } from '../../utils/use-translate';
import DemoBlock from '../../components/DemoBlock';
import './index.less';

const t = useTranslate({
  'zh-CN': {
    fitMode: '填充模式',
    position: '图片位置',
    round: '圆形图片',
    loading: '加载中提示',
    error: '加载失败提示',
    defaultTip: '默认提示',
    customTip: '自定义提示',
    loadFail: '加载失败',
  },
  'en-US': {
    fitMode: 'Fit Mode',
    position: 'Position',
    round: 'Round',
    loading: 'Loading',
    error: 'Error',
    defaultTip: 'Default Tip',
    customTip: 'Custom Tip',
    loadFail: 'Load failed',
  },
});

const image = 'https://img.yzcdn.cn/vant/cat.jpeg';
const fits = ['contain', 'cover', 'fill', 'none', 'scale-down'] as const;
const positions1 = ['left', 'center', 'right'] as const;
const positions2 = ['top', 'center', 'bottom'] as const;

const ImageExample: Component = () => {
  return (
    <div class="demo-image">
      <DemoBlock title={t('basicUsage')}>
        <Row>
          <Image width={100} height={100} src={image} />
        </Row>
      </DemoBlock>

      <DemoBlock title={t('fitMode')}>
        <Row gutter={20}>
          <For each={fits}>
            {(fit) => (
              <Col span={8}>
                <Image fit={fit} width="100%" height="27vw" src={image} />
                <div class="text">{fit}</div>
              </Col>
            )}
          </For>
        </Row>
      </DemoBlock>
      <DemoBlock title={t('position')}>
        <Row gutter={20}>
          <For each={positions1}>
            {(pos) => (
              <Col span={8}>
                <Image
                  position={pos}
                  width="100%"
                  height="27vw"
                  fit="cover"
                  src={image}
                />
                <div class="text">cover</div>
                <div class="text">{pos}</div>
              </Col>
            )}
          </For>
          <For each={positions2}>
            {(pos) => (
              <Col span={8}>
                <Image
                  position={pos}
                  width="100%"
                  height="27vw"
                  fit="contain"
                  src={image}
                />
                <div class="text">contain</div>
                <div class="text">{pos}</div>
              </Col>
            )}
          </For>
        </Row>
      </DemoBlock>
      <DemoBlock title={t('round')}>
        <Row gutter={20}>
          <For each={fits}>
            {(fit) => (
              <Col span={8}>
                <Image round fit={fit} width="100%" height="27vw" src={image} />
                <div class="text">{fit}</div>
              </Col>
            )}
          </For>
        </Row>
      </DemoBlock>
      <DemoBlock title={t('loading')}>
        <Row gutter={20}>
          <Col span={8}>
            <Image width="100%" height="27vw" />
            <div class="text">{t('defaultTip')}</div>
          </Col>

          <Col span={8}>
            <Image
              width="100%"
              height="27vw"
              renderLoading={() => <div>...</div>}
            />
            <div class="text">{t('customTip')}</div>
          </Col>
        </Row>
      </DemoBlock>
      <DemoBlock title={t('error')}>
        <Row gutter={20}>
          <Col span={8}>
            <Image width="100%" height="27vw" src="http://x" />
            <div class="text">{t('defaultTip')}</div>
          </Col>

          <Col span={8}>
            <Image
              width="100%"
              height="27vw"
              src="http://x"
              renderError={() => t('loadFail')}
            />
            <div class="text">{t('customTip')}</div>
          </Col>
        </Row>
      </DemoBlock>
    </div>
  );
};

export default ImageExample;
