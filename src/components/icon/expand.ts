
import type { Props } from "./props";
import type { Component } from "vue";

type Callback = (props: Props) => Component | false;
const expand = new Set<Callback>();

export const IconExpand = function(callback?: Callback): Callback[] {
  if (callback) {
    expand.add(callback);
  }
  return [...expand.values()];
}