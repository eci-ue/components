<script setup lang="ts">
/**
 * @file 动态表单 - 选择网盘文件
 * @author svon.me@gmail.com
 */

import { computed, PropType } from "vue";
import Checkbox from "../file/checkbox";

import { FileMeta as Meta } from "./props";

const emit = defineEmits(["update:value", "change"]);

const props = defineProps({
  value: {
    default: () => [],
    type: Array as PropType<Array<string | number>>,
  },
  disabled: {
    type: Boolean,
    default: () => false
  },
  // 动态表单，整个表单的数据
  state: {
    type: Object,
    default: () => {
      return {};
    }
  },
  meta: {
    required: false,
    type: Object as PropType<Meta>,
  }
});

const option = computed<Meta>(function() {
  const value = new Meta();
  return props.meta ? { ...value, ...props.meta } : value;
});

const text = computed<Array<string | number>>({
  get: () => props.value,
  set: (value: Array<string | number>) => {
    emit("update:value", value);
    emit("change", value);
  }
});

</script>
<template>
  <Checkbox 
    v-model:value="text" 
    :multiple="option.multiple" 
    :all="option.all" 
    :disable="option.disable"
    :root-id="option.rootId">
  </Checkbox>
</template>