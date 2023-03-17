import * as _ from "lodash-es";
import i18n from "../../utils/i18n";
import type { ColumnsType } from "ant-design-vue/lib/table";

export const headers = function(isTask: boolean = false,subType:string): ColumnsType<object> {
  const header = [
    { title: i18n.part(i18n.common.label.file, 0), dataIndex: "fileName", key: "name" },
    { title: i18n.common.label.fileType, dataIndex: "fileExt", key: "type", width: 100 },
    { title: i18n.common.label.size, dataIndex: "fileSize", key: "size", width: 100 },
    { title: i18n.common.label.uploadTime, dataIndex: "createTime", key: "date", width: 160 },
    { title: i18n.common.label.uploadPerson, dataIndex: "createUser", key: "user", width: 140 },
  ]
  if (isTask && subType != "Pre Engineering"){
    return header
  }
  const languagePairs = { title: i18n.common.label.languagePairs, dataIndex: "languagePairs", key: "pairs" }
  return _.compact(_.concat(header,languagePairs))
};