import type { JSX } from "solid-js";
import { isDef } from "./validate";

export type Argument = undefined | string | JSX.CSSProperties | Argument[];

export function mergeStyles(...args: Argument[]): JSX.CSSProperties {
  const result: JSX.CSSProperties = {};
  for (let index = 0; index < args.length; index++) {
    const arg = args[index];
    if (isDef(arg)) {
      if (Array.isArray(arg)) {
        Object.assign(result, mergeStyles(arg));
      } else if (typeof arg === "string") {
        Object.assign(
          result,
          arg.split(";").reduce((rcc: JSX.CSSProperties, item: string) => {
            const [key, value] = item.split(":");
            rcc[key.trim()] = value.trim();
            return rcc;
          }, {} as JSX.CSSProperties)
        );
      } else {
        Object.assign(result, arg);
      }
    }
  }
  return result;
}
