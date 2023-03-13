/**
 * 处理账号权限
 * @param 请求对象
 * @returns 
 */

import type { AxiosRequestConfig } from "axios";
const auth = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJlaWQiOiJlYzIwMjdjMWI5MmQ0MWRiYjViMmIyOTIwYjQ3NWViNyIsInVzZXJfbmFtZSI6ImNkX3RpYSIsInR6IjoiQ2hpbmEgU3RhbmRhcmQgVGltZSIsInBpZCI6MTA2MDU1MCwib2lkIjoxMDYsIm9sZGlkIjo3NTgsImF1dGhvcml0aWVzIjpbIjExIiwiMjAiXSwiY2xpZW50X2lkIjoiZWNpLWVycCIsImF0dGFjaHMiOiIiLCJlbmFtZSI6IlRpYSIsImhwaWQiOjUwLCJhdHlwZSI6IjIiLCJzY29wZSI6WyJhbGwiXSwiZG5hbWUiOiJDRExYX1RpYVvku6PpnJ5dIiwiZXhwIjoxNjc4NzA3NTIwLCJxeXd4IjpudWxsLCJhaWQiOiIwZTIzYjhhNmQxMDU0OWY0YTgwYjU4Zjk5NzQyNGM4NyIsImp0aSI6IjNkMDNjY2VmLWMyNDctNGNmNi04ZmZiLTUyM2YwOWRlMzNiMyIsImRpZCI6MTA2MDV9.DYxsrbjZZ4PRvKD-OGQY2_xtYod0TJhoqNfUTBefAKXRQICIl2ajRiQ2tOCM9XY_j4con6BEPO3_vjC_KQWUt0nlzrAP_te_nDguhDBSlEWk9WaTPB0K_3f7IsNwKBMRycJfhT7MLxHzAIGG-nBnFIg16pvgn4SORfXj3cVxOSA"
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