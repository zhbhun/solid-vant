import type { Component } from "solid-js";
import { useTranslate } from "../../utils/use-translate";
import DemoBlock from "../../components/DemoBlock";
import "./index.scss";

const t = useTranslate({
  "zh-CN": {
    hairline: "1px 边框",
    ellipsis: "文字省略",
    animation: "动画",
    toggle: "切换动画",
    text1: "这是一段最多显示一行的文字，后面的内容会省略",
    text2:
      "这是一段最多显示两行的文字，后面的内容会省略。这是一段最多显示两行的文字，后面的内容会省略",
  },
  "en-US": {
    hairline: "Hairline",
    ellipsis: "Text Ellipsis",
    animation: "Animation",
    toggle: "Switch animation",
    text1:
      "This is a paragraph that displays up to one line of text, and the rest of the text will be omitted.",
    text2:
      "This is a paragraph that displays up to two lines of text, and the rest of the text will be omitted.",
  },
});

const StyleExample: Component = () => {
  return (
    <div class="demo-style">
      <DemoBlock title={t("ellipsis")}>
        <div class="van-ellipsis">{t("text1")}</div>
        <div class="van-multi-ellipsis--l2">{t("text2")}</div>
      </DemoBlock>
      <DemoBlock card title={t("hairline")}>
        <div class="van-hairline--top" />
      </DemoBlock>
    </div>
  );
};

export default StyleExample;
