/**
 * 处理账号权限
 * @param 请求对象
 * @returns 
 */

import type { AxiosRequestConfig } from "axios";
const auth = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJlaWQiOiJlYzIwMjdjMWI5MmQ0MWRiYjViMmIyOTIwYjQ3NWViNyIsInVzZXJfbmFtZSI6ImNkX3RpYSIsInR6IjoiQ2hpbmEgU3RhbmRhcmQgVGltZSIsInBpZCI6MTA2MDU1MCwib2lkIjoxMDYsIm9sZGlkIjo3NTgsImF1dGhvcml0aWVzIjpbIjExIiwiNCIsIjUiLCI0OSIsIjIwIl0sImNsaWVudF9pZCI6ImVjaS1lcnAiLCJhdHRhY2hzIjoiIiwiZW5hbWUiOiJUaWEiLCJocGlkIjo1MCwiYXR5cGUiOiIyIiwic2NvcGUiOlsiYWxsIl0sImRuYW1lIjoiQ0RMWF9UaWFb5Luj6ZyeXSIsImV4cCI6MTY3NjI3ODc5NCwicXl3eCI6bnVsbCwiYWlkIjoiMGUyM2I4YTZkMTA1NDlmNGE4MGI1OGY5OTc0MjRjODciLCJqdGkiOiJmNmVhODE4ZC05OGE4LTRjNzQtOTI2NC04MDk1ZjI4MTljNmYiLCJkaWQiOjEwNjA1fQ.O_BV_WE9kh1yLgEqD6VLTeeW0dVLMUpt2jyHA5hjEdD9zMfDZZzgL_ZVRlf6Jou6CR17f3MIr1_vTU65Vaqr7uwa7Q1hOBz5A-GPK0enb4Bd2T7XwTx6-GMwES_raremocXFloDY4l-hRkAs0zDZ4a7O4w-7h00IPqlpoZ4usNY"
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