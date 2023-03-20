/**
 * 处理账号权限
 * @param 请求对象
 * @returns 
 */

import type { AxiosRequestConfig } from "axios";
const auth = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJlaWQiOiI5ODdkNTI5MWQ5OTI0NjRhYjg2YmQ3NTdiNjg0YjEwMSIsInVzZXJfbmFtZSI6IkVDSUAzODQzYjhlNCIsInR6IjoiQ2hpbmEgU3RhbmRhcmQgVGltZSIsInBpZCI6MTA3MTUyNSwib2lkIjoxMDcsIm9sZGlkIjoyMDI0LCJhdXRob3JpdGllcyI6WyI0IiwiNDkiXSwiY2xpZW50X2lkIjoiZWNpLWVycCIsImF0dGFjaHMiOiIiLCJlbmFtZSI6IlJ1YnkiLCJocGlkIjoyNSwiYXR5cGUiOiIyIiwic2NvcGUiOlsiYWxsIl0sImRuYW1lIjoiQ0RYWF9SdWJ5W-WwueWwj-WNjl0iLCJleHAiOjE2NzkzMDMxNDcsInF5d3giOm51bGwsImFpZCI6IjdhODRkMjBiOGFlMTQzMDhiNmQ2ZjVhMDE3Y2JlMTU4IiwianRpIjoiMTc5YTBmZDEtNWE3YS00YzBkLWE3YzgtMWEwZjk3MjEzZmRkIiwiZGlkIjoxMDcxNX0.MVQ_uuE68TVZ_rsmX3fLYsyyiAdF_K_vrGT7VcEP7gEkOS1OJEcotnMfYPqAhb7iWFQFuHtAFPaqDgJeLRYQ0FuTPzrmDQ3gsEmKou03uaSdNpVbBqa05oUTU5dfdNYW1OJ3u1TtfsX_SAUCJjkur1LMgXqq7zIEKEa-u3kcswQ"
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