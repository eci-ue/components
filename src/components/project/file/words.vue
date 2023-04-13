<script setup lang="ts">
/**
 * @file 任务节点
 * @author svon.me@gmail.com
 */

import Rate from "./rate.vue";
import * as _ from "lodash-es";
import { Icon } from "@ue/icon";
import { before } from "./util";
import i18n from "../../../utils/i18n";
import { WorkMode } from "../../export";
import { PropType, computed } from "vue";
import type { TaskFileStage } from './type';
import type { HookFunction } from "@ue/utils";

const props = defineProps({
  data: {
    required: false,
    type: Object as PropType<TaskFileStage>,
  },
  /** 当前是否为 PM */
  pm: {
    type: Boolean,
    required: false,
    default: () => false
  },
  /** 工作模式 */
  mode: {
    required: true,
    type: String as PropType<WorkMode>,
  },
  // 是否展示分析进度
  rate: {
    required: true,
    type: Boolean
  },
  /** 触发前钩子 */
  before: {
    required: false,
    type: [Function, Array] as PropType<HookFunction | HookFunction[]>
  }
});

// 查看双语文件
const catFileDetail = async function(value?: string): Promise<void> {
  if (value) {
    const status = await before(props.before, "catFile");
    if (status) {
      window.open(value);
    }
  }
};

const url = computed<string>(function() {
  if (props.pm) {
    return "";
  };
  const url = props.data?.catUrl;
  if (url) {
    return url;
  }
  return "";
});

</script>
<template>
  <div class="p-4" :class="{'cursor-pointer': !!url}" @click="catFileDetail(url)">
    <template v-if="rate">
      <Rate :data="data" :mode="mode"></Rate>
    </template>
    <div v-else class="flex items-center justify-between whitespace-nowrap" :class="{'link': !!url}">
      <span>{{ _.toInteger(data?.workLoad) }}</span>
      <span class="flex items-center ml-2" v-show="url">
        <span>{{ i18n.project.label.openFile }}</span>
        <Icon class="flex text-sm ml-1" type="right-outlined"></Icon>
      </span>
    </div>
  </div>
</template>