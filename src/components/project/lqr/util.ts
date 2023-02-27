
import * as _ from "lodash-es";
import safeGet from "@fengqiaogang/safe-get";
import type { ColumnsType } from "ant-design-vue/lib/table";

export const headers: ColumnsType<object> = [
  { title: "Job", dataIndex: "resourceName", key: "name" },
  { title: "Task Words", dataIndex: "words", key: "words", align: "right" },
  { title: "Modify", dataIndex: "modify", key: "modify", align: "right" },
  { title: "Paid Words", dataIndex: "paidWords", key: "words", align: "right" }
];

export const list = function(results: object[]) {
  return _.map(results, function(item: object, index: number) {
    return {
      index: index,
      level: _.toInteger(safeGet<number>(item, "level")),
      key: `${safeGet<string>(item, "ttaskId")}.${safeGet<string>(item, "etaskId")}`,
      list: [
        // T
        {
          resourceName: "T" + safeGet<string>(item, "tresourceName"),
          words: safeGet<number>(item, "twords"),
          modify: _.toNumber(safeGet<number>(item, "tadjustPercent")),
          paidWords: safeGet<number>(item, "tpaidWords"),
        },
        // E
        {
          resourceName: "E" + safeGet<string>(item, "eresourceName"),
          words: safeGet<number>(item, "ewords"),
          modify: _.toNumber(safeGet<number>(item, "eadjustPercent")),
          paidWords: safeGet<number>(item, "epaidWords"),
        }
      ]
    };
  })
};