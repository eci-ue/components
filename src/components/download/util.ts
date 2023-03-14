import * as _ from "lodash-es";
import Cookie from "js-cookie";
import UrlPattern from "url-pattern";
import { downloadFile, fileDownloadUrl, hook, path } from "@ue/utils";
import * as message from "@ue/message";
import { DownloadType, NetApi, Env, DomainApi } from "./type";
import type { HookFunction } from "@ue/utils";
import safeGet from "@fengqiaogang/safe-get";

interface Props {
  /** 文件地址 */
  value?: string;
  /** 文件名称 */
  name?: string;
  /** 下载方式 */
  type?: DownloadType;
  cookie?: object;
  /** 触发前钩子 */
  before: HookFunction | HookFunction[];
  /** 触发后钩子 */
  after: HookFunction | HookFunction[];
};

const before = async function(...hooks: any[]) {
  try {
    const status = await hook.run(hooks, ["download"]);
    if (!status) {
      return false;
    }
  } catch (error) {
    // @ts-ignore
    const tips: string = error?.message;
    if (tips) {
      message.error(tips);
    }
    return false;
  }
  return true;
};

const after = async function(value: any = false, ...hooks: any[]) {
  const app = hook.after(hooks);
  try {
    const status = await app("download", value);
    if (!status) {
      return false;
    }
  } catch (error) {
    // @ts-ignore
    const tips: string = error?.message;
    if (tips) {
      message.error(tips);
    }
    return false;
  }
  return true;
};


const ossDownload = function(value: string, name?: string) {
  const url = fileDownloadUrl(value);
  downloadFile(url, name);
  return true;
};

const netDownload = function(content: any, env: Env, value: string, name: string = ""): Promise<boolean> {
  return new Promise(function(resolve, reject) {
    // @ts-ignore
    const Control = safeGet(content, "Eci.Control.DownloadControl");
    if (Control) {
      // @ts-ignore
      const download = new Control(
        { IsSingleProgress: false, fileNameSource: ' ' },
        {
          complete: () => {
            resolve(true);
          },
          close () {},
          error (err: string) {
            if (typeof err === "string") {
              reject(new Error(err));
            } else {
              reject(new Error("Network error"));
            }
          }
        }
      );
      const query = {
        ServerFileID: 2,
        Url: NetApi[env],
        RealPath: value.replace('/\\/g', '\\\\'),
        FullName: `\\${name}`
      };
      download.showDownload([query]);
    }
  });
};

const fileDownload = function(env: Env, value: string, name: string = "") {
  const link = path.join(DomainApi[env], "service-file", value);
  downloadFile(link, name);
  return true;
}

const download = async function(props: Props, content: any, env: Env) {
  const append = function() {
    if (props.cookie) {
      const pattern = new UrlPattern('(http(s)\\://)(:subdomain.):domain.:tld(\\::port)(/*)');
      const location = pattern.match(window.location.origin);
      _.each(props.cookie, function(item: object) {
        const key = safeGet<string>(item, "keyStr");
        const value = safeGet<string>(item, "valueStr");
        if (key && value) {
          Cookie.set(key, value, {
            path: "/",
            domain: `${location.domain}.${location.tld}`,
          });
        }
      });
    }
    return true;
  }
  const remove = function() {
    if (props.cookie) {
      const pattern = new UrlPattern('(http(s)\\://)(:subdomain.):domain.:tld(\\::port)(/*)');
      const location = pattern.match(window.location.origin);
      _.each(props.cookie, function(item: object) {
        const key = safeGet<string>(item, "keyStr");
        Cookie.remove(key, {
          path: "/",
          domain: `${location.domain}.${location.tld}`,
        });
      });
    }
    return true;
  }
  let status = await before(append, props.before);
  if (status) {
    // oss 模式下载
    if (props.type === DownloadType.oss && props.value) {
      status = ossDownload(props.value, props.name);
      return;
    }

    if (props.type === DownloadType.net && props.value) {
      try {
        status = await netDownload(content, env, props.value, props.name);
      } catch (error) {
        status = false;
        if (error && typeof error === "string") {
          message.error(error);
        } else {
          // @ts-ignore
          const tips: string = error?.message;
          if (tips) {
            message.error(tips);
          }
        }
      }
    }
    if (props.type === DownloadType.file && props.value) {
      status = fileDownload(env, props.value, props.name);
    }
    if (status) {
      message.success("Download success, Please check your browser's download records");
    }
  }
  return await after(status, remove, props.after);
}

export default download;
