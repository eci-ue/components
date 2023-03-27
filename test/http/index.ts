import { API } from "@js-lion/api";
import { asyncCheck } from "./response";
import Authorization from "./authorization";
import type { AxiosRequestConfig, AxiosResponse } from "axios";


// 调试时使用，临时 token value
// 配置文件 src/config/.env.local
// VITE_API = xxx
// @ts-ignore
export const apiBasis =  import.meta.env.VITE_API;

const API_Server = {
  admin: "/system-admin", // 公共
  drive: "/tbms-drive", // 网盘
  cat: "/tbms-cat",     // CAT
  project: "/tbms-project", // 项目
  task: "/tbms-task", // task
}
// 处理请求前的数据
const requestCallback = function(req: AxiosRequestConfig): AxiosRequestConfig {
  const auth = Authorization(req);
  if (auth) {
    req.headers = { ...req.headers, ...auth };
  }
  return req;
}
// 处理返回数据
const responseCallback: any = function(res: AxiosResponse) {
  const status = parseInt(res.status as any, 10);
  if (status >= 200 && status < 300) {
    return asyncCheck(res);
  }
  return Promise.reject(res);
}

API.addRequest(requestCallback);
API.addResponse(responseCallback, function(error: any) {
  if (error && error.response) {
    return Promise.reject(error.response.data);
  }
  return Promise.reject(error);
});
// 设置全局变量
API.setEnv(API_Server);
API.setConfig({
  baseURL: apiBasis
});