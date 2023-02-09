/**
 * @file 扩充 Vue 功能
 * @author svon.me@gmail.com
 */

import time from "./time";
import number from "./number";

import type { App } from "vue";
 
export default {
  install: function(app: App) {
    app.use(time);
    app.use(number);
  }
}