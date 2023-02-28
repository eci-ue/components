<script setup lang="ts">
/**
 * @file 动态表单 - 单选框
 * @author svon.me@gmail.com
 * @description 选择的时间，返回数据时已做时区处理
 */

import * as I18n from "src/config/i18n";
import { computed, PropType } from "vue";
import { DatePicker } from "ant-design-vue";
import { date } from "@ue/utils";
import type { FormItemMeta } from "@ue/form/types/props";

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
    type: Object as PropType<FormItemMeta>,
  }
});

const placeholder = computed<string>(function() {
  if (props.meta?.placeholder) {
    return props.meta.placeholder;
  }
  return "Please select Date";
});

const text = computed<string>({
  get: () => props.value,
  set: (value: string) => {
    const time = value ? date.format(value, true) : "";
    emit("update:value", time);
    emit("change", time);
  }
});

</script>
<template>
  <div>
    <DatePicker class="w-full"
      v-model:value="text" 
      :disabled="disabled" 
      :allow-clear="true" 
      :value-format="date.Template.date"
      :placeholder="placeholder">
    </DatePicker>
  </div>
</template>