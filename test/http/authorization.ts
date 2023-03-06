/**
 * 处理账号权限
 * @param 请求对象
 * @returns 
 */

import type { AxiosRequestConfig } from "axios";
const auth = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJlaWQiOiJlYzIwMjdjMWI5MmQ0MWRiYjViMmIyOTIwYjQ3NWViNyIsInVzZXJfbmFtZSI6ImNkX3RpYSIsInR6IjoiQ2hpbmEgU3RhbmRhcmQgVGltZSIsInBpZCI6MTA2MDU1MCwib2lkIjoxMDYsIm9sZGlkIjo3NTgsImF1dGhvcml0aWVzIjpbIjExIiwiMjAiXSwiY2xpZW50X2lkIjoiZWNpLWVycCIsImF0dGFjaHMiOiIiLCJlbmFtZSI6IlRpYSIsImhwaWQiOjUwLCJhdHlwZSI6IjIiLCJzY29wZSI6WyJhbGwiXSwiZG5hbWUiOiJDRExYX1RpYVvku6PpnJ5dIiwiZXhwIjoxNjc4MDk4MDUwLCJxeXd4IjpudWxsLCJhaWQiOiIwZTIzYjhhNmQxMDU0OWY0YTgwYjU4Zjk5NzQyNGM4NyIsImp0aSI6ImM0NjNkZGE2LWFmNmQtNGZhNy1hNDMyLTM4NTcwNzdiNGI0MSIsImRpZCI6MTA2MDV9.RxGUYHh0jY584SF7rM4lJ8WdDE0CYYvtycjPcf3jd2lbKP5V1uDq00R741iEidd6CCKWvL7OacffmVbc1vfOquewlDLDRRfFvbU09qoI6x_vC4W1c-gfd0Bj1quJ4bzq5d8WbqEAXkBQsx8l5hTp2RBNbcl7S7utN0QcG9BlBoI"
const Authorization = function (req: AxiosRequestConfig): {
  [key: string]: string;
} {
  const headers = {};
  if (auth) {
    Object.assign(headers, {
      authorization: `Bearer ${auth}`
    });
  }
  return headers;
}

export default Authorization;