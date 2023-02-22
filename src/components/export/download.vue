<script setup lang="ts">
/**
 * @file 创建文件下载任务
 * @author svon.me@gmail.com
 */

import { api } from "../../api";
import { PropType, computed } from "vue";
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
  },
  // 导出文件类型
  // 1 = Current target files
  // 2 = Current xliff files
  menu: {
    required: false,
    default: () => {
      return [1, 2];
    },
    type: [Array, String, Number] as PropType<string | number | Array<string | number>>,
  }
});

const toArray = function(value: string | number | Array<string | number>): Array<string | number> {
  if (Array.isArray(value)) {
    return [...value];
  }
  return [value];
}


/** 文件导出 */
const onExport = function (value: number | string) {
  api.project.fileExport(
    toArray(props.file), 
    value,
    props.type ? props.type : void 0,
    props.pm ? true : false,
    props.partner ? 2 : 1
  );
};

const menuItems = computed<Array<number | string>>(function() {
  return toArray(props.menu);
});

const menuTexts = {
  "1": "Current target files",
  "2": "Current xliff files"
};

</script>
<template>
  <div class="inline-block">
    <Dropdown :placement="placement" v-if="menuItems.length > 1">
      <Button type="primary" @click.prevent :disabled="disabled">Export FIle</Button>
      <template #overlay>
        <Menu>
          <template v-for="value in menuItems" :key="value">
            <MenuItem @click="onExport(value)">{{ menuTexts[value] }}</MenuItem>
          </template>
        </Menu>
      </template>
    </Dropdown>
    <Button v-else type="primary" @click="onExport(menuItems[0])" :disabled="disabled">Export FIle</Button>
  </div>
</template>