<script setup lang="ts">
/**
 * @file task任务提示语
 * @author theresia@eci.com
 */

import * as _ from "lodash-es";
import { Alert } from "ant-design-vue";
import { api } from "../../api";
import { useState } from "@ue/utils";
import { computed } from "vue";
import { TaskInterruptType } from "./props";

const $emit = defineEmits(["update:value", "state"]);
const props = defineProps({
  //项目id或任务id
  id: {
    type: [Number, String],
    required: true
  },
  // 是否启动
  value: {
    type: Boolean
  },
  //是否为PM端
  isPm: {
    type: Boolean,
    default: true
  }
});
// 获取项目的前置任务是否完成
const { state } = useState.data<TaskInterruptType>(async function () {
  if (props.isPm) {
    const status = await api.task.getPreTask(props.id);
    return new TaskInterruptType("", status);
  }
  return api.task.isTaskInterrupted<TaskInterruptType>(props.id);
});

const disabled = computed<Boolean>(() => {
  if (state.value.isInterrupted) {
    $emit("update:value", state.value.isInterrupted)
    $emit("state", state.value.isInterrupted)
    return false;
  }
  return true;
  // if (props.isPm) {
  //   if (_.isBoolean(state.value)) {
  //     $emit("update:value", state.value)
  //     $emit("state", state.value)
  //     return state.value
  //   }
  //   return true
  // } else {//议员端
  //   return !state.value.isInterrupted
  // }
});

//提示语
const interruptedTip = computed(() => {
  if (props.isPm) {
    return "Pre-Engineering task is in processing, You can’t assign language task until it done";
  } else {
    return `This task was interrupted, please submit your files you have Partially or Fully done. Reason:${state.value.interruptReason || '-'}`
  }
})
</script>

<template>
  <Alert v-show="disabled" :message="interruptedTip" type="warning" />
</template>