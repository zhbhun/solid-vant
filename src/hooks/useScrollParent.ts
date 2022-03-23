import { createSignal, onMount, type Accessor } from 'solid-js';
import { inBrowser } from '../utils';

type ScrollElement = HTMLElement | Window;

const overflowScrollReg = /scroll|auto/i;
const defaultRoot = inBrowser ? window : undefined;

function isElement(node: Element) {
  const ELEMENT_NODE_TYPE = 1;
  return (
    node.tagName !== 'HTML' &&
    node.tagName !== 'BODY' &&
    node.nodeType === ELEMENT_NODE_TYPE
  );
}

// https://github.com/youzan/vant/issues/3823
export function getScrollParent(
  el: Element,
  root: ScrollElement | undefined = defaultRoot
) {
  let node = el;

  while (node && node !== root && isElement(node)) {
    const { overflowY } = window.getComputedStyle(node);
    if (overflowScrollReg.test(overflowY)) {
      return node;
    }
    node = node.parentNode as Element;
  }

  return root;
}

export function useScrollParent(
  el: Accessor<Element | undefined>,
  root: ScrollElement | undefined = defaultRoot
) {
  const [scrollParent, setScrollParent] = createSignal<Element | Window>();

  onMount(() => {
    const currentEl = el();
    if (currentEl) {
      // TODO: fix wrong type
      // @ts-ignore
      setScrollParent(getScrollParent(currentEl, root));
    }
  });

  return scrollParent;
}
