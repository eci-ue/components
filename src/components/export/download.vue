<script setup lang="ts">
/**
 * @file 创建文件下载任务
 * @author svon.me@gmail.com
 */

import * as _ from "lodash-es";
import { api } from "../../api";
import { PropType } from "vue";
import { Dropdown, Button, Menu, MenuItem } from "ant-design-vue";

import type { WorkMode } from "./props";

const props = defineProps({
  // 功能是否禁用
  disabled: {
    type: Boolean,
    default () {
      return false;
    }
  },
  /** 文件ID / 文件ID列表 */
  file: {
    required: true,
    type: [String, Number, Array] as PropType<string | number | Array<string | number>>,
  },
  // 服务小类
  type: {
    type: String,
    required: false,
  },
  // 是否为 PM
  pm: {
    type: Boolean,
    required: false,
    default: () => false
  },
  // 是否为外部任务
  partner: {
    type: Boolean,
    required: false,
    default: () => false
  },
  // 工作模式
  mode: {
    required: false,
    type: String as PropType<WorkMode>,
  },
  // 按钮位置
  placement: {
    type: String as PropType<any>,
    default: "bottomRight"
  }
});


/** 文件导出 */
const onExport = function (value: number) {
  api.project.fileExport(
    _.concat(props.file), 
    value,
    props.type ? props.type : void 0,
    props.pm ? true : false,
    props.partner ? 2 : 1
  );
};

</script>
<template>
  <Dropdown :placement="placement">
    <Button type="primary" @click.prevent :disabled="disabled">Export FIle</Button>
    <template #overlay>
      <Menu>
        <MenuItem @click="onExport(1)">Current target files</MenuItem>
        <MenuItem @click="onExport(2)">Current xliff files</MenuItem>
      </Menu>
    </template>
  </Dropdown>
</template>