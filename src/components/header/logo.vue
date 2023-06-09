<script setup lang="ts">
import RouteLink from "../link";
defineProps({
  title: {
    type: String,
    required: false,
  },
  link: {
    type: [String, Object],
    required: false,
  }
});
</script>
<template>
  <RouteLink class="text-inherit flex h-full items-center" :to="link" tag="a">
    <b class="text-2xl font-medium">{{ title }}</b>
  </RouteLink>
</template>