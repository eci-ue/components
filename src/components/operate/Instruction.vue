<script setup lang="ts">
import { Icon } from "@ue/icon";
import * as _ from "lodash-es";
import i18n from "../../utils/i18n";
import { Form, FormItem, Divider } from "ant-design-vue";
import { downloadFile, fileDownloadUrl } from "@ue/utils";

defineProps({
  data: {
    type: Object,
    required: true,
  }
});

const onDownload = function (fileName: string, filePath: string) {
  if (filePath) {
    const url = fileDownloadUrl(filePath);
    downloadFile(url, fileName);
  }
}
</script>

<template>
  <template v-if="_.size(data.workInstructionList) > 0">
    <div class="bg-milk border border-border-color">
      <p v-for="item, index in data.workInstructionList" :key="index"
        class="m-0 p-2 border-b border-solid border-border-color last:border-none">{{ item }}</p>
    </div>
    <Divider dashed></Divider>
  </template>
  <Form ref="formRef" layout="vertical" class="my-4">
    <FormItem :label="i18n.common.label.comment">{{ data.commentRequest || '-' }}</FormItem>
    <template v-if="_.size(data.attachments) > 0">
      <FormItem :label="i18n.part(i18n.common.label.file, 0)">
        <p v-for="item in data.attachments" class="mb-1">
          <span class="link px-2 py-0.5" :class="{ 'cursor-not-allowed': !item.filePath }" style="background-color: #F0F2F7">
            <Icon type="link-outlined" class="text-deep-gray mr-1"></Icon>
            <span @click="onDownload(item.fileName, item.filePath)">{{ item.fileName }}</span>
          </span>
        </p>
      </FormItem>
    </template>
  </Form>
</template>

