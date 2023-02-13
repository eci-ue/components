<script setup lang="ts">
/**
 * @file 文件上传
 * @author svon.me@gmail.com
 */

import * as _ from "lodash-es";
import { PropType, ref } from "vue";
import { UploadSkin } from "./props";
import * as upload from "../../logic/upload";

import Icon from "../icon";
import Progress from "./progress.vue";
import { Modal, Input } from "ant-design-vue";

import type { UploadFile } from "./props";
import type { Upload } from "../../logic/upload";

defineProps({
  // 是否上传到网盘
  drive: {
    type: Boolean,
    default: () => false
  },
  // 是否允许文件多选
  multiple: {
    type: Boolean,
    default: () => false
  },
  // 是否显示上传进度
  showProgress: {
    type: Boolean,
    default: () => true
  },
  // 文件类型
  accept: {
    type: String,
    default: "*"
  },
  // 皮肤，默认提供几种 UI 效果，不满足的情况下请使用 slot 自定义
  skin: {
    type: String as PropType<UploadSkin | string>,
    default: '',
  },
  // 上传按钮 label 名称
  label: {
    type: String,
    default: "Upload File"
  },
  // 上传后的文件名
  name: {
    type: String,
    default: ""
  },
  placeholder: {
    type: String,
    default: ""
  },
  disabled: {
    type: Boolean,
    default: () => false
  }
})

const emit = defineEmits(["update:progress", "success", "submit"]);
const visible = ref<boolean>(false);

const fileList = ref<Upload[]>([]);

// 上传进度处理
const onUploadChange = async function (url: string, data: Upload) {
  // 上传完成
  if (url && data.status === upload.Status.complete) {
    const value: UploadFile = {
      key: data.key,
      url, // 上传后生成的文件 url 地址
      name: data.name, // 文件名称
      size: data.file.size, // 文件大小
      file: data.file, // 文件对象
    };
    emit("success", value);
  }
  const ingFileList: Upload[] = [];
  const array: Upload[] = [];
  for (const item of fileList.value) {
    let value = item;
    if (item.key === data.key) {
      value = data;
    }
    array.push(value as Upload);
    if (item.progress >= 1) {
      continue;
    }
    ingFileList.push(value as Upload);
  }
  fileList.value = array;
  emit("update:progress", ingFileList);
}

const onChange = function (e: Event) {
  // 线上上传进度条
  visible.value = true;
  const input: HTMLInputElement = e.target as HTMLInputElement;
  // 上传文件
  const list = upload.put([].slice.call(input.files), onUploadChange);
  // 重置上传按钮
  input.value = "";
  // 上传文件记录
  fileList.value = _.concat(list, fileList.value);
  return false;
}


const onSubmit = function () {
  visible.value = false;
  const list: Upload[] = [];
  for (const item of fileList.value) {
    if (item.status === upload.Status.complete) {
      continue;
    }
    list.push(item as Upload);
  }
  fileList.value = list;
  emit("submit");
}

const onCancel = function () {
  return onSubmit();
}

</script>
<template>
  <div class="inline-block">
    <label class="block" v-if="skin === UploadSkin.button">
      <template v-if="disabled">
        <span class="ant-btn" disabled>
          <i class="flex items-center not-italic">
            <Icon type="cloud-upload-outlined"></Icon>
            <span class="ml-2">{{ label }}</span>
          </i>
        </span>
      </template>
      <template v-else>
        <template v-if="multiple">
          <input class="hidden" type="file" @change="onChange" multiple :accept="accept" />
        </template>
        <template v-else>
          <input class="hidden" type="file" @change="onChange" :accept="accept" />
        </template>
        <span class="ant-btn ant-btn-primary text-white">
          <i class="flex items-center not-italic">
            <Icon class="text-xl" type="icon-in-file"></Icon>
            <span class="ml-2">{{ label }}</span>
          </i>
        </span>
      </template>
    </label>
    <label class="block" v-if="skin === UploadSkin.default">
      <template v-if="disabled">
        <span class="ant-btn" disabled>
          <i class="flex items-center not-italic">
            <Icon type="icon-a-upload"></Icon>
            <span class="ml-2">{{ label }}</span>
          </i>
        </span>
      </template>
      <template v-else>
        <template v-if="multiple">
          <input class="hidden" type="file" @change="onChange" multiple :accept="accept" />
        </template>
        <template v-else>
          <input class="hidden" type="file" @change="onChange" :accept="accept" />
        </template>
        <span class="ant-btn">
          <i class="flex items-center not-italic">
            <Icon type="icon-a-upload"></Icon>
            <span class="ml-2">{{ label }}</span>
          </i>
        </span>
      </template>
    </label>
    <div class="block" v-else-if="skin === UploadSkin.input">
      <Input :value="name" :placeholder="placeholder" :readonly="true" :disabled="disabled">
        <template #addonAfter>
          <label class="inline-block cursor-pointer">
            <template v-if="multiple">
              <input class="hidden" type="file" @change="onChange" multiple :accept="accept" />
            </template>
            <template v-else>
              <input class="hidden" type="file" @change="onChange" :accept="accept" />
            </template>
            <span class="flex items-center select-none">
              <Icon type="upload-outlined"></Icon>
              <span class="ml-1">{{ label }}</span>
            </span>
          </label>
        </template>
      </Input>
    </div>
    <label class="block" v-else>
      <template v-if="multiple">
        <input class="hidden" type="file" @change="onChange" multiple :accept="accept" :disabled="disabled"/>
      </template>
      <template v-else>
        <input class="hidden" type="file" @change="onChange" :accept="accept" :disabled="disabled"/>
      </template>
      <slot></slot>
    </label>
    <template v-if="showProgress">
      <Modal title="Upload Process" v-model:visible="visible" :centered="true" :mask-closable="false" ok-text="Confirm"
        @ok="onSubmit" @cancel="onCancel">
        <Progress :file-list="fileList"></Progress>
      </Modal>
    </template>
  </div>
</template>