<script setup lang="ts">
/**
 * @file File Information
 * @author svon.me@gmail.com
 */

import _ from "lodash-es";
import { api } from "../../../api";
import { table } from "@ue/utils";
import { PropType } from "vue";
import Link from "../../link";
import Icon from "../../icon";
import safeGet from "@fengqiaogang/safe-get";

import { headers, fileList } from "./util";

import Rate from "./rate.vue";
import Lqr from "../lqr/lqr.vue";
import { AddLqr } from "../lqr/index";
import { Table, Space, Button } from "ant-design-vue";
import { ExportDownload, ExportButton } from "../../export";

import type { TaskFileItem, View } from "./type";
import type { WorkMode } from "../../export";

const $emit = defineEmits(["reload"]);

const props = defineProps({
  list: {
    required: true,
    type: Array as PropType<TaskFileItem[]>
  },
  /** 任务ID */
  id: {
    required: true,
    type: [String, Number]
  },
  /** 项目ID */
  projectId: {
    required: true,
    type: [String, Number]
  },
  /** 源语言ID */
  language: {
    required: true,
    type: [String, Number]
  },
  /** 报告等级 */
  lqrLevel: {
    type: [Number, String],
    required: false,
    default: () => 0
  },
  /** 工作模式 */
  mode: {
    required: true,
    type: String as PropType<WorkMode>,
  },
  /** 
   * 是否为外部议员
   * @description 当 partner 为 true 时 pm & innerOuterType 两字段失效
   */
  partner: {
    type: Boolean,
    required: false,
    default: () => false
  },
  /** 当前是否为 PM */
  pm: {
    type: Boolean,
    required: false,
    default: () => false
  },
  /** 内外部任务枚举 */
  innerOuterType: {
    type: Number as PropType<View>,
    required: false,
    default: () => 0
  },
  
});

const { selectedKeys, rowSelection } = table.useSelection();

// 添加 Lqr
const onAddLqr = function(e: Event, data: TaskFileItem) {
  const option = { id: props.id, file: data.bilingualFileId, partner: props.partner };
  const callback = async function(value: object) {
    const status = await api.project.saveLqr(value, props.partner);
    if (status) {
      $emit("reload", e, data);
    }
    return status;
  };
  AddLqr(option, { onOk: callback });
};

</script>
<template>
  <div>
    <div class="flex w-full justify-between items-center mb-4">
      <Space>
        <!-- Lqr 报告 -->
        <Lqr :id="id" :level="lqrLevel"/>
        <!-- 下载双语文件 -->
        <ExportDownload 
          placement="bottomLeft" 
          :pm="pm"  
          :disabled="selectedKeys.length < 1" 
          :file="selectedKeys">
        </ExportDownload>
        <!-- 文件下载记录 -->
        <ExportButton :id="projectId" :language="language"></ExportButton>
      </Space>
      <slot>
        <Space>
          <span>CAT tools:</span>
          <span>{{ mode }}</span>
        </Space>
      </slot>
    </div>
    
    <Table class="count"
      bordered 
      :pagination="false" 
      :row-selection="rowSelection" 
      :columns="headers(list, innerOuterType)" 
      :data-source="fileList(list)">

      <template #bodyCell="{ column, record, text }">
        <template v-if="column.key === 'name'">
          <Space>
            <Icon type="link-outlined" class="text-deep-gray"></Icon>
            <span>{{ text }}</span>
          </Space>
        </template>
        <template v-else-if="column.key === 'words'">
          <span v-number.integer="safeGet(record, column.dataIndex)"></span>
        </template>
        <template v-else-if="column.key === 'resourceName'">
          <Rate :data="safeGet(record, column.dataIndex)" :mode="mode"></Rate>
        </template>
        <template v-else-if="column.key === 'lqr'">
          <!-- Lqr Link -->
          <Link v-if="record.lqrVisitPath" :to="record.lqrVisitPath" target="_blank">{{ text }}</Link>
          <!-- Add Lqr Button -->
          <Button v-else type="link" class="text-sm" @click="onAddLqr($event, record)">
            <span class="flex items-center">
              <Icon class="flex mr-1" type="icon-a-add"></Icon>
              <span>Add Lqr</span>
              <span class="count-item ml-0.5"></span>
            </span>
          </Button>
        </template>
        <template v-else>
          <span>{{ text || "--" }}</span>
        </template>
      </template>
    </Table>
  </div>
</template>