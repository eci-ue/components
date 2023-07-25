<script setup lang="ts">
/**
 * @file 增加memoq项目
 * @author theresia@eci.com
 */

import * as _ from "lodash-es";
import { PropType, ref, onMounted } from "vue";
import { Button, Table, Space, Input, Empty } from "ant-design-vue";
import { table } from "@ue/utils";
import Time from "../time";
import { ToolProjectData, headMemoq } from "./type";
import * as message from "@ue/message";
import SourceTarget from "../source/target.vue";

const props = defineProps({
  // 请求数据列表接口
  listApi: {
    required: true,
    type: Function as PropType<(name: string) => Promise<ToolProjectData[]>>,
  },
});
//复选框
const { selected, rowSelection } = table.useSelection();

const projectName = ref("")

//loading状态
const loading = ref(false)
const searchVal = ref("")//用来判断筛选条件是否存在
//memoq列表
let memoqList = ref()
//获取数据列表
const getData = async function () {
  loading.value = true
  memoqList.value = [];
  if (props.listApi && typeof props.listApi === "function") {
    try {
      searchVal.value = projectName.value
      memoqList.value = await Promise.resolve(props.listApi(projectName.value)) || [];
    } catch (error) { }
  } else {
    message.error("请传入获取数据的API方法")
  }
  loading.value = false
}

onMounted(() => {
  getData()
})
const onSubmit = function () {
  return selected.value;
};
defineExpose({ submit: onSubmit });
</script>
<template>
  <div>
    <Space>
      <Input v-model:value="projectName" @keyup.enter="getData" :maxlength="64" placeholder="Search project name"
        allow-clear class="w-100" />
      <Button @click="getData" type="primary">Search</Button>
    </Space>
    <div v-if="_.size(memoqList) < 1 && !searchVal && !loading" class="min-h-100 flex items-center justify-center">
      <Empty>
        <template #description>
          Create project in <a target="_blank" href="//memoq.ecinnovations.com/memoqweb">memoq server</a> or client
        </template>
      </Empty>
    </div>
    <template v-else>
      <Table :row-selection="rowSelection" class="mt-6 mb-4" :columns="headMemoq" rowKey="catProjectName"
        :loading="loading" :scroll="{ y: 460, scrollToFirstRowOnChange: true }" :data-source="memoqList"
        :pagination="false">
        <template #bodyCell="{ column, record, text }">
          <template v-if="column.dataIndex === 'language'">
            <SourceTarget :languagePair="record.languagePair"></SourceTarget>
          </template>
          <template v-if="column.dataIndex === 'startTime'">
            <Time :date="true" :value="text"></Time>
          </template>
        </template>
      </Table>
    </template>

    <div>
      <slot name="buttons"></slot>
    </div>
  </div>
</template> 
