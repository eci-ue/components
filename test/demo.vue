<script setup lang="ts">
import { ref, onMounted } from "vue";
import { 
  Alter, Operate, FileOperate, ExportButton, ExportDownload,
  WorkMode, LqrAdd, FormRadio, FormRadioSkin, TimeDelivery
} from "../src/index";
import { AddLqr } from "../src/components/project/lqr"
import * as model from "@ue/model";
import { check } from "@ue/utils";
import Upload from "../src/components/upload";
import { api } from "../src/api"

import { Space } from "ant-design-vue";

import DriveFile from "../src/utils/drive";

import type { UploadFile } from "../src/components/upload/props";
import { FileType} from "../src/components/drive/props";

import { Download, DownloadType } from "../src";

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
const radioValue = ref<string>();
const radioMeta = {
  skin: FormRadioSkin.cover,
  list: [
    { value: "A", name: "A" },
    { value: "B", name: "B" },
    { value: "C", name: "C" },
  ]
};

onMounted(function() {
  // DriveFile("xxx", {
  //   id: 2,
  //   language: 7,
  //   type: FileType.source,
  //   task:true,
  //   fileOperate:[FileOperate.upload,FileOperate.delete,FileOperate.language,FileOperate.download,FileOperate.large,FileOperate.downTarget],
  //   accept: accept
  // });

  // AddLqr({
  //   id: 1,
  //   file: 1,
  //   partner: true
  // }, {
  //   onOk: function(state: object) {
  //     return api.project.saveLqr(state, true);
  //   }
  // });
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
        <ExportDownload :file="[1, 2]" :menu="[1, 2]"></ExportDownload>
        <ExportButton :id="12" :language="1" :mode="WorkMode.Transdoc" :pm="false"></ExportButton>
      </Space>
    </div>
    <div>
      <TimeDelivery value="2023-03-03 15:00"></TimeDelivery>
    </div>
    <div class="mt-5 p-5">
      <FormRadio v-model:value="radioValue" :meta="radioMeta"></FormRadio>
    </div>
    <div>
      <Download 
        :type="DownloadType.net" 
        name="合同版本翻译.txt" 
        value="C:\\ERP\\FileSYWeb\\2023\\20230303\\fd49cf99-4a7f-43e3-8528-794f16ee7c79" />
    </div>
  </div>
</template>