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
    title: 'Operator',
    "class": "whitespace-nowrap",
    customRender(data: object) {
      const text = safeGet<string>(data, "text");
      return createElement("span", { "class": "whitespace-nowrap" }, text);
    }
  }
  if (mode === WorkMode.Memoq) {
    return [
      { title: 'Task Name', dataIndex: "taskName", key: "name" },
      { dataIndex: "createUser", ...operator },
      { title: 'Apply Time', dataIndex: "applyTime", key: "date" },
      { title: 'Finished Time', dataIndex: "finishTime", key: "date" },
      { title: 'Status', dataIndex: "status", key: "status" },
      { title: 'Operate', dataIndex: "storagePath", key: "operate", align: "center" },
    ];
  }
  if (pm) {
    return [
      { title: 'Task Name', dataIndex: "fileName", key: "name" },
      { dataIndex: "applyBy", ...operator  },
      { title: 'Apply Time', dataIndex: "applyOn", key: "date" },
      { title: 'Finished Time', dataIndex: "finishOn", key: "date" },
      { title: 'Status', dataIndex: "statusName", key: "status" },
      { title: 'Operate', dataIndex: "storagePath", key: "operate", align: "center" },
    ];
  }
  return [
    { title: 'Task Name', dataIndex: "fileName", key: "name" },
    { dataIndex: "applyBy", ...operator  },
    { title: 'Exported On', dataIndex: "applyOn", key: "date" },
    { title: 'Status', dataIndex: "statusName", key: "status" },
    { title: 'Operate', dataIndex: "storagePath", key: "operate", align: "center" },
  ];
};

export const expanded = [
  { title: '#', dataIndex: "index", key: "index" },
  { title: 'File Name', dataIndex: "value", key: "value" },
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