<script setup lang="ts">
/**
 * @file 网盘表头
 */
import i18n from "../../utils/i18n";

</script>

<template>
  <div class="flex justify-between items-center pr-15">
    <div>{{ i18n.drive.label.title }}</div>
    <a class="font-normal text-sm" href="/file/document" target="_blank">{{ i18n.project.label.uploadDrive }}</a>
</div>
</template>