<script setup lang="ts">
/**
 * @file 资源文件列表
 * @author svon.me@gmail.com
 */

import * as _ from "lodash-es";
import { api } from "../../api";
import { computed, PropType } from "vue";
import Time from "../time";
import { Table } from "ant-design-vue";
import { Icon, FileIcon } from "@ue/icon";
import { table, useState, downloadFile, fileDownloadUrl, fileSize } from "@ue/utils";

import Handle from "./handle.vue";
import { headers } from "./heder";
import { LanguageGroup } from "../language";
import Download from "../download/index.vue";

import type { FileType, FileItem, FileOperate } from "./props";

const $emit = defineEmits(["change"]);

const props = defineProps({
  // 项目ID / 任务ID
  id: {
    required: true,
    type: [String, Number],
  },
  // 语言ID
  language: {
    required: true,
    type: [String, Number],
  },
  // 文件类型
  type: {
    required: true,
    type: String as PropType<FileType>
  },
  // 文件操作按钮
  fileOperate: {
    required: false,
    type: Array as PropType<FileOperate[]>,
    default: () => []
  },
  // 是否禁用操作按钮
  disabled: {
    type: Boolean,
    default: () => false
  },
  // 文件类型过滤
  accept: {
    type: [String, Function] as PropType<string | ((value: File) => boolean)>,
    required: false
  },
  // 是否为 task 类型
  task: {
    type: Boolean,
    default: () => false
  },
  //任务节点(小类)
  subType: {
    type: String,
    default: ""
  },
  //仅供按钮Download Target使用
  isPm: {
    type: Boolean,
    default: () => false
  },
  // 是否为外部任务
  partner: {
    type: Boolean,
    required: false,
    default: () => false
  },
});

const { selected, selectedKeys, rowSelection, onClearSelected } = table.useSelection<FileItem>();

const { state, isLoading, execute } = useState.list<FileItem>(() => {
  if (props.task) {
    return api.project.taskFileList(props.id, props.type);
  }
  return api.project.fileList(props.id, props.type, props.language);
}, void 0, void 0, "fileId");


const onReload = async function () {
  onClearSelected();
  await execute(50);
  $emit("change", state.value.total);
};

const fileList = computed<FileItem[]>(function () {
  const list: FileItem[] = state.value.results;
  return [...list];
});

const tableScroll = computed(function () {
  if (state.value.total > 5) {
    return { y: 300 };
  }
  return {};
});

const onDownload = function () {
  for (const item of selected.value) {
    if (item.filePath) {
      const url = fileDownloadUrl(item.filePath);
      downloadFile(url, item.fileName);
    }
  }
}

</script>

<template>
  <div>
    <div>
      <!-- 操作按钮 -->
      <Handle 
        :id="id" 
        :isPm="isPm" 
        :language="language" 
        :type="type" 
        :fileOperate="fileOperate" 
        :task="task" 
        :partner="partner"
        :accept="accept" 
        :disabled="disabled" 
        :selectedKeys="selectedKeys" 
        :selected="selected"
        :subType="subType" 
        @click="onReload" 
        @download="onDownload">
      </Handle>
    </div>

    <!-- 资源文件列表 -->
    <Table class="mt-5" table-layout="auto" :loading="isLoading"
      :row-selection="rowSelection" :columns="headers(task, subType)" :data-source="fileList" :scroll="tableScroll"
      :pagination="false">

      <template #bodyCell="{ column, record, text }">
        <template v-if="column.key === 'name'">
          <Download :value="record.type != 5 ? record.filePath : ''">
            <FileIcon :value="text" :class="record.type != 5 ? 'link' : ''" :max-size="24">
              <Icon type="link-outlined"></Icon>
            </FileIcon>
          </Download>
        </template>
        <template v-else-if="column.key === 'type'">
          <span>{{ _.toUpper(text) || "--" }}</span>
        </template>
        <template v-else-if="column.key === 'date'">
          <Time :value="text"></Time>
        </template>
        <template v-else-if="column.key === 'size'">
          <!-- type：5是双语文件且没有size -->
          <span v-if="record.type != 5">{{ fileSize(text) }}</span>
          <span v-else>--</span>
        </template>
        <template v-else-if="column.key === 'pairs'">
          <LanguageGroup :more="true" :show-name="false" :list="text"></LanguageGroup>
        </template>
        <template v-else>
          {{ text || "--" }}
        </template>
      </template>
    </Table>
  </div>
</template>