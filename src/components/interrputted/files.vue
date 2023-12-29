<script setup lang="ts">
import { Icon } from "@ue/icon";
import * as _ from "lodash-es";
import i18n from "../../utils/i18n";
import { Button, Descriptions, DescriptionsItem } from "ant-design-vue";
import { api } from "../../api";
import { useState, downloadFile, fileDownloadUrl } from "@ue/utils";
interface InfoType {
  rate: number,
  actualWorkload: string,
  plannedWorkload: string,
  taskFileList: { fileName: string, filePath: string }[]

}
const props = defineProps({
  taskId: {
    type: [String, Number],
    default: "",
  }
});
// @ts-ignore
const { state } = useState.data<InfoType>(function () {
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
  <div class="work-info text-center">
    <Descriptions layout="vertical" bordered :column="3">
      <DescriptionsItem :label="i18n.operate.label.plannedWorkload">
        {{ state.plannedWorkload || 0 }}
      </DescriptionsItem>
      <DescriptionsItem :label="i18n.operate.label.process">
        {{ state.rate || 0 }} %
      </DescriptionsItem>
      <DescriptionsItem :label="i18n.operate.label.acturalWorkload">
        {{ state.actualWorkload }}
      </DescriptionsItem>
    </Descriptions>
  </div>
  <div class="mt-7 min-h-30">
    <div class="text-label-color">{{ i18n.part(i18n.common.label.file, 0) }}：</div>
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
<style scoped lang="less">
.work-info {
  ::v-deep(.ant-descriptions-bordered .ant-descriptions-item-label) {
    @apply py-2 px-3 text-deep-gray text-center;
  }

  ::v-deep(.ant-descriptions-bordered .ant-descriptions-item-content) {
    @apply p-2 px-3;
  }
}
</style>