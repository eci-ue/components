import { date } from "@ue/utils";
import type { Props } from "./type";

export const main = function<T extends Props>(data: T) {
  if (data.value) {
    if (typeof data.value === "string" && /%-+$/.test(data.value)) {
      return "--";
    }
    if (data.format) {
      return date.format(data.value, data.format); // 自定义时间格式
    }
    if (data.date) {
      return date.format(data.value, true); // 按年月日格式展示
    }
    return date.format(data.value, void 0); // 按默认格式展示
  }
  return "--";
}