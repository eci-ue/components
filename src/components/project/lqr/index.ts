
import { form, confirm } from "@ue/modal";
import AddLqrForm from "./add.vue";
import { partnerItems } from "./util";
import i18n from "../../../utils/i18n";

import type { Component } from "vue";
import type { ModalFuncProps } from "ant-design-vue";

interface Option {
  lqType: number |string;     /** 类型 1：lqr 2:lqa 3:lqf */
  disabled: boolean;     // 是否禁用
  id: string | number;   // 任务ID
  file: string | number; // 双语文件ID
  partner?: boolean;     // 是否为外部议员
}

/**
 * 添加 Lqr 报告
 * @param option    参数
 * @param config    弹框属性
 */
export const AddLqr = function<T>(option: Option, config: ModalFuncProps = {}, data: object = {}) {
  const params = { taskId: option.id, fileId: option.file, lqType: option.lqType };
  if (option.partner) {
    if (config.onOk) {
      const callback = config.onOk;
      config.onOk = function(value: object) {
        return callback(Object.assign(value, params));
      };
    }
    return form<T>(partnerItems(data, option.disabled, option.lqType, option.id), Object.assign({
      width: 920,
      title: i18n.lqr.title.lqrReport
    }, config || {}));
  }
  return confirm<Component, T>(AddLqrForm, Object.assign(
    { 
      width: 380, 
      okText: i18n.common.button.save,
      title: i18n.part(i18n.lqr.title.lqrUpload, 1, { lqTypeName: option.lqType == 1? "LQR" : "LQF" })
    }, config || {}
  ), Object.assign(params, { value: data, disabled: option.disabled }));
}