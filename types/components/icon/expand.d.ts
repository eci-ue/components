import type { Props } from "./props";
import type { Component } from "vue";
type Callback = (props: Props) => Component | false;
export declare const IconExpand: (callback?: Callback) => Callback[];
export {};
