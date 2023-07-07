<script setup lang="ts">
import * as _ from "lodash-es";
import { Icon } from "@ue/icon";
import { PropType, computed } from "vue";

import type { LanguageData } from "./props";

const props = defineProps({
  data: {
    required: false,
    type: [String, Object] as PropType<string | LanguageData>,
  },
  showName: {
    type: Boolean,
    default: true
  }
});

const pic = computed<string | undefined>(function() {
  if (props.data && _.isObject(props.data) && props.data.pic) {
    return `pic-${props.data.pic}`;
  }
});

const name = computed<string | undefined>(function() {
  if (props.data && _.isString(props.data)) {
    return props.data as string;
  }
  if (props.data && _.isObject(props.data) && props.data.name) {
    return props.data.name;
  }
});

</script>

<template>
  <Icon  v-if="pic" :type="pic" :size="36"></Icon>
  <div class="text-deep-gray font-medium text-xs" v-if="showName && name">{{ name }}</div>
</template>