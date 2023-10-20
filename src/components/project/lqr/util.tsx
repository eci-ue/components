
import * as _ from "lodash-es";
import i18n from "../../../utils/i18n";
import safeGet from "@fengqiaogang/safe-get";
import { rule as rules } from "@ue/utils";
import { FormRadio, FormTextarea, FormUpload, FormRadioSkin } from "../../form";

import type { UploadFile } from "@ue/upload";
import type { FormOptionValue } from "@ue/form";
import type { ColumnsType } from "ant-design-vue/lib/table";

export const headers: ColumnsType<object> = [
  { title: i18n.lqr.title.job, dataIndex: "resourceName", key: "name" },
  { title: i18n.lqr.title.task, dataIndex: "words", key: "words", align: "right" },
  { title: i18n.lqr.title.modify, dataIndex: "modify", key: "modify", align: "right" },
  { title: i18n.lqr.title.adjustWorkload, dataIndex: "adjustWorkload", key: "adjustWorkload", align: "right" },
  { title: i18n.lqr.title.words, dataIndex: "paidWords", key: "words", align: "right" },
  { title: i18n.lqr.title.remark, dataIndex: "remark", key: "remark" }
];

const showNumber = function (words: number, paidWords: number): string | undefined {
  const value = Number((paidWords - words).toFixed(0))
  if (value > 0) {
    return `+${value}`
  }
  return String(value);
}

export const list = function (results: object[], lqType: string | number) {
  return _.map(results, function (item: object, index: number) {
    return {
      index: index,
      level: _.toInteger(safeGet<number>(item, "level")),
      key: `${safeGet<string>(item, "ttaskId")}.${safeGet<string>(item, "etaskId")}`,
      list: [
        // T
        {
          resourceName: (lqType == 1 ? "T" : "E") + safeGet<string>(item, "tresourceName"),
          words: safeGet<number>(item, "twords"),
          modify: _.toNumber(safeGet<number>(item, "tadjustPercent")),
          adjustWorkload: showNumber((safeGet<number>(item, "twords") || 0), (safeGet<number>(item, "tpaidWords") || 0)),
          paidWords: safeGet<number>(item, "tpaidWords"),
          remark: safeGet<string>(item, "remark")
        },
        // E
        {
          resourceName:  (lqType == 1 ? "E" : "P") + safeGet<string>(item, "eresourceName"),
          words: safeGet<number>(item, "ewords"),
          modify: _.toNumber(safeGet<number>(item, "eadjustPercent")),
          adjustWorkload: showNumber((safeGet<number>(item, "ewords") || 0), (safeGet<number>(item, "epaidWords") || 0)),
          paidWords: safeGet<number>(item, "epaidWords"),
          remark: safeGet<string>(item, "remark")
        }
      ]
    };
  })
};

const toValue = function (value?: string | number): string | undefined {
  if (value || value === 0) {
    return String(value);
  }
}

export const partnerItems = function (data: object = {}, disabled: boolean = false,lqType: string | number, taskId?: string | number): FormOptionValue {
  let lqTypeName = ""
  if (lqType == 1){
    lqTypeName = "LQR"
  }else if (lqType == 3){
    lqTypeName = "LQF"
  }
  return [
    {
      from: false,
      component: (<div>
        <p>{i18n.lqr.form.description1}</p>
        <p>{i18n.lqr.form.description2}</p>
      </div>)
    },
    {
      className: "border border-solid border-gray-300 p-4 rounded",
      children: [
        {
          key: "rateDocument",
          disabled,
          lable: i18n.lqr.form.case1,
          component: FormRadio,
          value: toValue(safeGet<string>(data, "overallQuality")),
          rules: disabled ? [] : rules.text(i18n.template(i18n.common.placeholder.select, { label: "" })),
          meta: {
            skin: FormRadioSkin.normal,
            list: [
              { value: "1", name: i18n.lqr.form.option.ececllent },
              { value: "2", name: i18n.lqr.form.option.good },
              { value: "3", name: i18n.lqr.form.option.fair },
              { value: "4", name: i18n.lqr.form.option.poor },
              { value: "5", name: i18n.lqr.form.option.verybad }
            ]
          }
        },
        {
          key: "rateWork",
          disabled,
          lable: i18n.lqr.form.case2,
          component: FormRadio,
          value: toValue(safeGet<string>(data, "itemQuality")),
          rules: disabled ? [] : rules.text(i18n.template(i18n.common.placeholder.select, { label: "" })),
          meta: {
            skin: FormRadioSkin.normal,
            list: [
              { value: "1", name: i18n.lqr.form.option.accuracy },
              { value: "2", name: i18n.lqr.form.option.readability },
              { value: "3", name: i18n.lqr.form.option.formatting },
              { value: "4", name: i18n.lqr.form.option.terminology },
              { value: "5", name: i18n.lqr.form.option.carelessness }
            ]
          }
        },
        {
          key: "rateCompliance",
          disabled,
          lable: i18n.lqr.form.case3,
          component: FormRadio,
          value: toValue(safeGet<string>(data, "rate")),
          rules: disabled ? [] : rules.text(i18n.template(i18n.common.placeholder.select, { label: "" })),
          meta: {
            skin: FormRadioSkin.normal,
            list: [
              { value: "1", name: i18n.lqr.form.option.good },
              { value: "2", name: i18n.lqr.form.option.fair },
              { value: "3", name: i18n.lqr.form.option.poor },
            ]
          }
        },
        {
          key: "advice",
          disabled,
          lable: i18n.lqr.form.case4,
          component: FormTextarea,
          value: safeGet<string>(data, "advice"),
          rules: disabled ? [] : rules.text(i18n.lqr.form.comment),
          meta: {
            maxLength: 1000
          }
        },
        {
          key: "LQRFileUrl",
          disabled,
          lable: (<span>
            <span>{i18n.part(i18n.lqr.title.lqrFile, 1, { lqTypeName: lqTypeName })}</span>
            <a class="ml-2" target="_blank" href={`https://static.eciol.com/template/prod/` + (lqType==1?`lqr_template.xlsx`:`lqf_template.xls`)} download={lqTypeName + `_template.xlsx`}>
              {i18n.part(i18n.lqr.form.download, 1, { lqTypeName: lqTypeName })}
            </a>
          </span>),
          component: FormUpload,
          rules: disabled ? [] : rules.text( i18n.part(i18n.lqr.form.upload, 1, { lqTypeName: lqTypeName }) ),
          value: safeGet<string>(data, "storagePath"),
          meta: {
            taskId,
            preview: true,
            placeholder: i18n.part(i18n.lqr.form.upload, 1, { lqTypeName: lqTypeName }),
            transform: function (data: UploadFile): string | undefined {
              if (data && data.url) {
                return data.url;
              }
            }
          },
        }
      ]
    }
  ];
};