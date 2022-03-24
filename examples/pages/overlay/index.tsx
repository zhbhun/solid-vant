import { createSignal, type Component } from 'solid-js';
import { Button, Overlay } from 'solid-vant/index';
import { useTranslate } from '../../utils/use-translate';
import DemoBlock from '../../components/DemoBlock';
import './index.less';

const t = useTranslate({
  'zh-CN': {
    showOverlay: '显示遮罩层',
    embeddedContent: '嵌入内容',
  },
  'en-US': {
    showOverlay: 'Show Overlay',
    embeddedContent: 'Embedded Content',
  },
});

const OverlayExample: Component = () => {
  const [show, setShow] = createSignal(false);
  const [showEmbedded, setShowEmbedded] = createSignal(false);
  return (
    <div class="demo-overlay">
      <DemoBlock title={t('basicUsage')}>
        <Button
          type="primary"
          text={t('showOverlay')}
          style="margin-left: 16px"
          onClick={[setShow, true]}
        />
        <Overlay show={show()} onClick={[setShow, false]} />
      </DemoBlock>

      <DemoBlock title={t('embeddedContent')}>
        <Button
          type="primary"
          text={t('embeddedContent')}
          style="margin-left: 16px"
          onClick={[setShowEmbedded, true]}
        />
        <Overlay show={showEmbedded()} onClick={[setShowEmbedded, false]}>
          <div class="wrapper">
            <div class="block" />
          </div>
        </Overlay>
      </DemoBlock>
    </div>
  );
};

export default OverlayExample;
