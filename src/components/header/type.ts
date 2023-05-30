
import type { RouteLocationRaw } from "vue-router";

export interface MenuData {
  label: string;
  active?: boolean;
  link?: string | RouteLocationRaw;
  children?: MenuData[];
}