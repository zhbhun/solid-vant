import type { Component } from "solid-js";
import { Badge } from "solid-vant/index";
import { useTranslate } from "../../utils/use-translate";
import DemoBlock from "../../components/DemoBlock";
import "./index.less";

const t = useTranslate({
  "zh-CN": {
    max: "最大值",
    standalone: "独立展示",
    customColor: "自定义颜色",
    customContent: "自定义徽标内容",
    customPosition: "自定义徽标位置",
  },
  "en-US": {
    max: "Max",
    standalone: "Standalone",
    customColor: "Custom Color",
    customContent: "Custom Content",
    customPosition: "Custom Position",
  },
});

const BadgeExample: Component = () => {
  return (
    <div class="demo-badge">
      <DemoBlock title={t("basicUsage")}>
        <Badge content="5">
          <div class="child" />
        </Badge>
        <Badge content="10">
          <div class="child" />
        </Badge>
        <Badge content="Hot">
          <div class="child" />
        </Badge>
        <Badge dot>
          <div class="child" />
        </Badge>
      </DemoBlock>

      <DemoBlock title={t("max")}>
        <Badge content="20" max="9">
          <div class="child" />
        </Badge>
        <Badge content="50" max="20">
          <div class="child" />
        </Badge>
        <Badge content="200" max="99">
          <div class="child" />
        </Badge>
      </DemoBlock>

      <DemoBlock title={t("customColor")}>
        <Badge content="5" color="#1989fa">
          <div class="child" />
        </Badge>
        <Badge content="10" color="#1989fa">
          <div class="child" />
        </Badge>
        <Badge dot color="#1989fa">
          <div class="child" />
        </Badge>
      </DemoBlock>

      <DemoBlock title={t("customContent")}>
        <Badge content={<i>success</i>}>
          <div class="child" />
        </Badge>
        <Badge content={<i>cross</i>}>
          <div class="child" />
        </Badge>
        <Badge content={<i>down</i>}>
          <div class="child" />
        </Badge>
      </DemoBlock>

      <DemoBlock title={t("customPosition")}>
        <Badge content="10" position="top-left">
          <div class="child" />
        </Badge>
        <Badge content="10" position="bottom-left">
          <div class="child" />
        </Badge>
        <Badge content="10" position="bottom-right">
          <div class="child" />
        </Badge>
      </DemoBlock>

      <DemoBlock title={t("standalone")}>
        <Badge content="20" style="margin-left: 16px" />
        <Badge content={200} max={99} style="margin-left: 16px" />
      </DemoBlock>
    </div>
  );
};

export default BadgeExample;
