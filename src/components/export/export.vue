<script setup lang="ts">
/**
 * @file 导出按钮
 * @author svon.me@gmail.com
 */

import * as _ from "lodash-es";
import { ExportFile } from "./util";
import { PropType, computed } from "vue";
import { api } from "../../api";
import { useState } from "@ue/utils";
import * as message from "@ue/message";

import { WorkMode } from "./props";

const props = defineProps({
  // 项目ID
  id: {
    required: true,
    type: [String, Number],
  },
  // 语言ID
  language: {
    required: true,
    type: [String, Number],
  },
  // 工作模式
  mode: {
    required: true,
    type: String as PropType<WorkMode>,
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
  // 禁用
  disabled: {
    type: Boolean,
    required: false,
    default: () => false
  }
});

class CatConfig {
  disabled: boolean = false;
  templateId?: number;
  workMode?: WorkMode;
}


const { state } = useState.data<CatConfig>(async function() {
  return api.project.catConfig(props.id, props.language);
});

const status = computed<boolean>(function() {
  if (props.disabled) {
    return true;
  }
  // 项目ID 或者 语言ID 为空时
  if (_.isNil(props.id) || _.isNil(props.language)) {
    return true;
  }
  return false;
});

const onClick = function() {
  if (state.value.templateId) {
    ExportFile({
      id: props.id,
      language: props.language,
      mode: props.mode || state.value.workMode,
      pm: props.pm,
      partner: props.partner
    });
  } else {
    message.error("还未设置 Cat Config, 请先设置！");
  }
};
</script>

<template>
  <Button type="primary" :disabled="status || state.workMode === WorkMode.Offline" @click.prevent="onClick">Export record</Button>
</template>