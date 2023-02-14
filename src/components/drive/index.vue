<script setup lang="ts">
import Icon from "../icon";
import * as _ from "lodash-es";
import { api } from "../../api";
import { some } from "../../utils";
import BigNumber from "bignumber.js";
import FileIcon from "../icon/file.vue";
import { ref, computed, PropType } from "vue";
import { Button, Table } from "ant-design-vue";
import { table, useState, date, downloadFile, fileDownloadUrl } from "@ue/utils";

import Handle from "./handle.vue";
import { headers } from "./heder";
import { LanguageGroup } from "../language";

import type { Upload } from "../../utils/upload";
import type { FileType, FileItem } from "./props";

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
  // 是否为 task 类型
  task: {
    type: Boolean,
    default: () => false
  }
});

const uploadFileProgress = ref<Upload[]>([]);
const { selected, selectedKeys, rowSelection, onClearSelected } = table.useSelection<FileItem>();

const { state, isLoading, execute } = useState.list<FileItem>(() => {
  if (props.task) {
    return [] as any;
  }
  return api.project.fileList(props.id, props.type, props.language);
}, void 0, void 0, "fileId");


const onReload = async function() {
  onClearSelected();
  await execute(50);
  $emit("change", state.value.total);
};


const fileList = computed<FileItem[]>(function() {
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

const tableScroll = computed(function() {
  if (state.value.total > 5) {
    return { y: 300 };
  }
  return {};
});

const customRow = function(data: FileItem) {
  if (data.key) {
    const number = new BigNumber(data.progress).times(100).toFixed(0);
    return {
      "class": ["upload-progress"],
      "style": `--eci-upload-progress: ${Number(number)}%;`
    };
  }
  return {};
};


const onDownload = function() {
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
      :language="language" 
      :type="type" 
      :task="task" 
      :selected="selectedKeys" 
      v-model:progress="uploadFileProgress" 
      @click="onReload" @download="onDownload"></Handle>
    </div>

    <!-- 资源文件列表 -->
    <Table class="drive-list" table-layout="auto" 
      :custom-row="customRow" 
      :loading="isLoading" 
      :row-selection="rowSelection" 
      :columns="headers(task)" 
      :data-source="fileList" 
      :scroll="tableScroll" 
      :pagination="false">

      <template #bodyCell="{ column, record, text  }">
        <template v-if="column.key ==='name'">
          <Button type="link">
            <FileIcon :value="text" :max-size="24">
              <Icon type="link-outlined"></Icon>
            </FileIcon>
          </Button>
        </template>
        <template v-if="column.key ==='type'">
          <span>{{ _.toUpper(text) }}</span>
        </template>
        <template v-if="column.key ==='date'">
          <span>{{ date.format(text) }}</span>
        </template>
        <template v-else-if="column.key ==='pairs'">
          <LanguageGroup :more="true" :show-name="false" :list="text"></LanguageGroup>
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