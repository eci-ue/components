<script setup lang="ts">
import * as _ from "lodash-es";
import { onMounted, reactive } from "vue";
import { api } from "../../api";
import { UploadOSS, SkinView } from "@ue/upload";
import { Icon } from "@ue/icon";
import { SubmitType } from "./type";
import { Form, FormItem, Tag, Slider } from "ant-design-vue";
import { useValidate } from "@ue/form";
import i18n from "../../utils/i18n";
import { useState } from "@ue/utils";
import * as message from "@ue/message";

import type { InterruptRate } from "./type";
import type { UploadFile, FileData } from "@ue/upload";

const props = defineProps({
  taskId: {
    type: Number,
    required: true,
  }
});
// 中断提交前完成比例获取
// @ts-ignore
const { state, execute } = useState.dataExecute<InterruptRate>(function () {
  return api.task.interruptRate(props.taskId);
});
let submitParams = reactive(new SubmitType())

//上传文件
const onUpload = function (file: FileData) {
  const data: UploadFile = file.value;
  const value = {
    fileName: data.name,
    fileType: _.last(data.name.split(".")),
    size: data.size,
    storagePath: data.url
  };
  submitParams.attachment = _.concat(submitParams.attachment || [], value);
};

//删除文件
const deleteFile = function (index: number) {
  submitParams.attachment.splice(index, 1);
};

const { formRef, validate } = useValidate();
const onSubmit = async function () {
  const status = await validate();
  if (status) {
    if (!state.value.isUse && submitParams.rate != 0 && _.size(submitParams.attachment) == 0){
      message.error(i18n.operate.placeholder.attachment);
      return false;
    }
    submitParams.taskId = props.taskId
    const status = await api.task.interruptSubmit<SubmitType>(submitParams);
    if (status) {
      return true
    }
  }
  return false;

}
onMounted(async () => {
  await execute()
  if (state.value.isUse == 1) {
    submitParams.rate = state.value.rate
  }

})
defineExpose({ submit: onSubmit });
</script>

<template>
  <div>
    <div>
      <Form ref="formRef" layout="vertical" :model="submitParams">
        <FormItem :label="i18n.operate.label.percentage">
          <div class="flex items-center">
            <Slider :disabled="!!state.isUse" class="flex-1" v-model:value="submitParams.rate" :min="0" :max="100" />
            <span class="ml-2">{{ submitParams.rate }}%</span>
          </div>
        </FormItem>
        <FormItem v-if="!state.isUse" :label="i18n.operate.label.attachment">
          <UploadOSS class="mb-2" :task-id="taskId" :success="onUpload">
            <SkinView.Auto value="Upload"></SkinView.Auto>
          </UploadOSS>
          <div class="mb-1" v-for="(file, index) in submitParams.attachment" :key="`${index}-${file.fileName}`">
            <Tag class="border-none bg-primary-light max-w-full">
              <div class="flex items-center w-full">
                <Icon type="link-outlined" class="text-deep-gray block"></Icon>
                <div class="text-info-color w-full mx-1 overflow-ellipsis overflow-hidden">{{ file.fileName }}</div>
                <Icon type="close-outlined" class="text-black-light ml-1 block cursor-pointer"  @click="deleteFile(index)"></Icon>
              </div>
            </Tag>
          </div>
        </FormItem>
      </Form>
    </div>
    <div>
      <slot name="buttons"></slot>
    </div>
  </div>
</template>
