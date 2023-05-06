import * as _ from "lodash-es";
import Cookie from "js-cookie";
import i18n from "../../utils/i18n";
import safeGet from "@fengqiaogang/safe-get";

import * as message from "@ue/message";
import { DownloadType, NetApi, Env, DomainApi, Domain } from "./type";
import { downloadFile, fileDownloadUrl, hook, path } from "@ue/utils";

import type { HookFunction } from "@ue/utils";

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
      const loading = message.loading(i18n.message.DOWNLOAD_ING, 0);
      // @ts-ignore
      const download = new Control(
        { IsSingleProgress: false, fileNameSource: ' ' },
        {
          complete: () => {
            if (loading) {
              setTimeout(loading, 500);
            }
            setTimeout(function() {
              const tips = message.noConflict();
              tips.destroy();
            }, 500);
            resolve(true);
          },
          close () {},
          error (err: string) {
            if (loading) {
              setTimeout(loading, 500);
            }
            setTimeout(function() {
              const tips = message.noConflict();
              tips.destroy();
            }, 500);
            if (typeof err === "string") {
              reject(new Error(err));
            } else {
              reject(new Error(i18n.message.NETWORK_ERROR));
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

export const downloadName = function(value: string = ""): string | undefined {
  if (value) {
    const list = value.split("/");
    const [ name, suffix] = list[list.length - 1].split(".");
    if (name && suffix && suffix.length > 1) {
      return list[list.length - 1];
    }
  }
  return void 0;
}

export const ossFileDownloadLink = function(value: string) {
  return fileDownloadUrl(value);
}

const fileDownload = function(env: Env, value: string, name: string = "") {
  const domain = DomainApi[env];
  const url = path.join("service-file", value);
  downloadFile(`${domain}${url}`, name);
  return true;
}

export const download = async function(props: Props, content: any, env: Env) {
  const append = function() {
    if (props.cookie) {
      _.each(props.cookie, function(item: object) {
        const key = safeGet<string>(item, "keyStr");
        const value = safeGet<string>(item, "valueStr");
        if (key && value) {
          Cookie.set(key, value, {
            path: "/",
            domain: Domain[env],
          });
        }
      });
    }
    return true;
  }
  const remove = function() {
    if (props.cookie) {
      _.each(props.cookie, function(item: object) {
        const key = safeGet<string>(item, "keyStr");
        if (key) {
          Cookie.remove(key, {
            path: "/",
            domain: Domain[env],
          });
        }
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
      message.success(i18n.message.download.success);
    }
  }
  return await after(status, remove, props.after);
}
