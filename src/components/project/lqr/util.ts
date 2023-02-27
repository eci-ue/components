
import * as _ from "lodash-es";
import safeGet from "@fengqiaogang/safe-get";

import { FormRadio, FormTextarea, FormUpload, FormRadioSkin } from "../../form";

import type { FormOptionValue } from "@ue/form/types/props";
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

export const partnerItems = function(): FormOptionValue {
  return [
    {
      key: "a",
      lable: "1/4 How would you rate the overall translation quality of the document(s)?",
      component: FormRadio,
      meta: {
        skin: FormRadioSkin.normal,
        list: [
          { value: "1", name: "Ececllent" },
          { value: "2", name: "Good" },
          { value: "3", name: "Fair" },
          { value: "4", name: "Poor" },
          { value: "5", name: "Very Bad" }
        ]
      }
    },
    {
      key: "b",
      lable: "2/4 Which item(s) do you think are the main quality issues of the translation work?",
      component: FormRadio,
      meta: {
        skin: FormRadioSkin.normal,
        list: [
          { value: "1", name: "Accuracy(comprehension)" },
          { value: "2", name: "Readability" },
          { value: "3", name: "Formatting" },
          { value: "4", name: "Terminology" },
          { value: "5", name: "Carelessness(type, Grammatical errors, etc)" }
        ]
      }
    },
    {
      key: "c",
      lable: `3/4 How would you rate the translator's compliance with the project requirement and consistence with language assets, such as project
      instructions, style guide, glossaries, translation memories, ets?
      `,
      component: FormRadio,
      meta: {
        skin: FormRadioSkin.normal,
        list: [
          { value: "1", name: "Good" },
          { value: "2", name: "Fair" },
          { value: "3", name: "Poor" },
        ]
      }
    },
    {
      key: "d",
      lable: `4/4 Would you like to give some specific advice or examples of noteworthy errors?`,
      component: FormTextarea,
    },
    {
      key: "e",
      lable: "LQR File",
      component: FormUpload,
      meta: {
        placeholder: "Please Upload LQR File"
      }
    }
  ];
};