<script setup lang="ts">
import Icon from "../icon";
import * as _ from "lodash-es";
import { api } from "../../api";
import { some } from "../../utils";
import BigNumber from "bignumber.js";
import FileIcon from "../icon/file.vue";
import { ref, computed, PropType } from "vue";
import { Button, Table } from "ant-design-vue";
import Time from "../time";
import { table, useState, date, downloadFile, fileDownloadUrl, fileSize } from "@ue/utils";

import Handle from "./handle.vue";
import { headers } from "./heder";
import { LanguageGroup } from "../language";

import type { Upload } from "../../utils/upload";
import type { FileType, FileItem, FileOperate } from "./props";
import Download from "../download/index.vue";

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

const uploadFileProgress = ref<Upload[]>([]);
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
  const uploadList: FileItem[] = [];
  const list: FileItem[] = state.value.results;
  for (const upload of uploadFileProgress.value) {
    const value = some(list, upload.key);
    if (value) {
      value.progress = upload.progress;
      value.filePath = upload.url;
    } else {
      uploadList.push({
        key: upload.key,
        progress: upload.progress,
        fileExt: _.last(upload.name?.split(".")) as string,
        fileName: upload.name,
        fileSize: upload.file.size,
        filePath: upload.url,
      });
    }
  }
  return _.concat(uploadList, list);
});

const tableScroll = computed(function () {
  if (state.value.total > 5) {
    return { y: 300 };
  }
  return {};
});

const customRow = function (data: FileItem) {
  if (data.key) {
    const number = new BigNumber(data.progress).times(100).toFixed(0);
    return {
      "class": ["upload-progress"],
      "style": `--eci-upload-progress: ${Number(number)}%;`
    };
  }
  return {};
};


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
        v-model:progress="uploadFileProgress" 
        :subType="subType" 
        @click="onReload" 
        @download="onDownload">
      </Handle>
    </div>

    <!-- 资源文件列表 -->
    <Table class="drive-list mt-5" table-layout="auto" :custom-row="customRow" :loading="isLoading"
      :row-selection="rowSelection" :columns="headers(task, subType)" :data-source="fileList" :scroll="tableScroll"
      :pagination="false">

      <template #bodyCell="{ column, record, text }">
        <template v-if="column.key === 'name'">
          <Download class="w-full" :value="record.type != 5 ? record.filePath : ''">
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

<style scoped lang="scss">
.drive-list {
  ::v-deep(tbody tr) {
    &.upload-progress {
      background-repeat: no-repeat;
      background-position: left center;
      background-size: var(--eci-upload-progress) 100%;
      background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAwCAYAAADQMxCBAAAABHNCSVQICAgIfAhkiAAAABFJREFUCFtjePL+3z+GkUMAAK6zttH3E4MqAAAAAElFTkSuQmCC");
    }

    &:hover {
      td {
        background: none !important;
      }
    }
  }
}
</style>