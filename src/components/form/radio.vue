<script setup lang="ts">
/**
 * @file 动态表单 - 文本输入框
 * @author svon.me@gmail.com
 */

import { computed, PropType } from "vue";
import { FormRadioSkin as Skin } from "./type";

import Icon from "../icon";
import { RadioGroup, Radio, RadioButton, Space } from "ant-design-vue";

import type { RadioMeta as Meta, RadioItem as Item } from "./props";

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
  },
});

const radioPrimaryColor = computed<string>(function() {
  if (props.meta?.color) {
    return props.meta.color;
  }
  return "#3c6cfe";
});

const radioList = computed<Item[]>(function() {
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

const text = computed<string>({
  get: () => props.value,
  set: (value: string) => {
    emit("update:value", value);
    emit("change", value);
  }
});

</script>
<template>
  <div class="select-none" :class="`radio-${skin}`" :style="`--radio-color: ${radioPrimaryColor}`">
    <RadioGroup class="w-full" v-model:value="text">
      <template v-if="(skin === Skin.mark)">
        <Space>
          <template v-for="item in radioList" :key="item.key">
            <RadioButton class="radio-button" :class="{'active': text === item.value}" :disabled="!!(disabled || item.disabled)" :value="item.value">
              <span class="box">
                <span></span>
                <span class="mx-2 whitespace-nowrap">{{ item.name || item.text }}</span>
                <Icon class="text-sm" type="check-outlined"></Icon>
              </span>
            </RadioButton>
          </template>
        </Space>
      </template>
      <template v-else>
        <template v-for="item in radioList" :key="item.value">
          <Radio :value="item.value" :disabled="!!(disabled || item.disabled)">{{ item.name || item.text }}</Radio>
        </template>
      </template>
    </RadioGroup>
  </div>
</template>

<style scoped lang="scss">
%border {
  border-color: #d9d9d9;
  @apply border border-solid;
}
.ant-radio-wrapper {
  @apply px-3;
}
.radio-contain {
  .ant-radio-wrapper {
    @apply py-1;
    @extend %border;
  }
}
.radio-cover {
  @extend %border;
  .ant-radio-group {
    @apply flex justify-between;
  }
  .ant-radio-wrapper {
    @extend %border;
    @apply flex-1 py-1 mr-0;
    @apply first:border-l-0;
  }
}


.radio-mark .radio-button{
  transition: all 0.3s;
  @apply leading-9 h-9;
  @apply px-2 lg:px-4;
  ::v-deep(.ant-radio-button) {
    @apply hidden;
    & ~ * {
      @apply block h-full w-fit;
    }
  }
  .box {
    @apply flex items-center justify-between h-full;
  }
  .eci-icon {
    @apply invisible;
  }
  &.active {
    @apply text-white;
    background-color: var(--radio-color);
    .eci-icon {
      @apply visible;
    }
  }
}
</style>