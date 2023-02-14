/**
 * @file 文件上传
 * @author svon.me@gmail.com
 */

import * as _ from "lodash-es";
import OSS from "ali-oss";
import { api } from "../../api";
import BigNumber from "bignumber.js";
import { UUid, path } from "@ue/utils";

import type { SignatureSTS } from "../../components/upload/props";
import type { Checkpoint } from "ali-oss";

export enum Status {
  wait = "wait",         // 等待中 / 暂停中
  progress = "progress", // 进行中
  complete = "complete", // 上传完成
  abnormal = "abnormal", // 异常情况
};

type Change = (url: string, data: Upload) => void;

const getClient = async function() {
  const signature = await api.file.getSignatureSTS();
  const client = new OSS({
    // yourRegion填写Bucket所在地域。以华东1（杭州）为例，Region填写为oss-cn-hangzhou。
    region: `oss-${signature.region}`,
    // 从STS服务获取的临时访问密钥（AccessKey ID和AccessKey Secret）。
    accessKeyId: signature.accessKeyId,
    accessKeySecret: signature.accessKeySecret,
    // 从STS服务获取的安全令牌（SecurityToken）。
    stsToken: signature.securityToken,
    // 填写Bucket名称，例如examplebucket。
    bucket: signature.bucket,
  });
  return { client, signature };
}

const calcSize = function(file: File) {
  const value = new BigNumber(file.size).div(1000).div(1000).toFixed(2);
  return new BigNumber(value).toNumber();
}

const createKey = function(file: File): string {
  return UUid(file.name, file.size);
}

let freeStatus = true;
const taskList: Upload[] = [];

const task = async function() {
  if (freeStatus && taskList.length > 0) {
    const upload = taskList.shift();
    if (upload) {
      freeStatus = false;
      try {
        await upload.start();
      } catch (error) {
        upload.restart();
      }
    }
  }
};

export class Upload {
  public key: string; // 根据文件生成唯一标识
  public name: string; // 文件名称
  public progress: number = 0;
  public status: Status = Status.wait; // 上传状态
  public url: string = ""; // 文件链接

  public file: File;
  public client!: OSS;
  public signature!: SignatureSTS;

  private tryCount: number = 0;

  //记录上传进度
  private abortCheckpoint: Checkpoint | undefined;
  // 事件回调
  private onChange: (progress?: number, url?: string, checkpoint?: Checkpoint) => void;

  constructor (file: File, onChange?: Change) {
    this.file = file;
    this.name = file.name;
    this.key = createKey(file);

    this.onChange = (progress: number = 0, url: string = "", checkpoint?: Checkpoint) => {
      this.url = url;
      this.abortCheckpoint = checkpoint;
      if (url) {
        this.progress = progress;
        this.status = progress < 1 ? Status.progress : Status.complete;
      } else {
        this.status = Status.abnormal;
        if (this.tryCount < 5) {
          this.tryCount += 1;
          taskList.unshift(this);
          freeStatus = true;
          setTimeout(task, 300);
        }
      }
      
      if (this.status === Status.complete) {
        freeStatus = true;
        // 进行下一个文件上传
        setTimeout(task, 300);
      }

      if(onChange) {
        onChange(url, this);
      }
    };
  }
  async getClient () {
    const { client, signature } = await getClient();
    this.client = client;
    this.signature = signature;
  }

  // 小文件
  async simple() {
    try {
      const url = await api.file.aliyunOssUpload(this.file);
      this.onChange(1, url);
    } catch (error) {
      // 触发异常状态
      this.onChange();
    }
  }
  // 中小文件
  async put() {
    if (!this.client) {
      await this.getClient();
    }
    const headers = {
      // 指定该Object被下载时的网页缓存行为。
      "Cache-Control": "no-cache",
      // 指定该Object被下载时的名称。
      "Content-Disposition": encodeURI(this.file.name),
      // 指定该Object被下载时的内容编码格式。
      "Content-Encoding": "utf-8",
      // 指定初始化分片上传时是否覆盖同名Object。此处设置为true，表示禁止覆盖同名Object。
      "x-oss-forbid-overwrite": "true",
    }
    const name = path.join(this.signature.dir, this.file.name);

    const options = {
      headers,
    };
    try {
      await this.client.put(name, this.file, options);
      // 文件上传成功
      this.onChange(1, name);
    } catch (error) {
      // 上传文件异常
      this.onChange();
    }
  }

  // 大文件
  async multipart (checkpoint?: Checkpoint) {
    if (!this.client) {
      await this.getClient();
    }
    const headers = {
      // 指定该Object被下载时的网页缓存行为。
      "Cache-Control": "no-cache",
      // 指定该Object被下载时的名称。
      "Content-Disposition": encodeURI(this.file.name),
      // 指定该Object被下载时的内容编码格式。
      "Content-Encoding": "utf-8",
      // 指定初始化分片上传时是否覆盖同名Object。此处设置为true，表示禁止覆盖同名Object。
      "x-oss-forbid-overwrite": "true",
    };

    const name = path.join(this.signature.dir, this.file.name);

    const size = calcSize(this.file);
    const options = {
      headers,
      checkpoint,
      // 获取分片上传进度、断点和返回值。
      progress: (progress: number, checkpoint: Checkpoint) => {
        this.onChange(progress, name, checkpoint);
      },
      // 设置并发上传的分片数量。
      parallel: 4,
    };
    if (size < 100) {
      Object.assign(options, {
        // 设置分片大小 字节
        partSize: new BigNumber(1024).times(512).toNumber(),
      });
    } else {
      Object.assign(options, {
        // 设置分片大小。默认值为1 MB，最小值为100 KB。
        partSize: new BigNumber(1024).times(1024).toNumber(),
      });
    }
    return this.client.multipartUpload(name, this.file, options);
  }
  // 重新上传
  restart() {
    this.tryCount += 1;
    return this.start();
  }
  // 开始上传
  start () {
    const size = calcSize(this.file);
    // 小于 5 M
    if (size < 5) {
      return this.simple();
    }
    // 小于 10 M
    if (size < 10) {
      return this.put();
    }
    // 大文件
    return this.multipart(this.abortCheckpoint);
  }
}


/**
 * 文件上传
 * @description 自动根据文件大小选择使用何种方式进行文件上传
 */
export const put = function(file: File | File[], onChange?: Change): Upload[] {
  const list: Upload[] = [];
  // 遍历文件，创建上传任务
  _.each(_.concat(file), async function(item: File) {
    const upload = new Upload(item, onChange);
    list.push(upload);
    // 添加任务
    taskList.push(upload);
  });
  setTimeout(task, 0);
  return list;
}
