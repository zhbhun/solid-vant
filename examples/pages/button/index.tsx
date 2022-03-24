import type { Component } from "solid-js";
import { Button } from "solid-vant/index";
import { useTranslate } from "../../utils/use-translate";
import DemoBlock from "../../components/DemoBlock";
import "./index.less";

const t = useTranslate({
  "zh-CN": {
    type: "按钮类型",
    size: "按钮尺寸",
    icon: "图标按钮",
    loading: "加载状态",
    shape: "按钮形状",
    default: "默认按钮",
    primary: "主要按钮",
    success: "成功按钮",
    danger: "危险按钮",
    warning: "警告按钮",
    large: "大号按钮",
    normal: "普通按钮",
    small: "小型按钮",
    mini: "迷你按钮",
    plain: "朴素按钮",
    square: "方形按钮",
    round: "圆形按钮",
    hairline: "细边框",
    hairlineButton: "细边框按钮",
    loadingText: "加载中...",
    router: "页面导航",
    urlRoute: "URL 跳转",
    vueRoute: "路由跳转",
    customColor: "自定义颜色",
    pure: "单色按钮",
    gradient: "渐变色按钮",
    blockElement: "块级元素",
  },
  "en-US": {
    type: "Type",
    size: "Size",
    icon: "Icon",
    loading: "Loading",
    shape: "Shape",
    default: "Default",
    primary: "Primary",
    success: "Success",
    danger: "Danger",
    warning: "Warning",
    large: "Large",
    normal: "Normal",
    small: "Small",
    mini: "Mini",
    plain: "Plain",
    square: "Square",
    round: "Round",
    hairline: "Hairline",
    hairlineButton: "Hairline",
    loadingText: "Loading...",
    router: "Router",
    urlRoute: "URL",
    vueRoute: "Vue Router",
    customColor: "Custom Color",
    pure: "Pure",
    gradient: "Gradient",
    blockElement: "Block Element",
  },
});

const ButtonExample: Component = () => {
  return (
    <div class="demo-button">
      <DemoBlock title={t("type")}>
        <div class="demo-button-row">
          <Button type="primary">{t("primary")}</Button>
          <Button type="success">{t("success")}</Button>
          <Button type="default">{t("default")}</Button>
        </div>
        <Button type="danger">{t("danger")}</Button>
        <Button type="warning">{t("warning")}</Button>
      </DemoBlock>
      <DemoBlock title={t("plain")}>
        <Button plain type="primary" text={t("plain")} />
        <Button plain type="success" text={t("plain")} />
      </DemoBlock>
      <DemoBlock title={t("hairline")}>
        <Button plain hairline type="primary" text={t("hairlineButton")} />
        <Button plain hairline type="success" text={t("hairlineButton")} />
      </DemoBlock>

      <DemoBlock title={t("disabled")}>
        <Button disabled type="primary" text={t("disabled")} />
        <Button disabled type="success" text={t("disabled")} />
      </DemoBlock>

      <DemoBlock title={t("loadingStatus")}>
        <Button loading type="primary" />
        <Button loading type="primary" loading-type="spinner" />
        <Button loading loading-text={t("loadingText")} type="success" />
      </DemoBlock>

      <DemoBlock title={t("shape")}>
        <Button type="primary" square text={t("square")} />
        <Button type="success" round text={t("round")} />
      </DemoBlock>

      <DemoBlock title={t("icon")}>
        <Button type="primary" icon="plus" />
        <Button type="primary" icon="plus" text={t("button")} />
        <Button
          plain
          type="primary"
          icon="https://img.yzcdn.cn/vant/user-active.png"
          text={t("button")}
        />
      </DemoBlock>

      <DemoBlock title={t("size")}>
        <Button type="primary" size="large">
          {t("large")}
        </Button>
        <Button type="primary" size="normal">
          {t("normal")}
        </Button>
        <Button type="primary" size="small">
          {t("small")}
        </Button>
        <Button type="primary" size="mini">
          {t("mini")}
        </Button>
      </DemoBlock>

      <DemoBlock title={t("blockElement")}>
        <Button type="primary" block>
          {t("blockElement")}
        </Button>
      </DemoBlock>

      <DemoBlock title={t("router")}>
        <Button
          text={t("urlRoute")}
          type="primary"
        />
        <Button text={t("vueRoute")} type="primary" />
      </DemoBlock>

      <DemoBlock title={t("customColor")}>
        <Button color="#7232dd" text={t("pure")} />
        <Button plain color="#7232dd" text={t("pure")} />
        <Button
          color="linear-gradient(to right, #ff6034, #ee0a24)"
          text={t("gradient")}
        />
      </DemoBlock>
    </div>
  );
};

export default ButtonExample;
