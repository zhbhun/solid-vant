import type { Component } from 'solid-js';
import { For } from 'solid-js/web';
import { Col, Icon, Row } from 'solid-vant/index';
import icons from '@vant/icons';
import { useTranslate } from '../../utils/use-translate';
import DemoBlock from '../../components/DemoBlock';
import './index.scss';

// from https://30secondsofcode.org
function copyToClipboard(str: string) {
  const el = document.createElement('textarea');
  el.value = str;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);

  const selection = document.getSelection();

  if (!selection) {
    return;
  }

  const selected = selection.rangeCount > 0 ? selection.getRangeAt(0) : false;

  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);

  if (selected) {
    selection.removeAllRanges();
    selection.addRange(selected);
  }
}

const copy = (icon: string, option: Record<string, unknown> = {}) => {
  let tag = `<Icon name="${icon}"`;
  if ('dot' in option) {
    tag = `${tag} ${option.dot ? 'dot' : ''}`;
  }
  if ('badge' in option) {
    tag = `${tag} badge="${option.badge}"`;
  }
  if ('color' in option) {
    tag = `${tag} color="${option.color}"`;
  }
  if ('size' in option) {
    tag = `${tag} size="${option.size}"`;
  }
  tag = `${tag} />`;
  copyToClipboard(tag);

  // TODO: ...
  // Notify({
  //   type: 'success',
  //   duration: 1500,
  //   className: 'demo-icon-notify',
  //   message: `${t('copied')}：${tag}`,
  // });
};

const t = useTranslate({
  'zh-CN': {
    title: '图标列表',
    badge: '徽标提示',
    basic: '基础图标',
    copied: '复制成功',
    outline: '线框风格',
    filled: '实底风格',
    demo: '用法示例',
    color: '图标颜色',
    size: '图标大小',
  },
  'en-US': {
    title: 'Icon List',
    badge: 'Show Badge',
    basic: 'Basic',
    copied: 'Copied',
    outline: 'Outline',
    filled: 'Filled',
    demo: 'Demo',
    color: 'Icon Color',
    size: 'Icon Size',
  },
});

const demoIcon = 'chat-o';
const demoImage = 'https://b.yzcdn.cn/vant/icon-demo-1126.png';

const ButtonExample: Component = () => {
  const handleCopy = (
    [icon, option]: [string, Record<string, unknown>],
    event: MouseEvent
  ) => {
    copy(icon, option);
  };
  return (
    <div class="demo-icon">
      <DemoBlock title={t('basicUsage')}>
        <Row>
          <Col span={6}>
            <Icon name={demoIcon} onClick={[handleCopy, [demoIcon]]} />
          </Col>
          <Col span={6}>
            <Icon name={demoImage} onClick={[handleCopy, [demoImage]]} />
          </Col>
        </Row>
      </DemoBlock>
      <DemoBlock title={t('badge')}>
        <Row>
          <Col span={6} onClick={[handleCopy, [demoIcon, { dot: true }]]}>
            <Icon name={demoIcon} dot />
          </Col>
          <Col span={6} onClick={[handleCopy, [demoIcon, { badge: '9' }]]}>
            <Icon name={demoIcon} badge="9" />
          </Col>
          <Col span={6} onClick={[handleCopy, [demoIcon, { badge: '99+' }]]}>
            <Icon name={demoIcon} badge="99+" />
          </Col>
        </Row>
      </DemoBlock>

      <DemoBlock title={t('color')}>
        <Row>
          <Col
            span={6}
            onClick={[handleCopy, [demoIcon, { color: '#1989fa' }]]}
          >
            <Icon name="cart-o" color="#1989fa" />
          </Col>
          <Col
            span={6}
            onClick={[handleCopy, [demoIcon, { color: '#ee0a24' }]]}
          >
            <Icon name="fire-o" color="#ee0a24" />
          </Col>
        </Row>
      </DemoBlock>

      <DemoBlock title={t('size')}>
        <Row>
          <Col span={6} onClick={[handleCopy, [demoIcon, { size: '40' }]]}>
            <Icon name={demoIcon} size="40" />
          </Col>
          <Col span={6} onClick={[handleCopy, [demoIcon, { size: '3rem' }]]}>
            <Icon name={demoIcon} size="3rem" />
          </Col>
        </Row>
      </DemoBlock>

      <DemoBlock title={t('basic')}>
        <Row>
          <For each={icons.basic}>
            {(icon, index) => (
              <Col span={6} onClick={[handleCopy, [icon]]}>
                <Icon name={icon} />
                <span>{icon}</span>
              </Col>
            )}
          </For>
        </Row>
      </DemoBlock>

      <DemoBlock title={t('outline')}>
        <Row>
          <For each={icons.outline}>
            {(icon, index) => (
              <Col span={6} onClick={[handleCopy, [icon]]}>
                <Icon name={icon} />
                <span>{icon}</span>
              </Col>
            )}
          </For>
        </Row>
      </DemoBlock>

      <DemoBlock title={t('filled')}>
        <Row>
          <For each={icons.filled}>
            {(icon, index) => (
              <Col span={6} onClick={[handleCopy, [icon]]}>
                <Icon name={icon} />
                <span>{icon}</span>
              </Col>
            )}
          </For>
        </Row>
      </DemoBlock>
    </div>
  );
};

export default ButtonExample;
