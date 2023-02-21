<script setup lang="ts">
/**
 * @file 导出按钮
 * @author svon.me@gmail.com
 */

import * as _ from "lodash-es";
import { api } from "../../api";
import { useState } from "@ue/utils";
import { ExportFile } from "./util";
import * as message from "@ue/message";
import { Button } from "ant-design-vue";
import { PropType, computed } from "vue";

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
    required: false,
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


const getCatConfig = function() {
  if (props.id && props.language) {
    return api.project.catConfig<CatConfig>(props.id, props.language);
  }
  return new CatConfig();
}

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

const onClick = async function() {
  
  if (props.mode) {
    ExportFile({
      id: props.id,
      language: props.language,
      mode: props.mode,
      pm: props.pm,
      partner: props.partner
    });
    return;
  } else {
    const state = await getCatConfig();
    if (state && state.workMode && state.workMode !== WorkMode.Offline) {
      ExportFile({
        id: props.id,
        language: props.language,
        mode: state.workMode,
        pm: props.pm,
        partner: props.partner
      });
      return;
    }
  }
  message.error("还未设置 Cat Config, 请先设置！");
};
</script>

<template>
  <Button type="primary" :disabled="status" @click.prevent="onClick">Export record</Button>
</template>