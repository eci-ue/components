/**
 * @file API 响应结果校验
 * @author svon.me@gmail.com
 */

import _ from "lodash-es";
import safeGet from "@fengqiaogang/safe-get";
import { isObject, isString, toInteger } from "lodash-es";

enum API {
  success = 200, // 接口成功状态码
  dataName = "data", // 接口数据对应的属性名称
  codeName = "scode", // 状态码属性名称
  statusName = "status", // 状态枚举属性名称
}

const getResult = function<T, D>(response: D): T {
  const data = safeGet<T>(response as object, API.dataName);
  if (response && data) {
    if (isString(data)) {
      try {
        return JSON.parse(data);
      } catch (e) {
        // todo
      }
    }
    return data;
  }
  return response as any;
};

// 判断状态码
export const check = function <T, D>(response: D): T | boolean {
  const result = getResult<T, D>(response);
  if (result && isObject(result)) {
    const status = safeGet<boolean>(result, API.statusName);
    const scode = safeGet<string>(result, API.codeName);
    if (status && toInteger(scode) === API.success) {
      const value = safeGet<T>(result, API.dataName);
      return _.isNil(value) ? true : value;
    }
    // 如果状态码存在
    if (/^\d+$/.test(scode) || !status) {
      // 向外抛出异常
      throw result;
    }
  }
  return result;
};

export const asyncCheck = async function <T, D>(result: D): Promise<T | boolean> {
  const data = await Promise.resolve(result);
  return check(data);
};