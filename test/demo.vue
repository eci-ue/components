<script setup lang="ts">
import { ref } from "vue";
import { Alter, Operate } from "../src/index";
import Upload from "../src/components/upload";

import type { UploadFile } from "src/components/upload/props";

const state = ref(false)

const optTypes = ref(["cancel","delete","interrupt","confirm","reject","hedge JAS","rate partner"])
const item = ref({taskId:2,resourceId:1,resourceName:"资源"})


const onSuccess = function(data: UploadFile) {
  console.log(data);
}

const onSubmit = function() {
  console.log("submit");
}

</script>
<template>
  <div>
    <div>
      <Operate :item="item" :optTypes="optTypes"></Operate>
      <Alter v-model:value="state" :project-id="1"></Alter>
    </div>
    <br/>
    <div>
      <Upload @success="onSuccess" @submit="onSubmit"></Upload>
    </div>
  </div>
</template>