<script setup lang="ts">
/**
 * @file 动态表单 - 文本输入框
 * @author svon.me@gmail.com
 */

import * as _ from "lodash-es";
import { computed, PropType } from "vue";
import { CheckboxGroup, Checkbox } from "ant-design-vue";
import { FormCheckboxSkin as Skin } from "./type";

import type { CheckboxItem as Item, CheckboxMeta as Meta } from "./props";

const emit = defineEmits(["update:value", "change"]);

const props = defineProps({
  value: {
    type: Array as PropType<Array<string | number>>,
    default: () => []
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

const checkboxList = computed<Item[]>(function() {
  if (props.meta?.list) {
    return props.meta?.list;
  }
  return [];
});
const skin = computed<Skin>(function() {
  if (props.meta?.skin) {
    return props.meta?.skin;
  }
  return Skin.cover; // 默认效果
});

const text = computed<Array<string | number>>({
  get: () => props.value,
  set: (value: Array<string | number>) => {
    emit("update:value", _.concat(value));
    emit("change", _.concat(value));
  }
});

</script>
<template>
  <div :class="`checkbox-${skin}`">
    <CheckboxGroup class="w-full" v-model:value="text">
      <template v-for="item in checkboxList" :key="item.value">
        <Checkbox :disabled="!!(disabled || item.disabled)" :value="item.value">{{ item.name || item.text }}</Checkbox>
      </template>
    </CheckboxGroup>
  </div>
</template>

<style scoped lang="scss">
%border {
  @apply border-border-color border-solid border;
  
}
.checkbox-contain, .checkbox-vertical {
  .ant-checkbox-wrapper {
    @apply py-1 px-3;
    @extend %border;
  }
}
.checkbox-cover {
  @extend %border;
  .ant-checkbox-group {
    @apply flex justify-between;
  }
  .ant-checkbox-wrapper {
    @apply flex-1 py-1 mr-0 px-3;
    @apply border-l border-border-color border-solid;
    @apply first:border-l-0;
  }
}
.checkbox-vertical {
  .ant-checkbox-group {
    @apply grid grid-cols-1;
    .ant-checkbox-wrapper {
      @apply ml-0 mt-2 first:mt-0;
    }
  }
}
</style>