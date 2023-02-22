/**
 * 处理账号权限
 * @param 请求对象
 * @returns 
 */

import type { AxiosRequestConfig } from "axios";
const auth = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJlaWQiOiJlYzIwMjdjMWI5MmQ0MWRiYjViMmIyOTIwYjQ3NWViNyIsInVzZXJfbmFtZSI6ImNkX3RpYSIsInR6IjoiQ2hpbmEgU3RhbmRhcmQgVGltZSIsInBpZCI6MTA2MDU1MCwib2lkIjoxMDYsIm9sZGlkIjo3NTgsImF1dGhvcml0aWVzIjpbIjExIiwiNCIsIjUiLCI0OSIsIjIwIl0sImNsaWVudF9pZCI6ImVjaS1lcnAiLCJhdHRhY2hzIjoiIiwiZW5hbWUiOiJUaWEiLCJocGlkIjo1MCwiYXR5cGUiOiIyIiwic2NvcGUiOlsiYWxsIl0sImRuYW1lIjoiQ0RMWF9UaWFb5Luj6ZyeXSIsImV4cCI6MTY3NzA2MTY2NSwicXl3eCI6bnVsbCwiYWlkIjoiMGUyM2I4YTZkMTA1NDlmNGE4MGI1OGY5OTc0MjRjODciLCJqdGkiOiJiODdlNDBlMi1jMmIwLTQ4ZWMtODIzZS1hOTM2MzdlZGY4Y2EiLCJkaWQiOjEwNjA1fQ.H41N9MidbcmqV6MizAx_-BkAlnQaYl-rb3BAIaXywKReP1by1f8xjHssJoPNz7aagqcCaOPjDAKmZOt4MSab_BuwngyiyCe76Oy4M__uNcvE3zfZ8HY-OTAmnLAY1D2GGL4_RXe7tCXxYa3VmCgJxeimDuzvnE7yc-GkB0AeCbw"
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