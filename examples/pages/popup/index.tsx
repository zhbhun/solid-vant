import { createSignal, type Component } from 'solid-js';
import { Cell, Popup } from 'solid-vant/index';
import { useTranslate } from '../../utils/use-translate';
import DemoBlock from '../../components/DemoBlock';
import './index.scss';

const t = useTranslate({
  'zh-CN': {
    position: '弹出位置',
    buttonBasic: '展示弹出层',
    buttonTop: '顶部弹出',
    buttonBottom: '底部弹出',
    buttonLeft: '左侧弹出',
    buttonRight: '右侧弹出',
    teleport: '指定挂载节点',
    roundCorner: '圆角弹窗',
    closeIcon: '关闭图标',
    customCloseIcon: '自定义图标',
    customIconPosition: '图标位置',
  },
  'en-US': {
    position: 'Position',
    buttonBasic: 'Show Popup',
    buttonTop: 'From Top',
    buttonBottom: 'From Bottom',
    buttonLeft: 'From Left',
    buttonRight: 'From Right',
    teleport: 'Get Container',
    roundCorner: 'Round Corner',
    closeIcon: 'Close Icon',
    customCloseIcon: 'Custom Icon',
    customIconPosition: 'Icon Position',
  },
});
const PopupExample: Component = () => {
  const [showBasic, setShowBasic] = createSignal(false);
  const [showTop, setShowTop] = createSignal(false);
  const [showBottom, setShowBottom] = createSignal(false);
  const [showLeft, setShowLeft] = createSignal(false);
  const [showRight, setShowRight] = createSignal(false);
  const [showCloseIcon, setShowCloseIcon] = createSignal(false);
  const [showRoundCorner, setShowRoundCorner] = createSignal(false);
  const [showGetContainer, setShowGetContainer] = createSignal(false);
  const [showCustomCloseIcon, setShowCustomCloseIcon] = createSignal(false);
  const [showCustomIconPosition, setShowCustomIconPosition] =
    createSignal(false);
  return (
    <div class="demo-popup">
      <DemoBlock card title={t('basicUsage')}>
        <Cell title={t('buttonBasic')} isLink onClick={[setShowBasic, true]} />
        <Popup
          show={showBasic()}
          style="padding: 30px 50px"
          onClose={[setShowBasic, false]}
        >
          {t('content')}
        </Popup>
      </DemoBlock>

      <DemoBlock card title={t('position')}>
        <Cell title={t('buttonTop')} isLink onClick={[setShowTop, true]} />
        <Cell
          title={t('buttonBottom')}
          isLink
          onClick={[setShowBottom, true]}
        />
        <Cell title={t('buttonLeft')} isLink onClick={[setShowLeft, true]} />
        <Cell title={t('buttonRight')} isLink onClick={[setShowRight, true]} />

        <Popup
          show={showTop()}
          position="top"
          style="height: 30%"
          onClose={[setShowTop, false]}
        />
        <Popup
          show={showBottom()}
          position="bottom"
          style="height: 30%"
          onClose={[setShowBottom, false]}
        />
        <Popup
          show={showLeft()}
          position="left"
          style="width: 30%; height: 100%"
          onClose={[setShowLeft, false]}
        />
        <Popup
          show={showRight()}
          position="right"
          style="width: 30%; height: 100%"
          onClose={[setShowRight, false]}
        />
      </DemoBlock>

      <DemoBlock card title={t('closeIcon')}>
        <Cell
          title={t('closeIcon')}
          isLink
          onClick={[setShowCloseIcon, true]}
        />
        <Cell
          title={t('customCloseIcon')}
          isLink
          onClick={[setShowCustomCloseIcon, true]}
        />
        <Cell
          title={t('customIconPosition')}
          isLink
          onClick={[setShowCustomIconPosition, true]}
        />

        <Popup
          show={showCloseIcon()}
          closeable
          position="bottom"
          style="height: 30%"
          onClose={[setShowCloseIcon, false]}
        />
        <Popup
          show={showCustomCloseIcon()}
          closeable
          close-icon="close"
          position="bottom"
          style="height: 30%"
          onClose={[setShowCustomCloseIcon, false]}
        />
        <Popup
          show={showCustomIconPosition()}
          closeable
          close-icon-position="top-left"
          position="bottom"
          style="height: 30%"
          onClose={[setShowCustomIconPosition, false]}
        />
      </DemoBlock>

      <DemoBlock card title={t('roundCorner')}>
        <Cell
          title={t('roundCorner')}
          isLink
          onClick={[setShowRoundCorner, true]}
        />
        <Popup
          show={showRoundCorner()}
          round
          position="bottom"
          style="height: 30%"
          onClose={[setShowRoundCorner, false]}
        />
      </DemoBlock>

      <DemoBlock card title={t('teleport')}>
        <Cell
          title={t('teleport')}
          isLink
          onClick={[setShowGetContainer, true]}
        />
        <Popup
          show={showGetContainer()}
          teleport={document.body}
          style="padding: 30px 50px"
          onClose={[setShowGetContainer, false]}
        />
      </DemoBlock>
    </div>
  );
};

export default PopupExample;
