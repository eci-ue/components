<script setup lang="ts">
import Icon from "../icon";
import * as _ from "lodash-es";
import BigNumber from "bignumber.js";
import { Button } from "ant-design-vue";
import { api } from "../../api";
import { useState, downloadFile, fileDownloadUrl } from "@ue/utils";
interface InfoType {
  rate: number,
  taskFileList: { fileName: string, filePath: string }[]

}
const props = defineProps({
  taskId: {
    type: [String, Number],
    default: "",
  }
});
const { state } = useState.data(function () {
  return api.task.interruptInfo<InfoType>(props.taskId)
});
const onDownload = function (fileName: string, filePath: string) {
  if (filePath) {
    const url = fileDownloadUrl(filePath);
    downloadFile(url, fileName);
  }
}
</script>

<template>
  <div class="flex">
    <div class="text-label-color mr-6">Task process</div>
    <div>{{ new BigNumber(state.rate || 0).div(100) }} %</div>
  </div>
  <div class="mt-7 min-h-50">
    <div class="text-label-color">File</div>
    <section v-if="_.size(state.taskFileList) > 0">
      <p class="mt-1.5" v-for="item in state.taskFileList || []">
        <span class="bg-primary-light py-1 px-1.5">
          <Icon type="link-outlined" class="mr-1 text-deep-gray"></Icon>
          <Button type="link" :class="{ 'cursor-not-allowed': !item.filePath }"
            @click="onDownload(item.fileName, item.filePath)">{{ item.fileName }}</Button>
        </span>
      </p>
    </section>
    <span v-else class="ml-5 text-label-color">--</span>
</div>
</template>
