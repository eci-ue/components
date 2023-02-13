/**
 * 处理账号权限
 * @param 请求对象
 * @returns 
 */

import type { AxiosRequestConfig } from "axios";
const auth = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJlaWQiOiJlYzIwMjdjMWI5MmQ0MWRiYjViMmIyOTIwYjQ3NWViNyIsInVzZXJfbmFtZSI6ImNkX3RpYSIsInR6IjoiQ2hpbmEgU3RhbmRhcmQgVGltZSIsInBpZCI6MTA2MDU1MCwib2lkIjoxMDYsIm9sZGlkIjo3NTgsImF1dGhvcml0aWVzIjpbIjExIiwiNCIsIjUiLCI0OSIsIjIwIl0sImNsaWVudF9pZCI6ImVjaS1lcnAiLCJhdHRhY2hzIjoiIiwiZW5hbWUiOiJUaWEiLCJocGlkIjo1MCwiYXR5cGUiOiIyIiwic2NvcGUiOlsiYWxsIl0sImRuYW1lIjoiQ0RMWF9UaWFb5Luj6ZyeXSIsImV4cCI6MTY3NjMwNzcwOSwicXl3eCI6bnVsbCwiYWlkIjoiMGUyM2I4YTZkMTA1NDlmNGE4MGI1OGY5OTc0MjRjODciLCJqdGkiOiI4ZjMwZDE2MC0xMjAwLTQwYTYtODQzMC1lMTg0ZjEwNGY3M2UiLCJkaWQiOjEwNjA1fQ.Hwh3_-wuITRlyHZ6M-bl15kYX8WFBy9w_LYV28lT7-3J9iRg8Wlzp9CsgeAW3-XBtFoXZGwS7cYPb0BrkBjjuzC-F8Y3kasH1DI_nMb9S-IGqskaMo602na_VwD5FlLKTPEvqnzOX00pORNpUDbWkVqkTvU9haTBabriZJ7llj0"
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