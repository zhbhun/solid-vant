import type { Component, JSX } from 'solid-js';
import { createMemo, mergeProps, splitProps } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import { kebabCase, mergeStyles } from '../utils';

export interface ImageProps extends JSX.HTMLAttributes<any> {
  tag?: string;
  themeVars?: Record<string, string | number>;
}

export const defaultImageProps = {
  tag: 'div',
};

function mapThemeVarsToCSSVars(themeVars: Record<string, string | number>) {
  const cssVars: Record<string, string | number> = {};
  Object.keys(themeVars).forEach((key) => {
    cssVars[`--van-${kebabCase(key)}`] = themeVars[key];
  });
  return cssVars;
}

export const ConfigProvider: Component<ImageProps> = (props) => {
  const [_props, attrs] = splitProps(mergeProps(defaultImageProps, props), [
    'tag',
    'themeVars',
  ]);
  const style = createMemo<JSX.CSSProperties>(() => {
    if (_props.themeVars) {
      return mergeStyles(mapThemeVarsToCSSVars(props.themeVars), attrs.style);
    }
    return undefined;
  });

  return () => (
    <Dynamic component={_props.tag} {...attrs} style={style()}>
      {attrs.children}
    </Dynamic>
  );
};

export default ConfigProvider;
