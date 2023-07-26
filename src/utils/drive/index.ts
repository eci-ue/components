/**
 * @file 文件管理
 */

import { confirm } from "@ue/modal";
import Drive from "../../components/drive";
import { Props } from "../../components/drive/props";

import type { Component } from "vue";
import type { ModalFuncProps } from "ant-design-vue";


const DriveFile = function<T>(title: string | ModalFuncProps = "Documents", props: Props) {
  const option: ModalFuncProps = typeof title === "string" ? { title, width: 1000 } : title;
  return confirm<Component, T, Props>(Drive, option, props);
};

export default DriveFile;