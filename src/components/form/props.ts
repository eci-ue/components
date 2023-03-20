
import type { FormItemMeta } from "@ue/form";
import type { UploadFile } from "../upload/props";
import type { FormCheckboxSkin, FormRadioSkin } from "./type";

export interface CheckboxItem {
  value: string | number;
  name: string;
  text?: string;
  disabled?: boolean;
};

export interface CheckboxMeta extends FormItemMeta{
  mode: string;
  skin: FormCheckboxSkin;
  list: Array<CheckboxItem>;
}


export interface DateMeta extends FormItemMeta {
  showTime: boolean;        // 时分秒
  disabledBrfore: boolean;  // 禁用之前的时间
  disabledSameDay: boolean; // 禁用当天，默认不禁用
}


export class FileMeta implements FormItemMeta{
  rootId: string | number = 0; // 跟节点 ID
  disable: Array<string | number> = []; // 不允许选择的文件
  all: boolean = false; // 是否查询所有文件，包括个人文件与收到的分享文件
  multiple: boolean = false; // 是否多选？为 false 不展示文件，只展示文件夹
}

export interface NumberMeta extends FormItemMeta {
  max?: number;
  afterIcon?: any;
}

export interface RadioItem {
  value: string | number;
  name: string;
  text?: string;
  disabled?: boolean
}

export interface RadioMeta extends FormItemMeta{
  color?: string;
  skin?: FormRadioSkin;
  list?: Array<RadioItem>
}

export interface TextMeta extends FormItemMeta{
  maxLength?: number;
}

export interface TextAreaMeta extends FormItemMeta{
  maxLength?: number;
}


export interface UploadMeta extends FormItemMeta {
  transform?: (value: UploadFile) => any
}