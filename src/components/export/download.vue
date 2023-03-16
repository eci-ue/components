<script setup lang="ts">
/**
 * @file 创建文件下载任务
 * @author svon.me@gmail.com
 */

import { api } from "../../api";
import { hook } from "@ue/utils";
import i18n from "../../utils/i18n";
import * as message from "@ue/message";
import { PropType, computed } from "vue";
import { Dropdown, Button, Menu, MenuItem } from "ant-design-vue";

import type { WorkMode } from "./props";
import type { HookFunction } from "@ue/utils";

const props = defineProps({
  // 功能是否禁用
  disabled: {
    type: Boolean,
    default() {
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
  },
  // 按钮文案
  exportText: {
    type: String,
    required: false,
  },
  /** 触发前钩子 */
  before: {
    required: false,
    type: [Function, Array] as PropType<HookFunction | HookFunction[]>
  }
});

const toArray = function (value: string | number | Array<string | number>): Array<string | number> {
  if (Array.isArray(value)) {
    return [...value];
  }
  return [value];
}

const menuItems = computed<string[]>(function () {
  return toArray(props.menu).map(String);
});

const menuTexts = new Map<string, string>();
menuTexts.set("2", i18n.project.export.target);
menuTexts.set("1", i18n.project.export.xliff);


/** 文件导出 */
const onExport = async function (value: number | string) {
  try {
    const status = await hook.run(props.before, ["download", value]);
    if (!status) {
      return false;
    }
  } catch (error) {
    const tips: string = error?.message;
    if (tips) {
      message.error(tips);
    }
    return false;
  }

  if (menuTexts.has(String(value))) {
    api.project.fileExport(
      toArray(props.file),
      value,
      props.type ? props.type : void 0,
      props.pm ? true : false,
      props.partner ? 2 : 1
    );
  } else {
    message.error(i18n.message.SYSTEM_ERROR);
  }
};

const exportFIle = computed<string>(() => {
  if (props.exportText) {
    return props.exportText
  }
  return i18n.common.label.export
})

</script>
<template>
  <div class="inline-block">
    <Dropdown :placement="placement" v-if="menuItems.length > 1">
      <Button type="primary" @click.prevent :disabled="disabled">Export FIle</Button>
      <template #overlay>
        <Menu>
          <template v-for="value in menuItems" :key="value">
            <MenuItem v-if="menuTexts.has(value)" @click="onExport(value)">{{ menuTexts.get(value) }}</MenuItem>
          </template>
        </Menu>
      </template>
    </Dropdown>
    <Button v-else type="primary" @click="onExport(menuItems[0])" :disabled="disabled">{{exportFIle}}</Button>
</div>
</template>