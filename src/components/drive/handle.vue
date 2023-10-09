<script setup lang="ts">
/**
 * @file 操作
 * @author svon.me@gmail.com
 */

import { form } from "@ue/modal";
import * as _ from "lodash-es";
import { api } from "../../api";
import i18n from "../../utils/i18n";
import { rule as rules } from "@ue/utils";
import { FileType, FileOperate, FileItem } from "./props";
import { Button, Space } from "ant-design-vue";
import { computed, PropType, toRaw, h as createElement } from "vue";

import Head from "./head.vue";
import { UploadOSS } from "@ue/upload";
import FormFile from "../form/file.vue";
import { ExportDownload } from "../export/index";
import FormlanguagePairs from "../form/language/pairs.vue";

import type { UploadFile, FileData } from "@ue/upload";

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
  //任务节点(小类)
  subType: {
    type: String,
    default: ""
  },
  //仅供按钮Download Target使用
  isPm: {
    type: Boolean,
    default: false
  },
  // 是否为外部任务
  partner: {
    type: Boolean,
    required: false,
    default: () => false
  },
});

// 选择网盘文件
const onSelectDriveFile = async function () {
  const option = {
    width: 460,
    title: props.partner ? i18n.drive.label.title : createElement(Head)
  };

  const data = await form<{ fileIds: number[] }>({
    key: "fileIds",
    component: FormFile,
    meta: {
      all: true,
      multiple: true
    },
    rules: rules.array(i18n.drive.placeholder.select)
  }, option);
  if (!data) {
    return;
  }

  let status: boolean = false;
  if (props.task) {
    status = await api.project.uploadTaskDrive(
      data.fileIds,
      props.id,
      props.type
    );
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
const onUpload = async function (fileData: FileData) {
  // const data: UploadFile = fileData.value;

  const file = {
    fileName: fileData.name(),              // 文件名称
    // filePath: data.url,
    // fileSize: data.file?.size,
    // fileExt: _.last(data.name.split(".")),
    filePath: fileData.url(),               // 文件路径
    fileSize: fileData.size(),              // 文件大小
    fileExt: fileData.suffix(),             // 文件后缀
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
  try {
    if (status) {
      $emit("click");
    }
  } catch (error) {
    // todo
  }
}

// 设置语言对
const onChangePairs = async function () {
  let list: any = []
  if (props.task) {
    list = await api.project.getTaskPairs(props.id, props.language);
  } else {
    list = await api.project.getPairs(props.id, props.language);
  }
  const option = {
    width: 460,
    title: i18n.common.label.languagePairs
  };
  const data = await form<{ langPairIds: string[] }>({
    key: "langPairIds",
    component: FormlanguagePairs,
    meta: { list: _.concat(list) },
    rules: rules.array(
      i18n.template(i18n.common.placeholder.select, {
        label: i18n.common.label.languagePairs
      })
    )
  }, option);
  if (data) {
    const fileIds: Array<string | number> = [...toRaw(props.selectedKeys)];
    const languagePairs = _.map(data.langPairIds, function (value: string) {
      const [sourceLanguageId, targetLanguageId] = value.split(".");
      return { sourceLanguageId, targetLanguageId }
    });

    let status: boolean = false;
    if (props.task) {
      status = await api.project.setTaskPairs(fileIds, languagePairs);
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

const disabledDel = computed(() => {
  if (props.task) {
    //解析的双语文件类型不允许删除和下载
    return _.size(props.selected.filter(item => item.type != 5)) < 1
  }
  return props.selectedKeys.length < 1
})
</script>

<template>
  <div class="flex justify-between items-center">
    <Space>
      <Button v-if="!disabled && operateBtn.delete" :disabled="disabledDel" @click="onRemoveFile">{{ i18n.common.button.delete }}</Button>
      <Button v-if="operateBtn.download" :disabled="disabledDel" @click="onDwonload">{{ i18n.common.button.download }}</Button>
      <template v-if="!disabled && operateBtn.language">
        <!-- 源文件模式下才启用该功能 -->
        <Button :disabled="selectedKeys.length < 1" @click="onChangePairs">{{ i18n.common.label.languagePairs }}</Button>
      </template>

      <template v-if="task">
        <UploadOSS 
          v-if="!disabled && operateBtn.upload" 
          :accept="accept" 
          :disabled="disabled" 
          :multiple="true"
          :success="onUpload">
          <span class="ant-btn ant-btn-primary">{{ i18n.common.label.fileUpload }}</span>
        </UploadOSS>
      </template>
      <template v-else>
        <!-- 如果是项目使用该功能，则需要传项目ID -->
        <UploadOSS 
          v-if="!disabled && operateBtn.upload" 
          :project-Id="id" 
          :accept="accept" 
          :disabled="disabled" 
          :multiple="true"
          :success="onUpload">
          <span class="ant-btn ant-btn-primary">{{ i18n.common.label.fileUpload }}</span>
        </UploadOSS>
      </template>
      

      <span v-if="operateBtn.downTarget">
        <ExportDownload 
          :disabled="selectedKeys.length < 1" 
          :file="selectedKeys" 
          :type="subType" 
          :pm="isPm" 
          :menu="[2]"
          exportText="Download Target">
        </ExportDownload>
      </span>
    </Space>
    <Button v-if="!disabled && operateBtn.large" type="link" @click="onSelectDriveFile">{{ i18n.drive.label.largefiles }}</Button>
</div>
</template>