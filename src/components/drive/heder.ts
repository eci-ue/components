
import type { ColumnsType } from "ant-design-vue/lib/table";
import * as _ from "lodash-es";

export const headers = function(isTask: boolean = false,subType:string): ColumnsType<object> {
  const header = [
    { title: 'File', dataIndex: "fileName", key: "name" },
    { title: 'File Type', dataIndex: "fileExt", key: "type", width: 100 },
    { title: 'Size', dataIndex: "fileSize", key: "fileSize", width: 100 },
    { title: 'Upload Time', dataIndex: "createdTime", key: "date", width: 160 },
    { title: 'Upload Person', dataIndex: "createUser", key: "user", width: 140 },
  ]
  if (isTask && subType != "Pre Engineering"){
    return header
  }
  const languagePairs = { title: 'Language Pairs', dataIndex: "languagePairs", key: "pairs" }
  return _.compact(_.concat(header,languagePairs))
};