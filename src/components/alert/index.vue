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
const engineeringTip = "Pre-Engineering task is in processing, You can’t assign language task until it done"
const $emit = defineEmits(["update:value", "state"]);
const props = defineProps({
  //项目id
  projectId: {
    type: [Number, String],
    required: true
  },
  // 是否启动
  value: {
    type: Boolean
  }
});
// 获取项目的前置任务是否完成
const { state } = useState.data(async function () {
  return api.task.getPreTask(props.projectId)
});
const disabled = computed<Boolean>(() => {
  if (_.isBoolean(state.value)) {
    $emit("update:value", state.value)
    $emit("state", state.value)
    return state.value
  }
  return true

})
</script>

<template>
  <Alert v-show="!disabled" :message="engineeringTip" type="warning" />
</template>