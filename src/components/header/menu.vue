<script setup lang="ts">
/**
 * @file 导航菜单
 * @author svon.me@gmail.com
 */

import Item from "./item.vue";
import type { MenuData } from "./type";

defineProps({
  list: {
    required: true,
    type: Array as PropType<MenuData[]>,
  }
});
</script>

<script lang="ts">
import { PropType, defineComponent } from "vue";

export default defineComponent({
  name: "NavMenu"
});
</script>

<template>
  <ul class="mb-0">
    <template v-for="data in list">
      <template v-if="data.children">
        <li class="nav-menu-item relative" :class="{ active: data.active }">
          <Item class="menu-item-content" :data="data"></Item>
          <template v-if="data.children">
            <NavMenu class="bg-navy-blue whitespace-nowrap absolute left-0 top-full hidden" :list="data.children"></NavMenu>
          </template>
        </li>
      </template>
      <template v-else>
        <li class="nav-menu-item" :class="{ active: data.active }">
          <Item class="menu-item-content" :data="data"></Item>
        </li>
      </template>
    </template>
  </ul>
</template>

<style scoped lang="scss">
@mixin text($color) {
  .menu-item-content {
    color: $color;
  }
}

.menu-item-content {
  @at-root .nav-menu-item {
    @include text(rgba($white, 0.45));
  }
}

.nav-menu-item {
  @apply h-[var(--header-height)];
  &.active {
    @include text(inherit);
    background-color: lighten($navy-blue, 4%);
  }
  &:hover {
    @include text(inherit);
    background-color: darken($navy-blue, 4%);
    & > ul {
      @apply block;
    }
  }
}
</style>