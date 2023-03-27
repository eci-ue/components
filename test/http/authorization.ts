/**
 * 处理账号权限
 * @param 请求对象
 * @returns 
 */

import type { AxiosRequestConfig } from "axios";

// 调试时使用，临时 token value
// 配置文件 src/config/.env.local
// VITE_COOKIE_SYSTEM_DEBUG = xxx
// @ts-ignore
export const AUTHORIZATION_DEBUG =  import.meta.env.VITE_COOKIE_SYSTEM_DEBUG;
const Authorization = function (req: AxiosRequestConfig): {
  [key: string]: string;
} {
  const headers = {};
  
  if (AUTHORIZATION_DEBUG) {
    Object.assign(headers, {
      authorization: `Bearer ${AUTHORIZATION_DEBUG}`
    });
  }
  return headers;
}

export default Authorization;