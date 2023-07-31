/**
 * @file File
 * @author svon.me@gmail.com
 */

import { PageResult, path } from "@ue/utils";
import safeGet from "@fengqiaogang/safe-get";
import { API, get, tryError, validate, required } from "@js-lion/api";
import type { Signature, SignatureSTS } from "@ue/upload/types/components/type";

export default class {
  // 获取签名
  @tryError(null)
  @get("/:drive/auth/getOssAuth")
  getSignature<T = Signature>(): Promise<T> {
    return {} as any;
  }

  // 获取签名
  @get("/:drive/auth/getSTS")
  async getSignatureSTS<T = SignatureSTS>(): Promise<T> {
    return {} as any;
  }

  /**
  * 阿里云文件上传
  * @param file 文件
  * @returns url
  */
  @tryError("")
  @validate
  async aliyunOssUpload(@required file: File): Promise<string> {
    const signature = await this.getSignature();
    const url = path.join(signature.dir, file.name);
    const data = new FormData();
    const filename = "${filename}";
    data.append("name", file.name);
    data.append("key", `${signature.dir}${filename}`);
    data.append("policy", signature.policy);
    data.append("OSSAccessKeyId", signature.accessId);
    data.append("success_action_status", "200");
    data.append("signature", signature.signature);
    data.append("file", file);
    const api = new API();
    await api.post(signature.host, data);
    return url;
  }


  /**
   * 文件列表
   * @param id 
   * @param page 
   * @param size 
   * @param share 
   * @param all 
   * @returns 
   */
  @tryError(new PageResult())
  @get("/:drive/file/list/:id")
  list<T>(id: string | number = 0, page = 1, size = 10, share = false, all = false): Promise<PageResult<T>> {
    const params = { 
      id,
      pn: page,
      ps: size,
      all,
      onlyShare: share
    };
    const callback = function(data: any): PageResult<T> {
      if (Array.isArray(data)) {
        return {
          results: data,
          total: data.length
        }
      }
      return data;
    }
    return { params, callback } as any;
  }

  async childrenList<T>(parentId: string | number = 0, share?: boolean, all?: boolean): Promise<T[]> {
    const data = await this.list<T>(parentId, 1, 100000, share, all);
    if (all) {
      return data.results;
    }
    return data.results.filter(function(item: T) {
      const fileId = safeGet<number>(item as unknown as object, "fileId");
      if (fileId && fileId > 0) {
        return false;
      }
      return true;
    });
  }
}