
import type { RouteLocationRaw } from "vue-router";

export interface MenuLink {
  to: RouteLocationRaw;
  target?: string;
}

export interface MenuData {
  label: string;    // 标题
  active?: boolean; // 选中
  hidden?: boolean;       // 不展示，冗余数据
  children?: MenuData[];  // 子数据
  link?: string | MenuLink | RouteLocationRaw; // 链接
}