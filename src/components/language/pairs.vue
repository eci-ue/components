<script setup lang="ts">
import * as _ from "lodash-es";
import { PropType } from "vue";
import Item from "./item.vue";
import { Icon } from "@ue/icon";

import type { LanguageData } from "./props";

defineProps({
  // 源语言
  source: {
    required: true,
    type: [String, Object] as PropType<string | LanguageData>,
  },
  // 目标语言
  target: {
    required: false,
    type: [String, Object] as PropType<string | LanguageData>,
  },
  showName: {
    type: Boolean,
    default: true
  }
});
</script>

<template>
  <span class="inline-flex items-center">
    <Item :data="source" :show-name="showName"></Item>
    <template v-if="target">
      <Icon type="caret-right-outlined" class="mr-2 last:mr-0 text-base text-black text-opacity-25"></Icon>
      <Item :data="target" :show-name="showName"></Item>
    </template>
    <slot></slot>
  </span>
</template>