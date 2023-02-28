<script setup lang="ts">
import * as _ from "lodash-es";
import { PropType } from "vue";
import Pairs from "./pairs.vue";
import { Badge, Popover } from "ant-design-vue";

import type { LanguagePairsData } from "./props";

defineProps({
  list: {
    type: Array as PropType<LanguagePairsData[]>,
    default: () => []
  },
});

const style = { 
  color: `#648ABC`,
  backgroundColor: `#C9DFFC`
};
</script>

<template>
  <span class="block ">
    <Popover placement="bottomRight">
      <template #content>
        <div>
          <div v-for="(item, index) in list" :key="index">
            <Pairs :source="item.source" :target="item.target"></Pairs>
          </div>
        </div>
      </template>
      <Badge :count="_.size(list) + 1" :number-style="style" title=""></Badge>
    </Popover>
  </span>
</template>