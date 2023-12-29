<script setup lang="ts">
/**
 * @file 导航
 * @author svon.me@gmail.com
 */

import Logo from "./logo.vue";
import User from "./user.vue";
import Menu from "./menu.vue";
import { PropType } from "vue";
import type { MenuData } from "./type";

defineProps({
  /**
   * 左上角标题
   */
  title: {
    type: String,
    required: false,
  },
  /**
   * 左上角超链接
   */
  link: {
    type: [String, Object],
    required: false,
  },
  /**
   * 右上角用户名称
   */
  nickName: {
    type: String,
    required: false,
  },
  /**
   * 右上角用户头像
   */
  portrait: {
    type: String,
    required: false,
  },
  list: {
    required: false,
    default: () => [],
    type: Array as PropType<MenuData[]>,
  }
});


</script>

<template>
  <div class="min-h-10 text-white bg-navy-blue flex h-[var(--header-height)]">
    <div class="h-full px-6">
      <slot name="logo">
        <Logo :title="title" :link="link"></Logo>
      </slot>
    </div>
    <div class="divider h-full"></div>
    <div class="h-full flex-1 flex justify-between">
      <div class="h-full px-6 flex-1">
        <slot name="menu">
          <Menu class="flex h-full" :list="list" v-if="list && list.length > 0"></Menu>
        </slot>
      </div>
      <div class="h-full pr-6">
        <slot name="user">
          <User :nick-name="nickName" :portrait="portrait"></User>
        </slot>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.divider {
  &::before {
    content: "";
    @apply block h-full w-0.5;
    background-image: linear-gradient(180deg,#3d4966 0%,#6e92ff 52.72%,#3d4966 100%);
  }
}
</style>