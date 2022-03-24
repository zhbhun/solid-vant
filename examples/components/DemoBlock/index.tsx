import type { Component, JSX } from 'solid-js';
import { Match, Show, Switch } from 'solid-js/web';
import './index.less';

export interface DemoBlockProps extends JSX.HTMLAttributes<any> {
  title?: string;
  card?: boolean;
}

const DemoBlock: Component<DemoBlockProps> = (props) => {
  return (
    <div class="van-doc-demo-block">
      <Show when={!!props.title}>
        <h2 class="van-doc-demo-block__title">{props.title}</h2>
      </Show>
      <Switch fallback={props.children}>
        <Match when={props.card}>
          <div class="van-doc-demo-block__card">{props.children}</div>
        </Match>
      </Switch>
    </div>
  );
};

export default DemoBlock;
