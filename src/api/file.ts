/**
 * @file File
 * @author svon.me@gmail.com
 */

import { PageResult } from "@ue/utils";
import safeGet from "@fengqiaogang/safe-get";
import { get, tryError } from "@js-lion/api";

export default class {
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