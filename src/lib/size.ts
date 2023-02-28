/**
 * @file 大小处理
 * @author svon.me@gmail.com
 * @description 纯数字按文件大小转换，数组取长度，对象取键值长度
 */

import { fileSize } from "@ue/utils";
import safeGet from "@fengqiaogang/safe-get";

import type { Directive, App } from "vue";

const main = function(el: HTMLElement, bind: object) {
  let value = safeGet<string | number>(bind, "value") || "";
  if (value || value === 0) {
    if (typeof value === "number") {
      value = fileSize(value);
    } else {
      value = String(value.length);
    }
  }
  el.innerText = String(value);
};

const timeZone: Directive = {
  mounted: main,
  updated: main
}

export default {
  install: function(app: App) {
    app.directive("size", timeZone);
  }
}