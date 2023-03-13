<script setup lang="ts">
/**
 * @file File Information
 * @author svon.me@gmail.com
 */

import Link from "../../link";
import Icon from "../../icon";
import * as _ from "lodash-es";
import { PropType } from "vue";
import { api } from "../../../api";
import * as message from "@ue/message";
import { headers, fileList } from "./util";
import safeGet from "@fengqiaogang/safe-get";
import { table, fileDownloadUrl } from "@ue/utils";

import { hook } from "@ue/utils";
import Rate from "./rate.vue";
import Lqr from "../lqr/lqr.vue";
import { AddLqr } from "../lqr/index";
import { Table, Space, Button } from "ant-design-vue";
import { ExportDownload, ExportButton } from "../../export";

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
  }
});

const { selectedKeys, rowSelection } = table.useSelection();

const before = async function(...args: any[]) {
  try {
    return await hook.run(props.before, args);
  } catch (error) {
    const tips: string = error?.message;
    if (tips) {
      message.error(tips);
    }
    return false;
  }
}

// lqr 链接处理
const lqrLink = function(value: string): string | undefined {
  if (value && /^http/.test(value)) {
    return value;
  }
  if (value && /^\/\//.test(value)) {
    return value;
  }
  if (value) {
    return fileDownloadUrl(value);
  }
};

// 查看 Lqr
const onCheckLqr = async function(value: string) {
  const status = await before("lqr");
  if (status) {
    const url = lqrLink(value);
    if (url) {
      window.open(url);
    }
  }
}

// 添加 Lqr
const onAddLqr = async function(e: Event, data: TaskFileItem) {
  const status = await before("addLqr");
  if (!status) {
    return false;
  }
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


// 查看双语文件
const catFileDetail = async function(value: string): Promise<void> {
  if (value) {
    const status = await before("catFile");
    if (status) {
      window.open(value);
    }
  }
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
          :before="before"
          :pm="pm"  
          :partner="partner" 
          :mode="mode" 
          :disabled="selectedKeys.length < 1" 
          :file="selectedKeys">
        </ExportDownload>
        <!-- 文件下载记录 -->
        <ExportButton 
          :id="projectId" 
          :language="language" 
          :before="before" 
          :pm="pm" 
          :mode="mode" 
          :partner="partner">
        </ExportButton>
      </Space>
      <slot>
        <Space>
          <span>CAT tools:</span><span>{{ mode }}</span>
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
          <Space v-if="record.catUrl && !pm" class="link cursor-pointer" @click="catFileDetail(record.catUrl)">
            <Icon type="link-outlined"></Icon>
            <span>{{ text }}</span>
          </Space>
          <Space v-else>
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
          <template v-if="lqrOper && String(lqrOper) === '3'">
            <!-- 可上传 -->
            <!-- Lqr Link -->
            <Button v-if="record.lqrVisitPath" type="link" @click="onCheckLqr(record.lqrVisitPath)">{{ text }}</Button>
            <!-- Add Lqr Button -->
            <Button v-else type="link" class="text-sm" @click="onAddLqr($event, record)">
              <span class="flex items-center">
                <Icon class="flex mr-1" type="icon-a-add"></Icon>
                <span>Add Lqr</span>
                <span class="count-item ml-0.5"></span>
              </span>
            </Button>
          </template>
          <template v-else-if="lqrOper && String(lqrOper) === '2' && record.lqrVisitPath">
            <!-- Lqr Link -->
            <Button type="link" @click="onCheckLqr(record.lqrVisitPath)">{{ text }}</Button>
          </template>
          <template v-else>
            <span>--</span>
          </template>
        </template>
        <template v-else>
          <span>{{ text || "--" }}</span>
        </template>
      </template>
    </Table>
  </div>
</template>