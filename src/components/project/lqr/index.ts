
import { form } from "@ue/form";
import { confirm } from "@ue/model";
import AddLqrForm from "./add.vue";
import { partnerItems } from "./util";
import type { Component } from "vue";
import type { ModalFuncProps } from "ant-design-vue";

interface Option {
  id: string | number;   // 任务ID
  file: string | number; // 双语文件ID
  partner?: boolean;     // 是否为外部议员
}

/**
 * 添加 Lqr 报告
 * @param option    参数
 * @param config    弹框属性
 */
export const AddLqr = function<T>(option: Option, config: ModalFuncProps = {}) {
  const params = { taskId: option.id, fileId: option.file };
  if (option.partner) {
    if (config.onOk) {
      const callback = config.onOk;
      config.onOk = function(value: object) {
        return callback(Object.assign(value, params));
      };
    }
    return form<T>(partnerItems(), Object.assign({
      width: 920,
      title: "Submit Targeted Quality Report"
    }, config || {}));
  }
  return confirm<Component, T>(AddLqrForm, Object.assign({ 
    title: "Upload LQR", width: 380, okText: "Save" }, config || {}
  ), params);
}