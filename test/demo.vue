<script setup lang="ts">
import { ref, onMounted } from "vue";
import { MemoqExpress, ImportMemoqExpress } from "../src/index";
import { Button, Space } from "ant-design-vue";
import * as modal from "@ue/model";
import { MemoqItemData, ToolProjectData } from "../src/components/memoq/type";

onMounted(function () {
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


const memoqExpress = ref()

const importProject = function () {
  modal.confirm(
    ImportMemoqExpress,
    {
      title: "Import",
      width: 1024,
      okText: "Apply",
      onOk: () => async function (selected: ToolProjectData[]) {
        memoqExpress.value.reload()//刷新列表数据
        return false
      }
    },
    {
      listApi: async (name: string) => {
        return new Promise<ToolProjectData[]>(function(resolve){resolve([])})
      }
    });
}
const requestApi = function () {
  return {
    listApi: async () => new Promise<MemoqItemData[]>(function(resolve){resolve([])}),
    deleteApi: async (data: MemoqItemData) => new Promise<boolean>(function(resolve){resolve(false)})
  }
}
</script> 
<template>
  <div>
    <!-- <Operate :item="{}" :opt-types="['submit']"></Operate> -->
    <!-- <FormRadio :meta="radioMeta"></FormRadio> -->

    <!-- <div class="header">
      <Header title="ECI Driver" link="/"></Header>
    </div> -->
    <div class="p-6">
        <Space>
          <Button type="primary" @click="importProject">Import</Button>
          <Button>Refresh</Button>
        </Space>
        <MemoqExpress ref="memoqExpress" @create="importProject()" :requestApi="requestApi()" class="mt-6"></MemoqExpress>
      </div>
  </div>
</template>

<style scoped lang="scss">
.header {
  --header-height: theme("height[12.5]");
}
</style>