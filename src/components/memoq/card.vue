<script setup lang="ts">
/**
 * @file Memoq item
 * @author theresia@eci.com
 */

import * as _ from "lodash-es";
import { PropType } from "vue";
import { Icon } from "@ue/icon";
import Time from "../time";
import SourceTarget from "../source/target.vue";
import { Button, Divider } from "ant-design-vue";
import { MemoqItemData } from "./type";

const $emit = defineEmits(["delete"]);
const props = defineProps({
  item: {
    required: true,
    type: Object as PropType<MemoqItemData>,
  }
});

const deleteItem = function () {
  $emit('delete', props.item)
}

</script>
<template>
  <section class="card-item">
    <header class="flex justify-between items-center">
      <div class="card-title">{{ item.catProjectName || '--' }}</div>

      <Button type="link" danger class="ml-2" @click="deleteItem">
        <Icon type="icon-trash" class="mr-1"></Icon>
      </Button>
    </header>
    <section class="mt-5 flex justify-between gap-2">
      <div>
        <div class="font-medium">{{ item.createUserName || '--' }}</div>
        <div class="text-text-gray">Created by</div>
      </div>
      <div>
        <div class="font-medium truncate">{{ item.clientName || '--' }}</div>
        <div class="text-text-gray">Client</div>
      </div>
      <div>
        <div class="font-medium">
          <Time :value="item.createTime"></Time>
        </div>
        <div class="text-text-gray">Create Time</div>
      </div>
    </section>
    <Divider dashed class="my-5" />
    <section>
      <template v-if="_.size(item.targetLangInfoList) > 0">
        <SourceTarget :languagePair="item.languagePair"></SourceTarget>
      </template>
      <span v-else>--</span>
    </section>
  </section>
</template> 
<style scoped lang="less">
.card-item {
  @apply border border-normal-color rounded p-4;
}

.card-title {
  @apply truncate text-base font-bold leading-5;
}
</style>