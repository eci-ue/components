/**
 * 处理账号权限
 * @param 请求对象
 * @returns 
 */

import type { AxiosRequestConfig } from "axios";
const auth = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJlaWQiOiJlYzIwMjdjMWI5MmQ0MWRiYjViMmIyOTIwYjQ3NWViNyIsInVzZXJfbmFtZSI6ImNkX3RpYSIsInR6IjoiQ2hpbmEgU3RhbmRhcmQgVGltZSIsInBpZCI6MTA2MDU1MCwib2lkIjoxMDYsIm9sZGlkIjo3NTgsImF1dGhvcml0aWVzIjpbIjExIiwiNCIsIjUiLCI0OSIsIjIwIl0sImNsaWVudF9pZCI6ImVjaS1lcnAiLCJhdHRhY2hzIjoiIiwiZW5hbWUiOiJUaWEiLCJocGlkIjo1MCwiYXR5cGUiOiIyIiwic2NvcGUiOlsiYWxsIl0sImRuYW1lIjoiQ0RMWF9UaWFb5Luj6ZyeXSIsImV4cCI6MTY3NjM2NjM3NiwicXl3eCI6bnVsbCwiYWlkIjoiMGUyM2I4YTZkMTA1NDlmNGE4MGI1OGY5OTc0MjRjODciLCJqdGkiOiI4Yzg3NGZjNy1jZjJlLTQ5OGItYTk2NS0zNTRlMDFjNjQ4MDYiLCJkaWQiOjEwNjA1fQ.YCPRI1ctHLrsUvqT3ma6YGZntQYJlFJCU7i097YjD1uCdAyLgaM1G2ToL2DkkQD-z8lTzqbMZ649k4Jb_DeJYPEoFVdJRudsXIF_k6zBOBzsQMyxIMFVAAvyzCqHLceOxf9EnTCE4nvVfsHhqwzqIFb6YS_U-Grr3rWztROvSsw"
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