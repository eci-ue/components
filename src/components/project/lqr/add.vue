<script setup lang="ts">
/**
 * @file Add Lqr
 * @author svon.me@gmail.com
 */

 import _ from "lodash-es";
import { api } from "../../../api";
import { ref, reactive, toRaw } from "vue";
import { UploadLqr } from "./type";
import { useValidate, Form as UeForm } from "@ue/form";
import { rule as rules } from "@ue/utils";
import { partnerItems } from "./util"

import Icon from "../../icon";
import Upload, { UploadSkin } from "../../upload";
import { Form, FormItem, Button, RadioGroup, RadioButton, Tag, InputNumber } from "ant-design-vue";

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
  /** 
   * 是否为外部议员
   */
  partner: {
    type: Boolean,
    required: false,
    default: () => false
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
    <div v-if="partner">
      <p>感谢您抽出宝贵时间填写本质量评估表。本评估表旨在了解 QA 和审校人员对议员译文质量的反馈意见。您的反馈将帮助我们在客观真实评估议员能力和表现的同时，发现并解决潜在的质量问题。</p>
      <p>请您客观填写以下评估表。</p>
      <div class="border border-solid border-gray-300 p-4 rounded-sm">
        <UeForm :items="partnerItems" :buttons="false"></UeForm>
      </div>
    </div>
    <div v-else>
      <Form ref="formRef" layout="vertical" class="my-4" :model="formState">
        <FormItem label="" name="point" :rules="rules.text('Please Calculate Language Quality Level')">
          <div class="flex space-x-4">
            <InputNumber 
              :min="1" 
              :precision="0" 
              v-model:value.trim="formState.point" 
              :max="9999999"
              placeholder="MemoQ penalty point" 
              @pressEnter="onCalculate" 
              @change="changePoint" />
            <Button type="primary" :disabled="!formState.point" @click="onCalculate">calculate</Button>
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
          
          <Upload :drive="true" label="Upload" :multiple="true" :skin="UploadSkin.default" @success="onUpload"></Upload>

          <div class="mt-2" v-if="formState.fileName">
            <Tag class="border-none bg-eci-primary-light">
              <div class="flex items-center space-x-1">
                <Icon type="icon-link2" class="text-eci-deep-gray text-base"></Icon>
                <a class="text-eci-info-color mx-1">{{ formState.fileName }}</a>
                <Icon type="close-outlined" class="text-eci-black-light cursor-pointer" @click="onUpload()"></Icon>
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

<style lang="scss" scoped>
.level-box {
  ::v-deep(.ant-radio-button-wrapper) {
    @apply w-full mb-2 bg-eci-milk text-eci-deep-gray cursor-auto;
  }

  ::v-deep(.ant-radio-button-wrapper:hover) {
    @apply text-eci-deep-gray;
  }

  ::v-deep(.ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled)) {
    @apply text-eci-black border-eci-info-color bg-eci-info-color bg-opacity-20 rounded-sm;
  }
}
</style>
