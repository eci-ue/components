<script setup lang="ts">
import { ref } from "vue";
import { Alert,Operate } from "../src/index";
const state = ref(false)

const optTypes = ref(["cancel","delete","interrupt","confirm","reject","hedge JAS","rate partner"])
const item = ref({taskId:2,resourceId:1,resourceName:"资源"})
</script>
<template>
  <Operate :item="item" :optTypes="optTypes"></Operate>
  <Alert v-model:value="state" :project-id="1"></Alert>
</template>