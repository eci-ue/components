<script setup lang="ts">
import { ref, onMounted } from "vue";
import { API } from "@js-lion/api";
import { MemoqExpress, ImportMemoqExpress, FormFile, FormLanguagePairs, FileInformation } from "../src/index";
import { Button, Space } from "ant-design-vue";
import * as modal from "@ue/modal";
import { MemoqItemData, ToolProjectData } from "../src/components/memoq/type";


const state = ref<any>({});

onMounted(async function () {
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

  // modal.form({
  //   key: "fileIds",
  //   component: FormFile,
  //   meta: {
  //     all: true,
  //     multiple: true
  //   },
  // })
  const api = new API();
  const data = await api.post("http://erpapi.eciol-test.com/tbms-task/detail/innerTranslationTaskDetail", { taskId: "4000123750" });
  state.value = data;
  // const { data } =await import("./data.json");
  // state.value = data;
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

const languagesMeta = {
  border: true,
  list: [
    {
      source: {
        id: 1,
        pic: 1,
        name: "A"
      },
      target: {
        id: 2,
        pic: 2,
        name: "B"
      }
    },
    {
      source: {
        id: 3,
        pic: 3,
        name: "C"
      },
      target: {
        id: 4,
        pic: 4,
        name: "D"
      }
    }
  ]
};
</script> 
<template>
  <div>
    <!-- <Operate :item="{}" :opt-types="['submit']"></Operate> -->
    <!-- <FormRadio :meta="radioMeta"></FormRadio> -->

    <!-- <div class="header">
      <Header title="ECI Driver" link="/"></Header>
    </div> -->
    <!-- <div class="p-6">
        <Space>
          <Button type="primary" @click="importProject">Import</Button>
          <Button>Refresh</Button>
        </Space>
        <MemoqExpress ref="memoqExpress" @create="importProject()" :requestApi="requestApi()" class="mt-6"></MemoqExpress>
      </div> -->

    <div>
      <!-- <FormLanguagePairs :value="['1.2', '3.4']" :meta="languagesMeta"></FormLanguagePairs> -->
    </div>
    <div>
      <FileInformation 
        :lqr-level="state.lqrLevel" 
        :lqr-oper="state.lqrOper"
        :lqf-level="state.lqfLevel" 
        :lqf-oper="state.lqfOper" 
        :list="state.taskBilingualFileRspList"
        :pm="false" 
        :partner="false" 
        :mode="state.catTool"
        :projectId="state.projectId" 
        :id="state.id" 
        :status="(state.status as any)" 
        :language="state.slang"></FileInformation>
    </div>
  </div>
</template>

<style scoped lang="scss">
.header {
  --header-height: theme("height[12.5]");
}
</style>