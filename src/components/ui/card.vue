<script setup lang="ts">
/**
 * @file 卡片
 * @author svon.me@gmail.com
 */

import Title from "./title";

defineProps({
  value: {
    type: String,
    default: ""
  },
  rounded: {
    type: Boolean,
    default: () => true
  },
  class: {
    type: String,
    default: ""
  }
});
</script>
<template>
  <div class="ui-card bg-white p-2 md:p-6 mb-5 last:mb-0" :class="{'rounded': rounded}">
    <slot name="title">
      <Title :class="{'mb-6': value}" v-if="value" :value="value"></Title>
    </slot>
    <div :class="class">
      <slot></slot>
    </div>
  </div>
</template>
