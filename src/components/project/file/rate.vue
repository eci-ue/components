<script setup lang="ts">
/**
 * @file 分析进度
 * @author svon.me@gmail.com
 */

import * as _ from "lodash-es";
import Icon from "../../icon";
import { PropType, computed } from "vue";
import i18n from "../../../utils/i18n";
import { Progress, Space } from "ant-design-vue";

import { WorkMode } from "../../export";

import type { TaskFileStage } from "./type";

const props = defineProps({
  data: {
    required: false,
    type: Object as PropType<TaskFileStage>,
  },
  mode: {
    required: true,
    type: String as PropType<WorkMode>,
  }
});

const rate = computed<number>(function() {
  if (props.mode === WorkMode.Transdoc) {
    return _.toInteger(props.data?.rate || 0);
  }
  return _.toNumber(props.data?.rate || 0);
});

const isQa = function(type: string): boolean {
  if(_.toUpper(type) === "QA") {
    return true;
  }
  return false;
}
</script>

<template>
  <div>
    <template v-if="data && data.resourceName">
      <p class="mb-0 text-sm">{{ data.resourceName }}</p>
      <template v-if="mode === WorkMode.Transdoc && isQa(data.subType)">
        <Space v-if="rate === 3">
          <Icon class="flex text-primary" type="check-circle-filled"></Icon>
          <span>{{ i18n.project.label.completed }}</span>
        </Space>
        <Space v-else-if="rate === 2">
          <Icon class="flex text-yellow" type="clock-circle-filled"></Icon>
          <span>{{ i18n.project.status.inProgress }}</span>
        </Space>
        <Space v-else>
          <Icon class="flex text-red" type="close-circle-filled"></Icon>
          <span>{{ i18n.project.label.notStarted }}</span>
        </Space>
      </template>
      <template v-else>
        <Progress :percent="rate"></Progress>
      </template>
    </template>
    <span v-else>--</span>
  </div>
</template>