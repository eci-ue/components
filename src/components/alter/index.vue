<script setup lang="ts">
/**
 * @file task任务提示语
 * @author theresia@eci.com
 */

import { Alert } from "ant-design-vue";
import { api, useState } from "../../api";
import { watch } from "vue";

const engineeringTip = "Pre-Engineering task is in processing, You can’t assign language task until it done"
const $emit = defineEmits(["update:value"]);
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
const { state, execute } = useState.dataExecute(async function () {
  return api.task.getPreTask(props.projectId);
});
onMounted(async () => {
  await execute(50)
  await $emit("update:value", state.value)
  console.log(props.value)
})
</script>

<template>
  <Alert v-if="!state" :message="engineeringTip" type="warning" />
</template>