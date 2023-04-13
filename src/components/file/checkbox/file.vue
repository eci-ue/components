<script setup lang="ts">
/**
 * @file 文件信息
 */

import { PropType } from "vue";
import { FileIcon as Icon } from "@ue/icon";
import { Checkbox } from "ant-design-vue";
import type { FileItem } from "../props";

const emit = defineEmits(["click"]);

const props = defineProps({
  disable: {
    type: Boolean,
    default: false
  },
  // 是否允许文件多选
  multiple: {
    type: Boolean,
    default: false,
  },
  data: {
    required: true,
    type: Object as PropType<FileItem>
  }
});

const onClick = function(e: Event) {
  emit("click", e, props.data);
};
</script>

<template>
  <div class="w-full flex items-center select-none mb-4 last:mb-0" :class="{'cursor-not-allowed': disable, 'cursor-pointer': !disable}">
    <Checkbox class="mr-2" v-if="multiple" :value="data.id"></Checkbox>
    <div class="flex-1" @click="onClick">
      <Icon :value="data.name" :folder="data.fileId && data.fileId > 0 ? false : true"></Icon>
    </div>
  </div>
</template>