<script setup lang="ts">
/**
 * @file File Information
 * @author svon.me@gmail.com
 */

import * as _ from "lodash-es";
import { PropType } from "vue";
import i18n from "../../../utils/i18n";
import { headers, fileList, before } from "./util";
import { table } from "@ue/utils";

import Lqr from "../lqr/lqr.vue";

import { Table, Space } from "ant-design-vue";
import { ExportDownload, ExportButton } from "../../export";

import type { Status } from "../type";
import type { WorkMode } from "../../export";
import type { HookFunction } from "@ue/utils";
import type { TaskFileItem, View } from "./type";


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
  /** 报告等级 */
  lqfLevel: {
    type: [Number, String],
    required: false,
    default: () => 0
  },
  /** 工作模式 */
  mode: {
    required: true,
    type: String as PropType<WorkMode>,
  },
  // lqr 枚举
  lqrOper: {
    type: [String, Number],
    required: false,
  },
  // lqr 枚举
  lqfOper: {
    type: [String, Number],
    required: false,
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
  /** 触发前钩子 */
  before: {
    required: false,
    type: [Function, Array] as PropType<HookFunction | HookFunction[]>
  },
  /** 项目状态 */
  status: {
    required: false,
    type: Number as PropType<Status>,
  }
});

const { selectedKeys, rowSelection } = table.useSelection();

const onReload = function () {
  $emit("reload");
};

</script>
<template>
  <div>
    <div class="flex w-full justify-between items-center mb-4">
      <Space>
        <!-- Lqr 报告 -->
        <Lqr :id="id" :level="lqrLevel" />
        <!-- Lqf 报告 -->
        <Lqr :id="id" :level="lqfLevel" :lqType="3" />
        <!-- 下载双语文件 -->
        <ExportDownload placement="bottomLeft" :before="before" :pm="pm" :partner="partner" :mode="mode"
          :disabled="selectedKeys.length < 1" :file="selectedKeys">
        </ExportDownload>
        <!-- 文件下载记录 -->
        <ExportButton :id="projectId" :language="language" :before="before" :pm="pm" :mode="mode" :partner="partner">
        </ExportButton>
      </Space>
      <slot>
        <Space>
          <span>{{ i18n.project.label.cat }}:</span>
          <span>{{ mode }}</span>
        </Space>
      </slot>
    </div>
    <div class="overflow-x-auto">
        <Table class="min-w-300" bordered :pagination="false" :row-selection="rowSelection" :columns="headers(list, props, onReload)" :data-source="fileList(list)"></Table>
    </div>
  </div>
</template>

<style lang="less">
.ant-table .word-content {
  &:not(th) {
    @apply p-0;
  }
}
</style>