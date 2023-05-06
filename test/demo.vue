<script setup lang="ts">
import { ref, onMounted } from "vue";
import { 
  DriveFile, FileOperate, FileType, Operate, FormRadio, FormRadioSkin,
} from "../src/index";
import TaskDetail from "./task/detail.vue";

onMounted(function() {
  // DriveFile("xxx", {
  //   id: 10076054,
  //   language: 12,
  //   type: FileType.source,
  //   task: false,
  //   fileOperate:[FileOperate.upload,FileOperate.delete,FileOperate.language,FileOperate.download,FileOperate.large,FileOperate.downTarget],
  //   accept: "*"
  // });

  // AddLqr({
  //   id: 1,
  //   file: 1,
  //   partner: true
  // }, {
  //   onOk: function(state: object) {
  //     console.log(state);
  //     // return api.project.saveLqr(state, true);
  //   }
  // });
});

const radioMeta = {
  size: "large",
  skin: FormRadioSkin.mark,
  list: [
    { text: "1", value: "1" },
    { text: "2", value: "2" },
    { text: "3", value: "3" }
  ]
};

</script>
<template>
  <div>
    <!-- <Operate :item="{}" :opt-types="['submit']"></Operate> -->
    <!-- <FormRadio :meta="radioMeta"></FormRadio> -->

    <TaskDetail></TaskDetail>    
  </div>
</template>