<script setup lang="ts">
/**
 * @file 右上角用户信息
 * @author svon.me@gmail.com
 */

import { Icon } from "@ue/icon";
import { Space } from "ant-design-vue";

defineProps({
  nickName: {
    type: String,
    required: false,
  },
  portrait: {
    type: String,
    required: false,
  }
});
</script>

<template>
  <div class="h-full flex items-center">
    <slot></slot>
    <Space>
      <img v-if="portrait" class="block w-8 h-8 rounded" :src="portrait" alt="avatar"/>
      <Icon v-else class="text-xl flex" type="user-outlined"/>
      <span v-if="nickName" class="whitespace-nowrap hidden xl:inline-block">{{ nickName }}</span>
    </Space>
  </div>
</template>