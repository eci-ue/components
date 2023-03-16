<script setup lang="ts">
/**
 * @file 导出按钮
 * @author svon.me@gmail.com
 */

import * as _ from "lodash-es";
import { api } from "../../api";
import { WorkMode } from "./props";
import { ExportFile } from "./util";
import i18n from "../../utils/i18n";
import * as message from "@ue/message";
import { Button } from "ant-design-vue";
import { PropType, computed } from "vue";

import { hook } from "@ue/utils";
import type { HookFunction } from "@ue/utils";


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
  },
  /** 触发前钩子 */
  before: {
    required: false,
    type: [Function, Array] as PropType<HookFunction | HookFunction[]>
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
  try {
    const status = await hook.run(props.before, ["export", "record"]);
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
  message.error(i18n.message.export.cat);
};
</script>

<template>
  <Button type="primary" :disabled="status" @click.prevent="onClick">{{ i18n.common.label.exportRecord }}</Button>
</template>