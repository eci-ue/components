<script setup lang="ts">
/**
 * @author svon.me@gmail.com
 */
import * as _ from "lodash-es";
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

const text = computed<string>(function() {
  const keys: string[] = Object.keys(props.data);
  let temp = "";
  for (const key of keys) {
    const v = props.data[key];
    if (v == props.value) {
      temp = key;
      break;
    }
  }
  const value = _.lowerCase(temp);
  const list = value ? value.split(/\s+/g) : [];
  if (list.length > 0) {
    return list.map(_.upperFirst).join(" ");
  }
  return "";
});

</script>

<template>
  <span>
    <slot :value="text">{{text}}</slot>
  </span>
</template>