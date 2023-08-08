
import type { RoleType } from "@ue/role";
import type { DefineComponent } from "vue";
import type { RouteLocationRaw, RouteMeta as VueRouteMeta } from "vue-router";

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

export interface RouteMeta extends VueRouteMeta {
  link?: string | MenuLink | RouteLocationRaw; // 自定义链接
  target?: string;                  // 打开窗口的方式
  menu?: string;
  inNavigation?: boolean;           // 是否为一级导航
  secondInNavigation?: boolean;     // 二级导航
  icon?: string | DefineComponent;  // 图标 [图标名称或者组件]
  roles?: RoleType; // 权限控制
  title?: string;   // 标题
  breadcrumb?: string; // 标题 优先级大于 title
  back?: boolean;   //左上角按钮是否为返回
  hidden?: boolean; // 是否隐藏该菜单
  params?: object;
  query?: object;
}