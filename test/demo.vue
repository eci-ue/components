<script setup lang="ts">
import { ref, onMounted } from "vue";
import { Alter, Operate, FileOperate, ExportButton, ExportDownload } from "../src/index";
import { check } from "@ue/utils";
import Upload from "../src/components/upload";

import { Space } from "ant-design-vue";

import DriveFile from "../src/utils/drive";

import type { UploadFile } from "../src/components/upload/props";
import { FileType} from "../src/components/drive/props";

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

const accept = function(file: File): boolean {
  return check.fileSuffix(file.name, "zip");
}

onMounted(function() {
  DriveFile("xxx", {
    id: 2,
    language: 7,
    type: FileType.source,
    task:true,
    fileOperate:[FileOperate.upload,FileOperate.delete,FileOperate.language,FileOperate.download,FileOperate.large,FileOperate.downTarget],
    accept: accept
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
      <Upload @success="onSuccess" @submit="onSubmit" :accept="accept" :disabled="true"></Upload>
    </div>
    <div>
      <Space>
        <ExportDownload :file="[1, 2]" :menu="[2]"></ExportDownload>
        <ExportButton :id="1" :language="2"></ExportButton>
      </Space>
    </div>
  </div>
</template>