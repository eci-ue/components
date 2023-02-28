/**
 * 处理账号权限
 * @param 请求对象
 * @returns 
 */

import type { AxiosRequestConfig } from "axios";
const auth = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJlaWQiOiJlYzIwMjdjMWI5MmQ0MWRiYjViMmIyOTIwYjQ3NWViNyIsInVzZXJfbmFtZSI6ImNkX3RpYSIsInR6IjoiQ2hpbmEgU3RhbmRhcmQgVGltZSIsInBpZCI6MTA2MDU1MCwib2lkIjoxMDYsIm9sZGlkIjo3NTgsImF1dGhvcml0aWVzIjpbIjExIiwiMjAiXSwiY2xpZW50X2lkIjoiZWNpLWVycCIsImF0dGFjaHMiOiIiLCJlbmFtZSI6IlRpYSIsImhwaWQiOjUwLCJhdHlwZSI6IjIiLCJzY29wZSI6WyJhbGwiXSwiZG5hbWUiOiJDRExYX1RpYVvku6PpnJ5dIiwiZXhwIjoxNjc3NTIxMDIxLCJxeXd4IjpudWxsLCJhaWQiOiIwZTIzYjhhNmQxMDU0OWY0YTgwYjU4Zjk5NzQyNGM4NyIsImp0aSI6IjgwYzMxMTU2LTk1Y2ItNDg0Zi04OGQ5LThmOTIyZjQzMDgyNCIsImRpZCI6MTA2MDV9.WnqH_EDkTKiKrl-jHddmDodDYDw3f1wjm3LzQ0lRqhRkcihRoi0Dj47KlME-B95nnjYu58QxNbftN457GtBz8iE8joO2zg71RlRP-IZmiwdA-iLv8nhAvWOClg2hcEyC4emM6XfPJOglMemJBxzA6wJErquzrKNMrCLXY49TA6s"
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