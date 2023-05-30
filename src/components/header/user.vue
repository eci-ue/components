<script setup lang="ts">
/**
 * @file 右上角用户信息
 * @author svon.me@gmail.com
 */

import { Icon } from "@ue/icon";

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
    <Space>
      <img v-if="portrait" class="block w-8 h-8 rounded" :src="portrait" alt="avatar"/>
      <Icon v-else class="text-3xl" type="user-outlined" />
      <span v-if="nickName">{{ nickName }}</span>
    </Space>
  </div>
</template>