<script setup lang="ts">
/**
 * @file task任务提示语
 * @author theresia@eci.com
 */

import { Alert } from "ant-design-vue";
import * as _ from "lodash-es";
import { api, useState } from "../../api";
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
  return api.task.getPreTask(props.projectId);
});
const show = computed<Boolean>(() => {
  if (_.isBoolean(state.value)) {
    $emit("update:value", state.value)
    $emit("state", state.value)
    return state.value
  }
  return false

})
</script>

<template>
  <Alert v-if="!show" :message="engineeringTip" type="warning" />
</template>