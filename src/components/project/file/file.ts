/**
 * @file 选择双语文件
 * @author svon.me@gmail.com
 */

import * as _ from "lodash-es";
import View from "./select.vue";
import { api } from "../../../api";
import * as modal from "@ue/modal";
import i18n from "../../../utils/i18n";
import * as message from "@ue/message";
import safeGet from "@fengqiaogang/safe-get";

export const selectBilingualFile = async function (taskId: string | number, fileId: string | number, type: string | number = 1, user: string = "") {
  // 获取双语文件下的同组双语文件列表
  let lqrRelateBilingualFileIds: Array<string | number> = [];

  const group = await api.project.getGroupBilingualFile(taskId, fileId, type);
  if (group.total > 1) {
    const files = group.results.map(item => {
      return { ...item, user };
    });
    const data = await modal.confirm(View, { title: i18n.project.lqa.select, width: 480 }, { list: files });
    if (data) {
      const value = safeGet<Array<string | number>>(data, "value") || [];
      if (_.size(value) > 0) {
        lqrRelateBilingualFileIds = value;
      }
    }
  } else {
    const list = group.results.map((data: { id: string | number }) => data.id);
    if (_.size(list) < 1) {
      message.error(i18n.project.lqa.file.empty);
      return [];
    }
    lqrRelateBilingualFileIds = list;
  }

  return lqrRelateBilingualFileIds;
}