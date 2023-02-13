/**
 * @file 统一 API 交互
 * @author theresia@eci.com
 */

import Task from "./task";
import File from "./file";
export { useState } from "@ue/utils";

export class Http {
  readonly task: Task = new Task();
  readonly file: File = new File();
}

export const api = new Http();
