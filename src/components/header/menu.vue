<script setup lang="ts">
/**
 * @file 导航菜单
 * @author svon.me@gmail.com
 */

import Item from "./item";
import { computed } from "vue";
import type { MenuData } from "./type";

const props = defineProps({
  list: {
    required: true,
    type: Array as PropType<MenuData[]>,
  }
});

const menuList = computed<MenuData[]>(() => {
  return props.list.filter((data: MenuData) => {
    if (data.hidden) {
      return false;
    }
    return true;
  });
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
    <template v-for="(data, index) in menuList" :key="`${index}-${data.label}`">
      <template v-if="data.children && data.children.length > 0">
        <li class="nav-menu-item relative" :class="{ active: data.active }">
          <Item class="menu-item-content" :data="data"></Item>
          <NavMenu class="bg-navy-blue whitespace-nowrap absolute left-0 top-full hidden" :list="data.children"></NavMenu>
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
</style>./item.tsx