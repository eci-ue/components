<script setup lang="ts">
/**
 * @file 动态表单 - 文本输入框
 * @author svon.me@gmail.com
 */

import { computed, PropType } from "vue";
import { FormRadioSkin as Skin } from "./type";

import { Icon } from "@ue/icon";
import { RadioGroup, Radio, RadioButton, Space } from "ant-design-vue";

import type { RadioMeta as Meta, RadioItem as Item } from "./props";
import safeGet from "@fengqiaogang/safe-get";
import safeSet from "@fengqiaogang/safe-set";

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
  const color = safeGet<string>(props.meta, "color");
  if (color && typeof color === "string") {
    return color;
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

const SizeRatio = 3.6;
const __ButtonSizeComputed = function(size: string | number | object): object {
  let height: string | number | undefined;
  let width: string | number | undefined;
  if (size && (typeof size === "string" || typeof size === "number")) {
    let base = 4;
    let unit = "rem";
    if (/\.px$/.test(String(size)) === false) {
      base = 1;
      unit = String(size).replace(/[\d.]/ig, "");
    }
    size = String(size).replace(/[^\d.]/ig, "");

    if (/^\d+(\.\d+)?$/.test(String(size))) {
      width = parseFloat(String(size)) / base;
      height = `${(width / SizeRatio).toFixed(4)}${unit}`;
      width = `${width.toFixed(4)}${unit}`;
    }
  } else if (size && typeof size === "object") {
    width = safeGet<string>(size, "width");
    height = safeGet<string>(size, "height");
  }
  const data = {};
  if (height || height === 0) {
    safeSet(data, "--button-size-height", height);
  } else {
    safeSet(data, "--button-size-height", "initial");
  }
  if (width || width === 0) {
    safeSet(data, "--button-size-width", width);
  } else {
    safeSet(data, "--button-size-width", "initial");
  }
  return data;
}

const buttonSize = computed<object>(function() {
  const size = props.meta?.size ? props.meta.size : "default";
  if (size === "small") {
    // height = "1.75rem";
    // width = "initial";
    return __ButtonSizeComputed(`${1.75 * SizeRatio}rem`);
  } else if (size === "default") {
    // height = "2.25rem";
    // width = "initial";
    return __ButtonSizeComputed(`${2.25 * SizeRatio}rem`);
  } else if (size === "large") {
    return __ButtonSizeComputed({
      height: "3.125rem",
      width: "11.25rem"
    });
  }
  return __ButtonSizeComputed(size);
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
            <RadioButton class="radio-button" :style="buttonSize" :class="{'active': text === item.value}" :disabled="!!(disabled || item.disabled)" :value="item.value">
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
  // @apply leading-9 h-9;
  height: var(--button-size-height);
  line-height: var(--button-size-height);
  @apply px-2 lg:px-4;
  ::v-deep(.ant-radio-button) {
    @apply hidden;
    & ~ * {
      @apply block h-full w-fit;
    }
  }
  .box {
    @apply flex items-center justify-between h-full;
    width: var(--button-size-width);
    min-width: var(--button-size-width);
    max-width: 100%;
  }
  .eci-icon {
    @apply invisible;
  }
  &.active {
    @apply text-white;
    background-color: var(--radio-color);
    border-color: var(--radio-color) !important;
    .eci-icon {
      @apply visible;
    }
  }
}
</style>