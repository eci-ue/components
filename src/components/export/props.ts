import i18n from "../../utils/i18n";
import { h as createElement } from "vue";
import safeGet from "@fengqiaogang/safe-get";
import type { ColumnsType } from "ant-design-vue/lib/table";

export enum ExportStatus {
  prepare = 0, // 未开始
  inPogress,   // 进行中
  success,     // 完成
  abnormal,    // 异常
}

export enum WorkMode {
  Transdoc = "Transdoc",
  Memoq = "MemoQ",
  Offline = "Offline"
}

export const headers = function(mode: WorkMode, pm: boolean = false): ColumnsType<object> {
  const operator = {
    key: "operator", 
    title: i18n.project.label.operator,
    "class": "whitespace-nowrap",
    customRender(data: object) {
      const text = safeGet<string>(data, "text");
      return createElement("span", { "class": "whitespace-nowrap" }, text);
    }
  }
  if (mode === WorkMode.Memoq) {
    return [
      // { title: i18n.project.label.taskName, dataIndex: "taskName", key: "name" },
      { dataIndex: "createUser", ...operator },
      { title: i18n.project.label.applyTime, dataIndex: "applyTime", key: "date" },
      { title: i18n.project.label.finishTime, dataIndex: "finishTime", key: "date" },
      { title: i18n.common.label.status, dataIndex: "status", key: "status" },
      { title: i18n.project.label.operate, dataIndex: "storagePath", key: "operate", align: "center" },
    ];
  }
  if (pm) {
    return [
      // { title: i18n.project.label.taskName, dataIndex: "fileName", key: "name" },
      { dataIndex: "applyBy", ...operator  },
      { title: i18n.project.label.applyTime, dataIndex: "applyOn", key: "date" },
      { title: i18n.project.label.finishTime, dataIndex: "finishOn", key: "date" },
      { title: i18n.common.label.status, dataIndex: "statusName", key: "status" },
      { title: i18n.project.label.operate, dataIndex: "storagePath", key: "operate", align: "center" },
    ];
  }
  return [
    // { title: i18n.project.label.taskName, dataIndex: "fileName", key: "name" },
    { dataIndex: "applyBy", ...operator  },
    { title: i18n.project.label.exportedOn, dataIndex: "applyOn", key: "date" },
    { title: i18n.common.label.status, dataIndex: "statusName", key: "status" },
    { title: i18n.project.label.operate, dataIndex: "storagePath", key: "operate", align: "center" },
  ];
};

export const expanded = [
  { title: '#', dataIndex: "index", key: "index" },
  { title: i18n.project.label.fileName, dataIndex: "value", key: "value" },
]

export interface ExportedFile {
  fileNumber: string | number;
  filePath: string;
}

export interface Data {
  status: number;
  fileName: string;    // 文件名称
  storagePath: string; // 文件地址

  fileNames: string; // memoq 导出文件列表
  exportedFiles: ExportedFile[]; // TransDoc 导出文件列表
  [key: string]: any;
}

export interface Props {
  id: string | number;  // 项目ID
  language: string | number; // 语言ID
  mode?: WorkMode;      // 工作模式，如果该子段为空，则从项目详情中获取
  pm?: boolean;         // 当前用户是否为 PM
  partner?: boolean;    // 是否为外部任务
}