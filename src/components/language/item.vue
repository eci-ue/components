<script setup lang="ts">
import * as _ from "lodash-es";
import Icon from "../icon";
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
  <Icon class="mr-2 last:mr-0" v-if="pic" :type="pic" :size="34"></Icon>
  <span class="mr-2 last:mr-0" v-if="showName && name">{{ name }}</span>
</template>