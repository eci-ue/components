<script setup lang="ts">
/**
 * @author svon.me@gmail.com
 */

import { computed } from "vue";

const props = defineProps({
  value: {
    type: [String, Number],
    required: true
  },
  data: {
    type: Object,
    required: true
  }
});

const text = computed<string | number>(function() {
  const keys: string[] = Object.keys(props.data);
  let temp = "";
  for (const key of keys) {
    const v = props.data[key];
    if (v === props.value) {
      temp = key;
      break;
    }
  }
  return temp;
});

</script>

<template>
  <span>
    <slot :value="text">{{text}}</slot>
  </span>
</template>