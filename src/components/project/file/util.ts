
import * as _ from "lodash-es";
import i18n from "../../../utils/i18n";
import { TaskFileItem, TaskFileStage, View } from "./type";

export const headers = function(fileList: TaskFileItem[] = [], view: View = View.innter) {
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
      const { subType = "", current = false } = item;
      if (subType === "T" || subType === "E") {
        showLqr = true;
      }
      temp.push({
        key: "words",
        title: `For ${_.toUpper(subType)} words`,
        width: "120px",
        dataIndex: `taskBilingualFileStageRspList[${index}].workLoad`,
      },
      {
        className: current ? "text-yellow bg-yellow bg-opacity-10" : "",
        key: "resourceName",
        title: _.toUpper(subType),
        width: "200px",
        dataIndex: `taskBilingualFileStageRspList[${index}]`,
      });
    });
    _.forEach<object>(temp, function(item: object, index: number) {
      list[index + prev.length] = item;
    });
  }
  if (showLqr && view === View.innter) {
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