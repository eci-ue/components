/**
 * @file 工具
 * @author svon.me@gmail.com
 */

import { View } from "./type";
import * as _ from "lodash-es";
import { hook } from "@ue/utils";
import i18n from "../../../utils/i18n";
import * as message from "@ue/message";
import safeGet from "@fengqiaogang/safe-get";
import Words from "./words.vue";
import { h as createElement } from "vue";

import type { HookFunction } from "@ue/utils";
import type { TaskFileItem, TaskFileStage } from "./type";

const wordRender = function(result: object, rate: boolean, props: any) {
  const key = safeGet<string>(result, "column.dataIndex");
  const value = key ? safeGet<TaskFileStage>(result, ["record", key]) : undefined;
  return createElement(Words, {
    rate,
    data: value,
    pm: props.pm,
    mode: props.mode,
  });
}

export const headers = function(fileList: TaskFileItem[] = [], props: any) {
  const prev = [{ 
    title: i18n.part(i18n.common.label.file, 1), 
    dataIndex: "bilingualFileName", 
    key: "name"
  }];
  const next = [{ 
    title: i18n.lqr.title.lqr, 
    dataIndex: "lqrName", 
    key: "lqr"
  }];
  
  const list: object[] = [...prev];
  let showLqr: boolean = false;

  for (const data of fileList) {
    const temp: object[] = [];
    _.forEach<TaskFileStage>(data.taskBilingualFileStageRspList || [], function(item: TaskFileStage, index: number) {
      let { subType = "", current = false } = item;
      subType = _.toUpper(subType);
      if (subType === "T" || subType === "E") {
        showLqr = true;
      }
      temp.push({
        key: "words",
        title: `For ${subType} words`,
        width: "120px",
        dataIndex: `taskBilingualFileStageRspList[${index}]`,
        className: "word-content",
        customRender: function(result: object) {
          return wordRender(result, false, props);
        }
      },
      {
        className: current ? "word-content text-yellow bg-yellow bg-opacity-10" : "word-content",
        key: "resourceName",
        title: subType,
        width: "200px",
        dataIndex: `taskBilingualFileStageRspList[${index}]`,
        customRender: function(result: object) {
          return wordRender(result, true, props);
        }
      });
    });
    _.forEach<object>(temp, function(item: object, index: number) {
      list[index + prev.length] = item;
    });
  }
  if (showLqr) {
    return [...list, ...next];
  }
  return list;
};


export const fileList = function(fileList: TaskFileItem[]) {
  return _.map(fileList, function(item: TaskFileItem) {
    const key = _.get<TaskFileItem, string>(item, "bilingualFileId");
    return { key, ...item };
  });
};

export const before = async function(callback?: HookFunction | HookFunction[], ...args: any[]) {
  try {
    return await hook.run(callback, args);
  } catch (error) {
    // @ts-ignore
    const tips: string = error?.message;
    if (tips) {
      message.error(tips);
    }
    return false;
  }
}