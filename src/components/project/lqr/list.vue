<script setup lang="ts">
import * as _ from "lodash-es";
import { api } from "../../../api";
import { useState } from "@ue/utils";
import { Table, Space, Tag } from "ant-design-vue";
import { headers, list } from "./util";
import Icon from "../../icon";

const props = defineProps({
  /** 任务ID */
  id: {
    required: true,
    type: [String, Number],
  },
});

const { state } = useState.list(api.project.lqrList(props.id));

</script>

<template>
  <div>
    <div v-for="data in list(state.results)" :key="data.key" class="mb-2 last:mb-0">
      <div class="flex justify-between">
        <span>LQR {{ data.index + 1 }}: </span>
        <div class="mx-2 flex-1">
          <template v-for="i in 7" :key="i">
            <Tag class="select-none" :color=" i <= data.level ? '#3c6cfe' : undefined">
              <span class="w-5 inline-block">&nbsp;</span>
            </Tag>
          </template>
        </div>
        <span>Level: {{ data.level }}</span>
      </div>
      <Table class="mt-4" :columns="headers" :data-source="data.list" bordered :pagination="false">
        <template #bodyCell="{ column, text }">
          <template v-if="column.key === 'modify'">
            <Space :size="4" v-if="text > 0">
              <span class="inline-block min-w-10">+{{text}}%</span>
              <Icon class="text-success-color" type="caret-up-outlined"></Icon>
            </Space>
            <Space :size="4" v-else>
              <span class="inline-block min-w-10">{{text}}%</span>
              <Icon class="text-error-color" type="caret-down-outlined"></Icon>
            </Space>
          </template>
        </template>
      </Table>
    </div>
  </div>
</template>