/**
 * @file 工具
 * @author svon.me@gmail.com
 */

import LqaLink from "./lqa";
import * as _ from "lodash-es";
import Words from "./words.vue";
import { Icon } from "@ue/icon";
import { hook } from "@ue/utils";
import i18n from "../../../utils/i18n";
import * as message from "@ue/message";
import { h as createElement } from "vue";
import safeGet from "@fengqiaogang/safe-get";

import type { HookFunction } from "@ue/utils";
import type { TaskFileItem, TaskFileStage } from "./type";

const wordRender = function (result: object, rate: boolean, props: any) {
  const key = safeGet<string>(result, "column.dataIndex");
  const value = key ? safeGet<TaskFileStage>(result, ["record", key]) : undefined;
  return createElement(Words, {
    rate,
    data: value,
    pm: props.pm,
    mode: props.mode,
    before: props.before,
  });
}

const lqaRender = function (props: object, title?: string) {
  const option = { ...props, "class": "max-w-40" };
  if (title) {
    return createElement(LqaLink, { ...option, title } as any, [
      createElement("span", { "class": "ant-btn-link", title }, title)
    ]);
  }
  return createElement(LqaLink, option as any);
}

export const headers = function (fileList: TaskFileItem[] = [], props: any, onReload: () => void) {
  const prev = [{
    title: i18n.part(i18n.common.label.file, 1),
    dataIndex: "bilingualFileName",
    key: "name"
  }];
  const next = [{
    key: "lqr",
    width: 200,
    minWidth: 140,
    dataIndex: "lqrName",
    title: i18n.lqr.title.lqr,
    customRender: function ({ record }: { record: TaskFileItem }) {
      if (record && record.showLqr) {
        // <LqaLink :data="record" :status="status" :pm="pm" :mode="mode" :id="id" :before="before" :projectId="projectId" :lqr-oper="lqrOper" :partner="partner" @add="onReload"></LqaLink>
        const option = Object.assign({
          data: record,
          oper: safeGet<number | string>(props, "lqrOper"),
        },
          _.pick(props, ["status", "pm", "mode", "id", "before", "projectId", "partner"])
        );
        return lqaRender({ ...option, onAdd: onReload }, record.lqrName);
      }
      return "--";
    }
  }];
  const lqf = [{
    key: "lqf",
    width: 200,
    minWidth: 140,
    dataIndex: "lqfName",
    title: i18n.lqr.title.lqf,
    customRender: function ({ record }: { record: TaskFileItem }) {
      if (record && record.showLqr) {
        // <LqaLink :data="record" :status="status" :pm="pm" :mode="mode" :lqType="3" :id="id" :projectId="projectId" :before="before" :lqf-oper="lqfOper" :partner="partner" @add="onReload"></LqaLink>
        const option = Object.assign({
          type: 3,
          data: record,
          oper: safeGet<number | string>(props, "lqfOper"),
        },
          _.pick(props, ["status", "pm", "mode", "id", "before", "projectId", "partner"])
        );
        return lqaRender({ ...option, onAdd: onReload }, record.lqfName);
      }
      return "--";
    }
  }];
  let list: object[] = [...prev];
  for (const data of fileList) {
    const temp: object[] = [];
    _.forEach<TaskFileStage>(data.taskBilingualFileStageRspList || [], function (item: TaskFileStage, index: number) {
      let { subType = "", current = false } = item;
      subType = _.toUpper(subType);
      temp.push({
        key: "words",
        title: `For ${subType} words`,
        width: "120px",
        dataIndex: `taskBilingualFileStageRspList[${index}]`,
        className: "word-content",
        customRender: function (result: object) {
          return createElement("div", { "class": "p-4" }, [
            wordRender(result, false, props)
          ]);
        }
      }, {
        className: current ? "word-content text-yellow bg-yellow bg-opacity-10" : "word-content",
        key: "resourceName",
        title: subType,
        width: "200px",
        dataIndex: `taskBilingualFileStageRspList[${index}]`,
        customRender: function (result: object) {
          // 任务进度
          const value = wordRender(result, true, props);
          // 任务状态
          const status = safeGet<number>(item, "status") || 0;
          // 判断第一个节点，是否已提交任务
          if (index === 0 && Number(status) >= 4) {
            return createElement("div", { "class": "p-4 flex items-end" }, [
              createElement("div", { "class": "flex-1 mr-2" }, value),
              // 使用 icon 表示任务已提交
              createElement(Icon, { type: "CheckCircleOutlined", "class": "text-lg text-primary transform -translate-y-1" })
            ]);
          }
          return createElement("div", { "class": "p-4" }, value);
        }
      });
    });
    _.forEach<object>(temp, function (item: object, index: number) {
      list[index + prev.length] = item;
    });
  }
  if (_.includes([2, 3], props.lqrOper)) {
    list = [...list, ...next];
  }
  if (_.includes([2, 3], props.lqfOper)) {
    list = [...list, ...lqf];
  }
  return list;
};


export const fileList = function (fileList: TaskFileItem[]) {
  return _.map(fileList, function (item: TaskFileItem) {
    const key = _.get<TaskFileItem, string>(item, "bilingualFileId");
    return { key, ...item };
  });
};

export const before = async function (callback?: HookFunction | HookFunction[], ...args: any[]) {
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