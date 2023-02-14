<script setup lang="ts">
/**
 * @file 上传文件进度
 * @author svon.me@gmail.com
 */

import { PropType } from "vue";
import BigNumber from "bignumber.js";
import { Progress } from "ant-design-vue";
import FileIcon from "../icon/file.vue";
import { Status } from "../../utils/upload";

import type { Upload } from "../../utils/upload";

defineProps({
  fileList: {
    default: () => [],
    type: Array as PropType<Array<Upload & any>>
  }
});

const getProgressValue = function(value: string | number): number {
  const number = new BigNumber(value).times(100).toFixed(0);
  return Number(number);
}
</script>

<template>
  <div class="overflow-y-auto overflow-x-hidden max-hh-75 pr-3" v-show="(fileList.length > 0)">
    <template v-for="file in fileList" :key="file.key">
      <div class="mt-3.5 first:mt-0">
        <!-- 上传异常 -->
        <template v-if="file.status === Status.abnormal">
          <div>
            <FileIcon :value="file.name"></FileIcon>
          </div>
          <div >
            <Progress :percent="getProgressValue(file.progress)" status="exception"></Progress>
          </div>
        </template>
        <!-- 上传完成 -->
        <template v-else-if="file.status === Status.complete">
          <div class="flex items-center justify-between">
            <FileIcon :value="file.name"></FileIcon>
          </div>
          <div >
            <Progress :percent="100" status="success"></Progress>
          </div>
        </template>
        <template v-else>
          <div class="flex items-center justify-between">
            <FileIcon :value="file.name"></FileIcon>
          </div>
          <div >
            <Progress :percent="getProgressValue(file.progress)" status="active"></Progress>
          </div>
        </template>
      </div>
    </template>
  </div>
</template>