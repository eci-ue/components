<script setup lang="ts">
/**
 * @file 操作
 * @author svon.me@gmail.com
 */

import * as _ from "lodash-es";
import { api } from "../../api";
import { rule as rules } from "@ue/utils";
import { form } from "@ue/form"
import { FileType, FileOperate,FileItem } from "./props";
import { Button, Space } from "ant-design-vue";
import { computed, PropType, toRaw } from "vue";

import Upload from "../upload";
import FormFile from "../form/file.vue";
import FormlanguagePairs from "../form/language/pairs.vue";

import type { Upload as UploadData } from "../../utils/upload";
import type { UploadFile } from "../../components/upload/props";


const $emit = defineEmits(["update:progress", "click", "download"]);
const props = defineProps({
  // 项目ID / 任务ID
  id: {
    required: true,
    type: [String, Number],
  },
  // 语言ID
  language: {
    required: true,
    type: [String, Number],
  },
  // 文件类型
  type: {
    required: true,
    type: String as PropType<FileType>
  },
  // 文件操作按钮
  fileOperate: {
    required: false,
    type: Array as PropType<FileOperate[]>,
    default: () => []
  },
  // 是否为 task 类型
  task: {
    type: Boolean,
    default: () => false
  },
  // 已选择的文件ID 列表
  selectedKeys: {
    default: [],
    type: Array as PropType<Array<string | number>>,
  },
  // 已选择的文件列表
  selected: {
    default: [],
    type: Array as PropType<Array<FileItem>>,
  },
  progress: {
    default: [],
    type: Array as PropType<any[]>,
  },
  // 是否禁用操作按钮
  disabled: {
    type: Boolean,
    default: () => false
  },
  // 文件类型过滤
  accept: {
    type: [String, Function] as PropType<string | ((value: File) => boolean)>,
    required: false
  },
});

// 上传中的文件
const uploadFileProgress = computed<UploadData[]>({
  get: () => props.progress,
  set: (value: UploadData[]) => {
    $emit("update:progress", value);
  }
});

// 选择网盘文件
const onSelectDriveFile = async function () {
  const option = {
    width: 460,
    title: "ECI Drive"
  };

  const data = await form<{ fileIds: number[] }>({
    key: "fileIds",
    component: FormFile,
    meta: {
      all: true,
      multiple: true
    },
    rules: rules.array("Please select drive file")
  }, option);
  if (!data) {
    return;
  }

  let status: boolean = false;
  if (props.task) {
    // todo
  } else {
    status = await api.project.uploadDrive(
      data.fileIds,
      props.id,
      props.type,
      props.language
    );
  }
  if (status) {
    $emit("click");
  }
};

// 直接上传文件
const onUpload = async function (data: UploadFile) {
  const file = {
    fileName: data.name,
    filePath: data.url,
    fileSize: data.file?.size,
    fileExt: _.last(data.name.split(".")),
  };

  let status: boolean = false;
  if (props.task) {
    status = await api.project.uploadTaskFile(file, props.id, props.type);
  } else {
    status = await api.project.uploadDirect(
      [file],
      props.id,
      props.type,
      props.language
    );
  }
  if (status) {
    $emit("click");
  }
}

// 设置语言对
const onChangePairs = async function () {
  const list = await api.project.getPairs(props.id, props.language);
  const option = {
    width: 460,
    title: "Language pairs"
  };
  const data = await form<{ langPairIds: string[] }>({
    key: "langPairIds",
    component: FormlanguagePairs,
    meta: { list: _.concat(list) },
    rules: rules.array("Please select language pairs")
  }, option);
  if (data) {
    const fileIds: Array<string | number> = [...toRaw(props.selectedKeys)];
    const languagePairs = _.map(data.langPairIds, function (value: string) {
      const [sourceLanguageId, targetLanguageId] = value.split(".");
      return { sourceLanguageId, targetLanguageId }
    });

    let status: boolean = false;
    if (props.task) {
      // todo
    } else {
      status = await api.project.setPairs(fileIds, languagePairs);
    }
    if (status) {
      $emit("click");
    }
  }
}
// 删除文件
const onRemoveFile = async function () {
  const fileIds = toRaw(props.selectedKeys);
  let status: boolean = false;
  if (props.task) {
    status = await api.project.deleteTaskFile(fileIds);
  } else {
    status = await api.project.removeFile(props.id, fileIds);
  }
  if (status) {
    $emit("click");
  }
}

// 文件下载
const onDwonload = function () {
  $emit("download");
}

// 下载目标文件
const onDwonTarget = function () {
  //todo
  console.log("下载双语文件，待处理")
}

const isHave = function (val: FileOperate) {
  return _.includes(props.fileOperate, val)
}

const operateBtn = computed(() => {
  return {
    upload: isHave(FileOperate.upload), // 上传
    large: isHave(FileOperate.large), // large files entry
    delete: isHave(FileOperate.delete), // delete
    language: isHave(FileOperate.language), // Language pairs
    download: isHave(FileOperate.download), //  download
    downTarget: isHave(FileOperate.downTarget), // download -target
  }
})

const disabledDel = computed(()=>{
  if (props.task){
    //解析的双语文件类型不允许删除
    return _.size(props.selected.filter(item=>item.type != 5)) < 1
  }
  return props.selectedKeys.length < 1
})
</script>

<template>
  <div class="flex justify-between items-center">
    <Space>
      <Button v-if="operateBtn.delete" :disabled="disabled || disabledDel" @click="onRemoveFile">Delete</Button>
      <Button v-if="operateBtn.download" :disabled="selectedKeys.length < 1" @click="onDwonload">Download</Button>
      <template v-if="type === FileType.source && operateBtn.language">
        <!-- 源文件模式下才启用该功能 -->
        <Button :disabled="disabled || selectedKeys.length < 1" @click="onChangePairs">Language pairs</Button>
      </template>
      <Upload v-if="operateBtn.upload" 
        :accept="accept" 
        :disabled="disabled" 
        :show-progress="false" 
        :multiple="true" 
        v-model:progress="uploadFileProgress" 
        @success="onUpload">
        <span class="ant-btn ant-btn-primary">Upload Files</span>
      </Upload>
      <Button v-if="operateBtn.downTarget" :disabled="selectedKeys.length < 1" @click="onDwonTarget">Download Target</Button>
    </Space>
    <Button v-if="operateBtn.large" type="link" :disabled="disabled" @click="onSelectDriveFile">Large files entry</Button>
  </div>
</template>