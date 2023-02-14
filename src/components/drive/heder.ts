
import type { ColumnsType } from "ant-design-vue/lib/table";

export const headers = function(isTask: boolean = false): ColumnsType<object> {
  return [
    { title: 'File', dataIndex: "fileName", key: "name" },
    { title: 'File Type', dataIndex: "fileExt", key: "type", width: 100 },
    { title: 'Upload Time', dataIndex: "createdTime", key: "date" },
    { title: 'Language Pairs', dataIndex: "languagePairs", key: "pairs" },
  ]
};