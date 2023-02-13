/**
 * @file File
 * @author svon.me@gmail.com
 */

import { path } from "@ue/utils";
import { API, get, tryError, validate, required } from "@js-lion/api";

import type { Signature, SignatureSTS } from "src/components/upload/props";

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
}