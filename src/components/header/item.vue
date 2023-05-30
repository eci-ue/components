<script setup lang="ts">
import Link from "../link";
import { PropType } from "vue";
import type { MenuData } from "./type";

defineProps({
  data: {
    type: Object as PropType<MenuData>,
    required: true
  }
});
</script>

<template>
  <Link class="px-6 h-full ease-in duration-300 cursor-pointer flex items-center" :to="data.link">{{ data.label }}</Link>
</template>