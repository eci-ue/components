<script setup lang="ts">
import { ref, onMounted } from "vue";
import { Alter, Operate } from "../src/index";
import Upload from "../src/components/upload";

import DriveFile from "../src/utils/drive";

import type { UploadFile } from "../src/components/upload/props";
import { FileType } from "../src/components/drive/props";

const state = ref(false)

const optTypes = ref(["cancel","delete","interrupt","confirm","reject","hedge JAS","rate partner"])
const item = ref({taskId:2,resourceId:1,resourceName:"资源"})


const stateVal = function(val: boolean) {
  console.log(val);
}

const onSuccess = function(data: UploadFile) {
  console.log(data);
}

const onSubmit = function() {
  console.log("submit");
}

onMounted(function() {
  DriveFile("xxx", {
    id: 1,
    language: 7,
    type: FileType.source
  });
});

</script>
<template>
  <div>
    <div>
      <Operate :item="item" :optTypes="optTypes"></Operate>
      <Alter v-model:value="state" :project-id="1" @state="stateVal"></Alter>
    </div>
    <br/>
    <div>
      <Upload @success="onSuccess" @submit="onSubmit"></Upload>
    </div>
  </div>
</template>