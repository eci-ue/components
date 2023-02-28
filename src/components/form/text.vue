<script setup lang="ts">
/**
 * @file 动态表单 - 文本输入框
 * @author svon.me@gmail.com
 */

import { computed, PropType } from "vue";
import { Input } from "ant-design-vue";
import type { FormItemMeta } from "@ue/form/types/props";

interface Meta extends FormItemMeta{
  maxLength?: number;
}

const emit = defineEmits(["update:value", "change"]);

const props = defineProps({
  value: {
    type: String,
    default: ""
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

const placeholder = computed<string | undefined>(function() {
  if (props.meta?.placeholder) {
    return props.meta.placeholder;
  }
});

const maxLength = computed<number>(function() {
  const value = props.meta?.maxLength;
  if (value) {
    return value;
  }
  return 250;
})

const text = computed<string>({
  get: () => props.value,
  set: (value: string) => {
    emit("update:value", value);
    emit("change", value);
  }
});

</script>
<template>
  <div>
    <Input autocomplete="off" v-model:value="text" :disabled="disabled" :placeholder="placeholder" :maxlength="maxLength"></Input>
  </div>
</template>