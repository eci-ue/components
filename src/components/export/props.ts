
import type { ColumnsType } from "ant-design-vue/lib/table";


export enum WorkMode {
  Transdoc = "Transdoc",
  Memoq = "MemoQ",
  Offline = "Offline"
}

export const headers = function(mode: WorkMode): ColumnsType<object> {
  if (mode === WorkMode.Memoq) {
    return [
      { title: 'Task Name', dataIndex: "taskName", key: "name" },
      { title: 'Operator', dataIndex: "createUser", key: "operator" },
      { title: 'Apply Time', dataIndex: "applyTime", key: "date" },
      { title: 'Finished Time', dataIndex: "finishTime", key: "date" },
      { title: 'Status', dataIndex: "status", key: "status" },
      { title: 'Operate', dataIndex: "storagePath", key: "operate", align: "center" },
    ];
  }
  return [
    { title: 'Task Name', dataIndex: "fileName", key: "name" },
    { title: 'Operator', dataIndex: "applyBy", key: "operator" },
    { title: 'Apply Time', dataIndex: "applyOn", key: "date" },
    { title: 'Finished Time', dataIndex: "finishOn", key: "date" },
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