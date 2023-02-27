<script setup lang="ts">
/**
 * @file 分析进度
 * @author svon.me@gmail.com
 */

import * as _ from "lodash-es";
import { PropType } from "vue";
import { Progress } from "ant-design-vue";

import { WorkMode } from "../../export";

import type { TaskFileStage } from "./type";


defineProps({
  data: {
    required: true,
    type: Object as PropType<TaskFileStage>,
  },
  mode: {
    required: true,
    type: String as PropType<WorkMode>,
  }
});
</script>

<template>
  <div>
    <template v-if="data && data.resourceName">
      <p class="mb-0 text-sm">{{ data.resourceName }}</p>
      <template v-if="mode !== WorkMode.Offline">
        <Progress :percent="_.toNumber(data.rate || 0)"></Progress>
      </template>
    </template>
    <span v-else>--</span>
  </div>
</template>