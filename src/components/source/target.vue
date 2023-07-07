<script setup lang="ts">
import { PropType, computed } from "vue";
import { Popover } from "ant-design-vue";
import { Icon } from "@ue/icon";
import type { LanguageOneToMoreType, LanguageData } from "./props";
import * as _ from "lodash-es";
import Item from "./item.vue";
const props = defineProps({
  languagePair: {
    required: true,
    type: Object as PropType<LanguageOneToMoreType>,
  }
});
const source = computed<LanguageData | undefined>(function () {
  if (props.languagePair.source && _.isObject(props.languagePair.source)) {
    return props.languagePair.source;
  }
});
const target = computed<LanguageData[] | undefined>(function () {
  return props.languagePair.target;
});
</script> 
<template>
  <Popover>
    <template #content>
      <div class="max-w-96 p-2">
        <template v-if="source">
          <div class="font-semibold mb-2">Source Language：</div>
          <div class="mb-4">
            <Item :data="source"></Item>
          </div>
          <div class="font-semibold mb-2">Target Language：</div>
        </template>
        <div class="flex flex-wrap">
          <div v-for="item in target" class="mb-2 mr-3">
            <Item :data="item"></Item>
          </div>
        </div>
      </div>
    </template>
    <div class="inline-block max-w-full">
      <div class="items-center flex">
      <template v-if="source">
        <div class="min-w-9">
          <Item :data="source" :show-name="false"></Item>
        </div>
        <Icon type="caret-right-outlined" class="text-base text-black text-opacity-25 mx-3"></Icon>
      </template>
      <div class="max-w-150 truncate">
        <div class="inline-block mr-2 font-bold" v-for="item in target">
          <Item :data="item" :show-name="false"></Item>
        </div>
      </div>
    </div>
    </div>
    
  </Popover>
</template>
