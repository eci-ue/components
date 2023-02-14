<script setup lang="ts">
/**
 * @file 动态表单 - 选择网盘文件
 * @author svon.me@gmail.com
 */

import { computed, PropType } from "vue";
import Checkbox from "../file/checkbox";
import type { FormItemMeta } from "@ue/form/types/props";

class Meta implements FormItemMeta{
  rootId: string | number = 0; // 跟节点 ID
  disable: Array<string | number> = []; // 不允许选择的文件
  all: boolean = false; // 是否查询所有文件，包括个人文件与收到的分享文件
  multiple: boolean = false; // 是否多选？为 false 不展示文件，只展示文件夹
}

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