<script setup lang="ts">
/**
 * @file Add Lqr
 * @author svon.me@gmail.com
 */

 import _ from "lodash-es";
import { api } from "../../../api";
import { ref, reactive, toRaw } from "vue";
import { UploadLqr } from "./type";
import { useValidate } from "@ue/form";
import { rule as rules } from "@ue/utils";

import Upload, { UploadSkin } from "../../upload";
import { Form, FormItem, Button, RadioGroup, RadioButton, InputNumber } from "ant-design-vue";

import type { UploadFile } from "../../upload/props";


const props = defineProps({
  fileId: {
    type: [Number, String],
    required: true,
  },
  taskId: {
    type: [Number, String],
    default: true,
  },
});

const formState = reactive<UploadLqr>(new UploadLqr());

const LevelList = ref([
  { name: 'Level 1- Perfect', value: 1 },
  { name: 'Level 2- Excellent', value: 2 },
  { name: 'Level 3- Good', value: 3 },
  { name: 'Level 4- OK', value: 4 },
  { name: 'Level 5- Bad', value: 5 },
  { name: 'Level 6- Very Bad', value: 6 },
  { name: 'Level 7- Totally Unacceptable', value: 7 },
]);

//计算 memoq penalty point 对应级别接口
const onCalculate = async function () {
  const level = await api.project.culMemoqPoint(props.fileId, formState.point);
  if (level) {
    formState.level = level;
  } else {
    changePoint();
  }
};
//改变 point 重置 level
const changePoint = function () {
  formState.level = 0;
};

//上传文件
const onUpload = function (data?: UploadFile) {
  formState.fileName = data?.name || "";
  formState.reportPath = data?.url || "";
};

const { formRef, validate } = useValidate();
const onSubmit = function () {
  return validate(function() {
    return Object.assign(toRaw(formState), {
      fileId: props.fileId,
      taskId: props.taskId
    });
  });
}
defineExpose({ submit: onSubmit });
</script>

<template>
  <div>
    <Form ref="formRef" layout="vertical" class="my-4 w-full" :model="formState">
      <FormItem label="" name="point" :rules="rules.text('Please Calculate Language Quality Level')">
        <div class="flex w-full">
          <div class="flex-1">
            <InputNumber class="w-full"
              :min="1" 
              :precision="0" 
              v-model:value.trim="formState.point" 
              :max="9999999"
              placeholder="MemoQ penalty point" 
              @pressEnter="onCalculate" 
              @change="changePoint" />
          </div>
          <Button class="ml-4" type="primary" :disabled="!formState.point" @click="onCalculate">calculate</Button>
        </div>
      </FormItem>

      <FormItem label="Language Quality Level:" name="level" :rules="rules.text('')">
        <RadioGroup :value="formState.level" class="level-box">
          <RadioButton :value="item.value" :key="item.value" v-for="item in LevelList">{{ item.name }}</RadioButton>
        </RadioGroup>
      </FormItem>

      <FormItem 
        label="Language Quality Report:" 
        name="reportPath"
        :rules="rules.text('Please Upload Language Quality Report')">
        <Upload class="w-full" :name="formState.fileName" :drive="true" label="Upload" :multiple="true" :skin="UploadSkin.input" @success="onUpload"></Upload>
      </FormItem>
    </Form>
    <div>
      <slot name="buttons"></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.level-box {
  ::v-deep(.ant-radio-button-wrapper) {
    @apply w-full mb-2 bg-milk text-deep-gray cursor-auto;
  }

  ::v-deep(.ant-radio-button-wrapper:hover) {
    @apply text-deep-gray;
  }

  ::v-deep(.ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled)) {
    @apply text-black border-info-color bg-info-color bg-opacity-20 rounded-sm;
  }
}
</style>
