
import type { RouteLocationRaw } from "vue-router";

export interface MenuData {
  label: string;    // 标题
  active?: boolean; // 选中
  hidden?: boolean;       // 不展示，冗余数据
  children?: MenuData[];  // 子数据
  link?: string | RouteLocationRaw; // 链接
}