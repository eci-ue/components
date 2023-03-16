
import i18n from "../../utils/i18n";
import * as modal from "@ue/model";
import ExportRecord from "./record.vue";

import type { Props } from "./props";

/**
 * 获取下载任务列表
 * @param projectId  项目ID
 * @param languageId 源语言ID
 * @param mode       工作模式
 * @returns 
 */
export const ExportFile = async function(props: Props) {
  const config = { width: 1024, title: i18n.project.export.task };
  return modal.confirm(ExportRecord, config, props);
}