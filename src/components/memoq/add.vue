<script setup lang="ts">
/**
 * @file 增加memoq项目
 * @author theresia@eci.com
 */

import * as _ from "lodash-es";
import { PropType, ref, onMounted } from "vue";
import { Button, Table, Input, Empty, Form, FormItem, RangePicker } from "ant-design-vue";
import { table } from "@ue/utils";
import Time from "../time";
import { ToolProjectData, headMemoq } from "./type";
import * as message from "@ue/message";
import SourceTarget from "../source/target.vue";
import Dayjs from 'dayjs';

const props = defineProps({
  // 请求数据列表接口
  listApi: {
    required: true,
    type: Function as PropType<(object: { projectName?: string, startDate?: string, endDate?: string }) => Promise<ToolProjectData[]>>,
  },
  // BUM列表
  memoqNamesList: {
    required: true,
    type: Array as PropType<string[]>,
  },
});
//复选框
const { selected, rowSelection } = table.useSelection();

const searchParams = ref<{ timeArr: [string, string], projectName: string }>({
  projectName: "",
  timeArr: [Dayjs().add(-1, 'month').format('YYYY-MM-DD'), Dayjs().format('YYYY-MM-DD')]
})

//loading状态
const loading = ref(false)
const isSearch = ref(true)//用来判断筛选条件是否存在
//memoq列表
let memoqList = ref()
//获取数据列表
const getData = async function () {
  loading.value = true
  memoqList.value = [];
  if (props.listApi && typeof props.listApi === "function") {
    try {
      isSearch.value = !!searchParams.value.projectName || !!searchParams.value.timeArr
      const data = {
        projectName: searchParams.value.projectName,
        startDate: searchParams.value.timeArr?.[0],
        endDate: searchParams.value.timeArr?.[1],
      }
      memoqList.value = await Promise.resolve(props.listApi(data)) || [];
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
    <div class="bg-[#f6f6f6] px-4 py-3 mb-3">
      Your ERP account have been linked the memoQ account: <span class="font-semibold">{{_.concat(memoqNamesList).join(',')}}</span> .
    </div>
    <Form ref="formRef" layout="vertical" class="grid gap-x-6 grid-cols-3">
      <FormItem label="Project Name">
        <Input v-model:value="searchParams.projectName" @keyup.enter="getData" :maxlength="64"
          placeholder="Search project name" allow-clear />
      </FormItem>
      <FormItem label="Start Date">
        <RangePicker v-model:value="searchParams.timeArr" format="YYYY-MM-DD" value-format="YYYY-MM-DD" />
      </FormItem>
      <FormItem label="&nbsp;">
        <Button @click="getData" type="primary">Search</Button>
      </FormItem>
    </Form>

    <div v-if="_.size(memoqList) < 1 && !isSearch && !loading" class="min-h-100 flex items-center justify-center">
      <Empty>
        <template #description>
          Create project in <a target="_blank" href="//memoq.ecinnovations.com/memoqweb">memoq server</a> or client
        </template>
      </Empty>
    </div>
    <template v-else>
      <Table :row-selection="rowSelection" class="mb-4" :columns="headMemoq" rowKey="catProjectName"
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
