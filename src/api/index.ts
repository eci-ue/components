/**
 * @file 统一 API 交互
 * @author theresia@eci.com
 */

import Task from "./task";
import { API } from "@js-lion/api";
export { useState } from "@ue/utils";

export class Http extends API {
  readonly task: Task = new Task();
  constructor() {
    super();
  }
}

export const api = new Http();
