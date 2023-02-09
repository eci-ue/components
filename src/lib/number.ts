/**
 * @file 数字处理
 * @author svon.me@gmail.com
 */

import * as _ from "lodash-es";
import { toNumberCash, isZero } from "@eci/utils";
import type { Directive, App } from "vue";

const main = function(el: HTMLElement, bind: object) {
  let value: string = _.get<object, string>(bind, "value");
  const integer: boolean = _.get<object, string>(bind, "modifiers.integer") || false;
  if (isZero(value) || value) {
    value = _.trim(`${value}`);
  }
  if (integer) {
    el.innerText = `${_.toInteger(value)}`;
  } else {
    el.innerText = toNumberCash(value);
  }
};

const timeZone: Directive = {
  mounted: main,
  updated: main
}

export default {
  install: function(app: App) {
    app.directive("number", timeZone);
  }
}