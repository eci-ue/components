import { date } from "@ue/utils";
import type { Props } from "./type";

export const main = function<T extends Props>(data: T) {
  if (data.value) {
    if (typeof data.value === "string" && /%-+$/.test(data.value)) {
      return "--";
    }
    return date.format(data.value, data.format ? data.format : data.date);
  }
  return "--";
}