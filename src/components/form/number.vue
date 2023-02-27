<script setup lang="ts">
/**
 * @file 动态表单 - 数字输入框
 * @author theresia@eci.com
 */

import * as _ from "lodash-es";
import { computed, PropType } from "vue";
import { InputNumber } from "ant-design-vue";
import type { FormItemMeta } from "@ue/form/types/props";


interface Meta extends FormItemMeta {
  max?: number;
  afterIcon?: any;
}

const emit = defineEmits(["update:value", "change"]);

const props = defineProps({
  value: {
    type: Number,
    default: "",
  },
  // 动态表单，整个表单的数据
  state: {
    type: Object,
    default: () => {
      return {};
    }
  },
  disabled: {
    type: Boolean,
    default: () => false
  },
  meta: {
    required: false,
    type: Object as PropType<Meta>,
  },
});

const max = computed<number | undefined>(function () {
  if (props.meta?.max) {
    return props.meta.max;
  }
});
const min = computed<number | undefined>(function () {
  if (_.isNumber(props.meta?.min)) {
    return props.meta?.min;
  }
});
const precision = computed<number | undefined>(function () {
  if (_.isNumber(props.meta?.precision)) {
    return props.meta?.precision;
  }
});

const placeholder = computed<string | undefined>(function() {
  if (props.meta?.placeholder) {
    return props.meta.placeholder;
  }
});

const afterIcon = computed<string | boolean | undefined>(function () {
  if (props.meta?.afterIcon) {
    return props.meta.afterIcon;
  }
});

const text = computed<number>({
  get: () => props.value,
  set: (value: number) => {
    emit("update:value", value);
    emit("change", value);
  },
});
</script>
<template>
  <div>
    <InputNumber :disabled="disabled" v-model:value="text" :min="min" :max="max" :precision="precision" :placeholder="placeholder" class="w-full">
      <template v-if="afterIcon" #addonAfter>%</template>
    </InputNumber>
  </div>
</template>
