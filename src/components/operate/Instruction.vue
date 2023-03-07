<script setup lang="ts">
import { Alert, Form, FormItem, Tag, Divider } from "ant-design-vue";
import Icon from "../icon";
import { downloadFile, fileDownloadUrl } from "@ue/utils";
import * as _ from "lodash-es";

defineProps({
  data: {
    type: Object,
    required: true,
  }
});

const onDownload = function (fileName: string, filePath: string) {
  const url = fileDownloadUrl(filePath);
  downloadFile(url, fileName);
}
</script>

<template>
  <template v-if="_.size(data.workInstructionList) > 0">
    <div>
      <Alert :message="item" :key="index" type="info"
        class="bg-milk border border-border-color border-b-0 last:border-b-1"
        v-for="item, index in data.workInstructionList"></Alert>
    </div>
    <Divider dashed></Divider>
  </template>
  <Form ref="formRef" layout="vertical" class="my-4">
    <FormItem label="Comments">
      {{ data.commentRequest || '-' }}
    </FormItem>
    <FormItem label="File" v-if="_.size(data.attachments) > 0">
      <p v-for="item in data.attachments" class="mb-1">
        <Tag color="#F0F2F7">
          <template #icon>
            <Icon type="link-outlined" class="text-deep-gray"></Icon>
          </template>
          <span class="link" @click="onDownload(item.fileName,item.filePath)">{{ item.fileName }}</span>
        </Tag>
      </p>
    </FormItem>

  </Form>

</template>

