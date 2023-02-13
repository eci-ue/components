/**
 * 处理账号权限
 * @param 请求对象
 * @returns 
 */

import type { AxiosRequestConfig } from "axios";
const auth = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJlaWQiOiJlYzIwMjdjMWI5MmQ0MWRiYjViMmIyOTIwYjQ3NWViNyIsInVzZXJfbmFtZSI6ImNkX3RpYSIsInR6IjoiQ2hpbmEgU3RhbmRhcmQgVGltZSIsInBpZCI6MTA2MDU1MCwib2lkIjoxMDYsIm9sZGlkIjo3NTgsImF1dGhvcml0aWVzIjpbIjExIiwiNCIsIjUiLCI0OSIsIjIwIl0sImNsaWVudF9pZCI6ImVjaS1lcnAiLCJhdHRhY2hzIjoiIiwiZW5hbWUiOiJUaWEiLCJocGlkIjo1MCwiYXR5cGUiOiIyIiwic2NvcGUiOlsiYWxsIl0sImRuYW1lIjoiQ0RMWF9UaWFb5Luj6ZyeXSIsImV4cCI6MTY3NjI5NTEzMiwicXl3eCI6bnVsbCwiYWlkIjoiMGUyM2I4YTZkMTA1NDlmNGE4MGI1OGY5OTc0MjRjODciLCJqdGkiOiI2NGJkNjhiYi0wNzMzLTQyZmQtYmVkMC02ODdkMDZhMzI5YTEiLCJkaWQiOjEwNjA1fQ.BIApJzR8-Iax2kMlzwHaqgiryRfuKYyQvZbfGz4jnwRVZZ8SEWaf15BHmgnQaK_3WAwv8uVzD8eOjNMwJAl0LVQf2r1l0Cs12lSaDHuBR6843LcZUN9eYzby8MI4GrseCHjJJCKSCWp2lwtyrEzHgb59REKUFEUCE3m2MjyKML0"
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