/**
 * 处理账号权限
 * @param 请求对象
 * @returns 
 */

import type { AxiosRequestConfig } from "axios";
const auth = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJlaWQiOiI5ODdkNTI5MWQ5OTI0NjRhYjg2YmQ3NTdiNjg0YjEwMSIsInVzZXJfbmFtZSI6IkVDSUAzODQzYjhlNCIsInR6IjoiQ2hpbmEgU3RhbmRhcmQgVGltZSIsInBpZCI6MTA3MTUyNSwib2lkIjoxMDcsIm9sZGlkIjoyMDI0LCJhdXRob3JpdGllcyI6WyI0IiwiNDkiXSwiY2xpZW50X2lkIjoiZWNpLWVycCIsImF0dGFjaHMiOiIiLCJlbmFtZSI6IlJ1YnkiLCJocGlkIjoyNSwiYXR5cGUiOiIyIiwic2NvcGUiOlsiYWxsIl0sImRuYW1lIjoiQ0RYWF9SdWJ5W-WwueWwj-WNjl0iLCJleHAiOjE2NzkzOTI4MTMsInF5d3giOm51bGwsImFpZCI6IjdhODRkMjBiOGFlMTQzMDhiNmQ2ZjVhMDE3Y2JlMTU4IiwianRpIjoiODg0NDUxMjgtY2FhMi00MTY2LThjNDAtNDVmNGM0ODJiMWM1IiwiZGlkIjoxMDcxNX0.B__GwVMLScHIliMatL06qasPNi-QYzsNYMIbiba-If8BNp3pnaUPhkCAZBILEAU_7u-QPWi1trqiigAmKoHlOVBTPp9Od5dDXO3rrcVctjeOolv4mImOsgbNgK9a1T9rzzyozEulR1o7dJY0Bvt602O4KtLdmixYHv9DsHpU33U"
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