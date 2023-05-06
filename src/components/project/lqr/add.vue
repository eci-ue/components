<script setup lang="ts">
/**
 * @file Add Lqr
 * @author svon.me@gmail.com
 */

 import _ from "lodash-es";
import { api } from "../../../api";
import { reactive, toRaw, computed } from "vue";
import { UploadLqr } from "./type";
import { useValidate } from "@ue/form";
import { rule as rules } from "@ue/utils";
import i18n from "../../../utils/i18n";
import Download from "../../download/index.vue";
import { DownloadType } from "../../download/type";
import { UploadOSS, SkinView } from "@ue/upload";
import { Form, FormItem, Button, RadioGroup, RadioButton, InputNumber } from "ant-design-vue";

import type { FileData, UploadFile } from "@ue/upload";


const props = defineProps({
  fileId: {
    type: [Number, String],
    required: true,
  },
  taskId: {
    type: [Number, String],
    default: true,
  },
  disabled: {
    type: Boolean,
    default: () => false
  },
  value: {
    type: Object,
    default () {
      return {};
    }
  }
});

const formState = reactive<UploadLqr>(new UploadLqr(props.value));

const LevelList = computed(function() {
  return [
    { name: i18n.lqr.level.case1, value: 1 },
    { name: i18n.lqr.level.case2, value: 2 },
    { name: i18n.lqr.level.case3, value: 3 },
    { name: i18n.lqr.level.case4, value: 4 },
    { name: i18n.lqr.level.case5, value: 5 },
    { name: i18n.lqr.level.case6, value: 6 },
    { name: i18n.lqr.level.case7, value: 7 },
  ];
});

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
const onUpload = function (file: FileData) {
  const data: UploadFile = file.value;
  formState.fileName = file.name() || "";
  formState.reportPath = data?.url || "";
};

const { formRef, validate } = useValidate();
const onSubmit = function () {
  if (props.disabled) {
    return true;
  }
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
      <FormItem label="" name="point" :rules="rules.text(i18n.lqr.rule.level)">
        <div class="flex w-full">
          <div class="flex-1">
            <InputNumber class="w-full"
              :min="1" 
              :precision="0" 
              v-model:value.trim="formState.point" 
              :max="9999999"
              :placeholder="i18n.lqr.placeholder.memoq" 
              :disabled="disabled" 
              @pressEnter="onCalculate" 
              @change="changePoint" />
          </div>
          <Button class="ml-4" type="primary" :disabled="!formState.point" @click="onCalculate">{{ i18n.lqr.title.calculate }}</Button>
        </div>
      </FormItem>

      <FormItem :label="i18n.lqr.title.LanguageLevel" name="level" :rules="rules.text('')">
        <RadioGroup :value="formState.level" class="level-box">
          <RadioButton :disabled="disabled" :value="item.value" :key="item.value" v-for="item in LevelList">{{ item.name }}</RadioButton>
        </RadioGroup>
      </FormItem>

      <FormItem 
        :label="i18n.lqr.title.languageReport" 
        name="reportPath"
        :rules="rules.text(i18n.lqr.rule.languageReport)">

        <UploadOSS class="w-full" :disabled="disabled" :multiple="true" :success="onUpload">
          <SkinView.Input label="Upload" :disabled="disabled" :name="formState.fileName"></SkinView.Input>
        </UploadOSS>
        <div class="mt-2">
          <Download :value="formState.reportPath" :type="DownloadType.oss">
            <span>{{ formState.fileName }}</span>
          </Download>
        </div>
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
