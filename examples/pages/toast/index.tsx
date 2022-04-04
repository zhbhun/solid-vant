import { createSignal, type Component } from 'solid-js';
import { Cell, Toast, type LoadingType } from 'solid-vant/index';
import { useTranslate } from '../../utils/use-translate';
import DemoBlock from '../../components/DemoBlock';

const t = useTranslate({
  'zh-CN': {
    fail: '失败提示',
    text: '提示内容',
    text2: '成功文案',
    text3: '失败文案',
    text4: (second: number) => `倒计时 ${second} 秒`,
    title1: '文字提示',
    title2: '加载提示',
    title3: '成功/失败提示',
    success: '成功提示',
    customIcon: '自定义图标',
    customImage: '自定义图片',
    loadingType: '自定义加载图标',
    positionTop: '顶部展示',
    updateMessage: '动态更新提示',
    positionBottom: '底部展示',
    customPosition: '自定义位置',
  },
  'en-US': {
    fail: 'Fail',
    text: 'Some messages',
    text2: 'Success',
    text3: 'Fail',
    text4: (second: number) => `${second} seconds`,
    title1: 'Text',
    title2: 'Loading',
    title3: 'Success/Fail',
    success: 'Success',
    customIcon: 'Custom Icon',
    customImage: 'Custom Image',
    loadingType: 'Loading Type',
    positionTop: 'Top',
    updateMessage: 'Update Message',
    positionBottom: 'Bottom',
    customPosition: 'Custom Position',
  },
});

const showLoadingToast = (loadingType?: LoadingType) => {
  Toast.loading({
    forbidClick: true,
    message: t('loading'),
    loadingType,
  });
};

const showSuccessToast = () => {
  Toast.success(t('text2'));
};

const showFailToast = () => {
  Toast.fail(t('text3'));
};

const showTopToast = () => {
  Toast({
    message: t('positionTop'),
    position: 'top',
  });
};

const showBottomToast = () => {
  Toast({
    message: t('positionBottom'),
    position: 'bottom',
  });
};

const showIconToast = () => {
  Toast({
    message: t('customIcon'),
    icon: 'like-o',
  });
};

const showImageToast = () => {
  Toast({
    message: t('customImage'),
    icon: 'https://img.yzcdn.cn/vant/logo.png',
  });
};

const showCustomizedToast = () => {
  const toast = Toast.loading({
    duration: 0,
    forbidClick: true,
    message: t('text4', 3),
  });

  let second = 3;
  const timer = setInterval(() => {
    second--;
    if (second) {
      toast.message = t('text4', second);
    } else {
      clearInterval(timer);
      Toast.clear();
    }
  }, 1000);
};

const ToastExample: Component = () => {
  return (
    <div class="demo-popup">
      <DemoBlock card title={t('basicUsage')}>
        <Cell isLink title={t('title1')} onClick={[Toast, t('text')]} />
        <Cell isLink title={t('title2')} onClick={[showLoadingToast] as any} />
        <Cell isLink title={t('success')} onClick={showSuccessToast} />
        <Cell isLink title={t('fail')} onClick={showFailToast} />
      </DemoBlock>

      <DemoBlock card title={t('customIcon')}>
        <Cell isLink title={t('customIcon')} onClick={showIconToast} />
        <Cell isLink title={t('customImage')} onClick={showImageToast} />
        <Cell
          isLink
          title={t('loadingType')}
          onClick={[showLoadingToast, 'spinner']}
        />
      </DemoBlock>

      <DemoBlock card title={t('customPosition')}>
        <Cell isLink title={t('positionTop')} onClick={showTopToast} />
        <Cell isLink title={t('positionBottom')} onClick={showBottomToast} />
      </DemoBlock>

      <DemoBlock card title={t('updateMessage')}>
        <Cell isLink title={t('updateMessage')} onClick={showCustomizedToast} />
      </DemoBlock>
    </div>
  );
};

export default ToastExample;
