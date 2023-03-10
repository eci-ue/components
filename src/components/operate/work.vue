<script setup lang="ts">
import * as _ from "lodash-es";
import { reactive } from "vue";
import { api } from "../../api";
import Upload,{ UploadSkin } from "../upload";
import Icon from "../icon";
import { SubmitType } from "./type";
import { Form, FormItem, Tag, Slider } from "ant-design-vue";
import { useValidate } from "@ue/form";
import { rule as rules } from "@ue/utils";
import type { UploadFile } from "../upload/props";

const props = defineProps({
  taskId: {
    type: Number,
    required: true,
  }
});

let submitParams = reactive(new SubmitType())

//上传文件
const onUpload = function (data: UploadFile) {
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
    submitParams.taskId = props.taskId
    const status = await api.task.interruptSubmit<SubmitType>(submitParams);
    if (status) {
      return true
    }
  }
  return false;

}
defineExpose({ submit: onSubmit });
</script>

<template>
  <div>
    <div>
      <Form ref="formRef" layout="vertical" :model="submitParams">
        <FormItem label="Percentage of work you have done already">
          <div class="flex items-center">
            <Slider class="flex-1" v-model:value="submitParams.rate" :min="0" :max="100" />
            <span class="ml-2">{{ submitParams.rate }}%</span>
          </div>
        </FormItem>
        <FormItem label="Attachment" name="attachment" :rules="rules.array('Please Upload Attachment')">
          <Upload :drive="true" label="Upload" :skin="UploadSkin.default" @success="onUpload" class="mb-2"></Upload>
          <div class="mb-1" v-for="(file, index) in submitParams.attachment" :key="`${index}-${file.fileName}`">
            <Tag closable @close="deleteFile(index)" class="border-none bg-primary-light">
              <template #icon>
                <Icon type="link-outlined" class="text-deep-gray"></Icon>
              </template>
              <template #closeIcon>
                <Icon type="close-outlined" class="text-black-light ml-1"></Icon>
              </template>
              <a class="text-info-color">{{ file.fileName }}</a>
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
