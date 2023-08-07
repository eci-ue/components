import * as _ from "lodash-es";
import { role } from "@ue/role";
import DBList from "@fengqiaogang/dblist";
import safeGet from "@fengqiaogang/safe-get";

import type { RoleType } from "@ue/role";
import type { MenuData as HeaderMenuData } from "./type";
import type { RouteRecord, RouteRecordRaw } from "vue-router";

const toBoolean = function(value?: any) {
  if (value || value === 0) {
    return true;
  }
  return false;
}

const sortBy = function(value: Array<RouteRecord | RouteRecordRaw> = []) {
  const list = _.sortBy(value, "meta.index");
  const array = list.map(function(item: RouteRecord | RouteRecordRaw) {
    const children: RouteRecordRaw[] = item.children || [];
    if (children && children.length > 1) {
      item.children = sortBy(children);
    }
    return item;
  });
  return array;
}

export const isNav = function(item: RouteRecord | RouteRecordRaw) {
  return toBoolean(item.meta?.inNavigation);
};

export const rolePick = function(item: RouteRecord | RouteRecordRaw) {
  const value = _.compact(_.concat(item.meta?.roles));
  if (value && value.length > 0) {
    return role.assert(value as RoleType);
  }
  return true;
};

export const getTitle = function(data: RouteRecord | RouteRecordRaw): string {
  const value = safeGet<string>(data, "meta.title") || safeGet<string>(data, "name");
  return value || "";
}

export const getHref = function(data: RouteRecord | RouteRecordRaw): string | object {
  const value = data.meta?.link;
  if (value) {
    return value;
  }
  return {
    name: data.name,
    query: data.meta?.query || {},
    params: data.meta?.params || {},
  }
}

export const createDB = function(list: Array<RouteRecord | RouteRecordRaw> = []) {
  const id = "id";
  const pid = "pid";
  const root = "0";
  return new DBList<RouteRecord | RouteRecordRaw>(list, id, pid, root);
}

export const filterRouters = function(list: Array<RouteRecord | RouteRecordRaw>, current?: string) {
  const cache = createDB();
  const db = createDB(sortBy(list));
  for (const item of db.clone()) {
    // 权限判断
    if (!rolePick(item)) {
      continue;
    }
    const name = safeGet<string>(item, "name");
    if (cache.selectOne({ name })) {
      continue;
    }
    if (isNav(item)) {
      const link = getHref(item);
      const label = getTitle(item);
      const hidden = safeGet<boolean>(item, "meta.hidden") || false;
      cache.insert({ hidden, label, link, active: false, ...item });
    }
  }
  if (current) {
    const parent = db.parentDeepFlatten({ name: current });
    const ids = parent.map((item: object) => safeGet<string>(item, db.primary));
    const where = { [db.primary]: ids };
    cache.update(where, { active: true } as any);
  }
  return cache;
}

// 通过全局路由检索出导航数据
export const getNavigationList = function(
  routers: Array<RouteRecord | RouteRecordRaw> = [], 
  currentPageName?: string, 
  menuList: HeaderMenuData[] = []
): HeaderMenuData[] {
  const db = filterRouters(routers, currentPageName);
  const where = { [db.foreign]: db.foreignValue };
  if (menuList && menuList.length > 0) {
    db.insert(menuList);
  }
  // @ts-ignore
  return sortBy(db.childrenDeep(where));
}