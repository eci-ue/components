<script setup lang="ts">
import { ref, onMounted } from "vue";
import { Header } from "../src/index";

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

</script>
<template>
  <div>
    <!-- <Operate :item="{}" :opt-types="['submit']"></Operate> -->
    <!-- <FormRadio :meta="radioMeta"></FormRadio> -->

    <div class="header">
      <Header title="ECI Driver" link="/"></Header>
    </div>
  </div>
</template>

<style scoped lang="scss">
.header {
  --header-height: theme("height[12.5]");
}
</style>