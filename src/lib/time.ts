/**
 * @file 时间处理
 * @author svon.me@gmail.com
 */

import * as _ from "lodash-es";
import { date } from "@eci/utils";

import type { Directive, App } from "vue";


const main = function(el: HTMLElement, bind: object) {
  let value: string = _.get<object, string>(bind, "value") || "";
  if (value) {
    const isDete: string = _.get<object, string>(bind, "modifiers.date") || false;
    if (isDete) {
      // YYYY-MM-DD
      value = date.format(value, true);
    } else {
      // 默认为 YYYY-MM-DD hh:mm:ss
      value = date.format(value);
    }
  }
  el.innerText = value;
};

const timeZone: Directive = {
  mounted: main,
  updated: main
}

export default {
  install: function(app: App) {
    app.directive("time", timeZone);
  }
}