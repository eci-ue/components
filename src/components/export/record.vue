<script setup lang="ts">
/**
 * @file 导出任务记录
 * @author svon.me@gmail.com
 */
import * as _ from "lodash-es";
import { api } from "../../api";
import i18n from "../../utils/i18n";
import { PropType, onMounted } from "vue";
import Download from "../download/index.vue";
import { Table, Button } from "ant-design-vue";
import { DownloadType } from "../download/type";
import { PageResult, table, useState } from "@ue/utils";
import { WorkMode, headers, expanded, ExportStatus } from "./props";

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
  if(props.mode === WorkMode.Memoq || props.mode === WorkMode.MemoqExpress) {
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

/**
 * 判断导出任务是否已完成
 * @param data 
 * @param status
 * @returns ExportStatus
 */
const exportStatus = function(data: Data): ExportStatus {
  const status = _.toInteger(data.status);
  if (props.mode === WorkMode.Transdoc) {
    return status || ExportStatus.prepare; // 默认为未开始
  }
  // MemoQ
  if (status === 1) {
    return ExportStatus.success;  // 完成
  }
  if (status === 2) {
    return ExportStatus.abnormal; // 失败
  }
  return ExportStatus.inPogress;  // 进行中
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
</script>

<template>
  <div>
    <Table table-layout="auto" :loading="isLoading" :columns="headers(mode, pm)" :data-source="state.results" :pagination="pagination">
      <template #bodyCell="{ column, record, text  }">
        <template v-if="column.key ==='operate'">
          <!-- 文件下载 -->
          <template v-if="exportStatus(record) === ExportStatus.success && mode === WorkMode.Memoq">
            <Download :value="text" :type="DownloadType.oss"></Download>
          </template>
          <template v-else-if="exportStatus(record) === ExportStatus.success && mode === WorkMode.Transdoc">
            <template v-if="partner">
              <Download :value="text" :name="record.fileName" :type="DownloadType.net" :cookie="record.cookie"></Download>
            </template>
            <template v-else>
              <Download :value="text" :name="record.fileName" :type="DownloadType.net"></Download>
            </template>
          </template>
          <template v-else>
            <Download></Download>
          </template>
        </template>
        <template v-else-if="column.key ==='date'">
          <Time :value="text"></Time>
        </template>
        <template v-else-if="column.key ==='status'">
          <template v-if="exportStatus(record) === ExportStatus.prepare">
            <span class="border-pending-500 bg-pending-200 text-pending py-1 px-2 inline-block rounded-sm border border-solid">
              {{ i18n.project.status.pending }}
            </span>
          </template>
          <template v-if="exportStatus(record) === ExportStatus.inPogress">
            <span class="border-progress-500 bg-progress-200 text-progress py-1 px-2 inline-block rounded-sm border border-solid">
              {{ i18n.project.status.pending }}
            </span>
          </template>
          <template v-if="exportStatus(record) === ExportStatus.success">
            <span class="border-primary-500 bg-primary-200 text-primary py-1 px-2 inline-block rounded-sm border border-solid">
              {{ i18n.project.export.status.finished }}
            </span>
          </template>
          <template v-if="exportStatus(record) === ExportStatus.abnormal">
            <span class="border-error-500 bg-error-200 text-error py-1 px-2 inline-block rounded-sm border border-solid">
              {{ i18n.project.export.status.rejected }}
            </span>
          </template>
        </template>
      </template>
      <template #expandedRowRender="{ record }">
        <div class="m-0">
          <Table class="w-full" :columns="expanded" :data-source="expandedList(record)" :pagination="false"></Table>
        </div>
      </template>
    </Table>
    <div class="text-center mt-3">
      <Button @click="onCancel">{{ i18n.common.button.cancel }}</Button>
    </div>
  </div>
</template>