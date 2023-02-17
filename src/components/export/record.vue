<script setup lang="ts">
/**
 * @file 导出任务记录
 * @author svon.me@gmail.com
 */
import * as _ from "lodash-es";
import { api } from "../../api";
import { PropType, onMounted } from "vue";
import { WorkMode, headers, expanded } from "./props";
import { downloadFile, fileDownloadUrl, PageResult, table, useState } from "@ue/utils";

import Icon from "../icon";
import Time from "../time";

import type { Props, Data, ExportedFile } from "./props";
import type { UsePaginationData } from "@ue/utils/types/table/props";

const $emit = defineEmits(["cancel"]);

const props: Props = defineProps({
  // 项目ID
  id: {
    required: true,
    type: [String, Number],
  },
  // 语言ID
  language: {
    required: true,
    type: [String, Number],
  },
  // 工作模式
  mode: {
    required: true,
    type: String as PropType<WorkMode>,
  },
  // 是否为 PM
  pm: {
    type: Boolean,
    required: false,
    default: () => false
  },
  // 是否为外部任务
  partner: {
    type: Boolean,
    required: false,
    default: () => false
  },
});


// 获取下载记录列表
const getExportFileList = function(params: UsePaginationData) {
  if(props.mode === WorkMode.Memoq) {
    return api.project.getExportMomoqFileList<Data>(props.id, params.current, params.pageSize);
  }
  if (props.mode === WorkMode.Transdoc && props.pm) {
    return api.project.getExportTransDocPmFileList<Data>(props.id, props.language);
  }
  if (props.mode === WorkMode.Transdoc) {
    return api.project.getExportTransDocFileList<Data>(props.id, props.language, props.partner);
  }
  return Promise.resolve(new PageResult<Data>());
}

const { state, isLoading, pagination, execute } = table.usePagination<PageResult<Data>>(10, useState.listExecute<Data>(getExportFileList));

onMounted(() => execute());

const onCancel = function(e: Event) {
  $emit("cancel", e);
};

// 判断导出任务是否已完成
const isFinished = function(data: Data, status: number): boolean {
  if (_.toInteger(status) === 1) {
    return true;
  }
  return false;
}

// 数据兼容, 导出文件明细
const expandedList = function(data: Data) {
  if (props.mode === WorkMode.Memoq) {
    let list: string[] = [];
    if (data.fileNames && Array.isArray(data.fileNames)) {
      list.push(...data.fileNames);
    } if (data.fileNames && typeof data.fileNames === "string") {
      list = data.fileNames.split(",");
    }
    return list.map(function(name: string, index: number) {
      return { index: `F${index + 1}`, value: name };
    });
  } else {
    return _.map(_.compact(_.concat(data.exportedFiles)), function(item: ExportedFile) {
      return { index: item.fileNumber, value: item.filePath };
    })
  }
}

// 触发文件下载
const onDownload = function(data: Data, path: string) {
  if (props.mode === WorkMode.Memoq) {
    if (isFinished(data, data.status)) {
      downloadFile(fileDownloadUrl(path));
    }
  }
};
</script>

<template>
  <div>
    <Table table-layout="auto" :loading="isLoading" :columns="headers(mode)" :data-source="state.results" :pagination="pagination">
      <template #bodyCell="{ column, record, text  }">
        <template v-if="column.key ==='operate'">
          <span v-if="isFinished(record, text)" class="ininle-block cursor-pointer" @click="onDownload(record, text)">
            <Icon class="text-sm" type="icon-a-download"></Icon>
          </span>
          <span v-else class="ininle-block cursor-no-drop">
            <Icon class="text-sm" type="icon-a-download"></Icon>
          </span>
        </template>
        <template v-else-if="column.key ==='date'">
          <Time :value="text"></Time>
        </template>
        <template v-else-if="column.key ==='status'">
          <span class="text-primary py-1 px-2 inline-block rounded-sm border border-solid border-primary bg-primary-500" v-if="isFinished(record, text)">Finished</span>
          <span class="text-progress py-1 px-2 inline-block rounded-sm border border-solid border-progress bg-progress-500" v-els>In progress</span>
        </template>
      </template>
      <template #expandedRowRender="{ record }">
        <div class="m-0">
          <Table class="w-full" :columns="expanded" :data-source="expandedList(record)" :pagination="false"></Table>
        </div>
      </template>
    </Table>
    <div class="text-center mt-3">
      <Button @click="onCancel">Cancel</Button>
    </div>
  </div>
</template>