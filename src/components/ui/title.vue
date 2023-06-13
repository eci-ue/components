<script setup lang="ts">
/**
 * @file 标题
 * @author svon.me@gmail.com
 */

import { useSlots } from "vue";
import { Divider } from "ant-design-vue";

defineProps({
  value: {
    type: String,
    required: true,
  },
  leftBorder: {
    type: Boolean,
    default: true
  },
});

const slots = useSlots();

</script>
<template>
  <div class="flex items-center">
    <div :class="{'title': leftBorder}" class="text-base text-black text-opacity-85 font-bold leading-5">
      {{ value }}
    </div>
    <template v-if="slots.default">
      <Divider type="vertical" />
      <slot></slot>
    </template>
  </div>
</template>

<style scoped lang="less">
.title {
  @apply pl-3 relative;
  &::before {
    content: "";
    @apply bg-primary rounded-sm w-1;
    @apply absolute left-0 bottom-0 top-0;
  }
}
.ant-divider-vertical{
    height: 1.2em;
    @apply border-border-color mx-0 my-6;
}
</style>
