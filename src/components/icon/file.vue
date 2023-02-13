<script setup lang="ts">
/**
 * @file 根据文件名称展示文件图标
 * @author svon.me@gmail.com
 */

import _ from "lodash-es";
import Icon from "./index";
import { Tooltip } from "ant-design-vue";

const props = defineProps({
  value: {
    type: String,
    required: true,
  },
  folder: {
    type: Boolean,
    default: false
  },
  maxSize: {
    type: Number,
    default: 40
  }
});

const getName = function(value: string) {
  if (value && value.length > props.maxSize) {
    const size = Math.ceil(props.maxSize / 4);
    return value.replace(new RegExp(`^(.{${size}}).+(.{${size}})$`, "i"), "$1...$2");
  }
  return value;
}

const getSuffix = function(name: string): string {
  const list = name.split(".");
  return list[list.length - 1];
}

const getIconName = function(name: string, folder?: boolean): string {
  if (folder) {
    return "icon-folder";
  }
  let type = "";
  const suffix = _.toLower(getSuffix(name));
  switch(suffix) {
    case "jpg":
    case "jpeg":
    case "png":
    case "gif":
      type = "icon-jpg";
      break;
    case "txt":
    case "text":
      type = "icon-txt";
      break;
    case "zip":
    case "rar":
    case "7z":
      type = "icon-zip";
      break;
    case "mp3":
    case "wav":
    case "wma":
    case "mp2":
    case "flac":
    case "midi":
    case "ape":
    case "aac":
    case "cda":
      type = "icon-music";
      break;
    case "avi":
    case "wmv":
    case "mpg":
    case "mpeg":
    case "mov":
    case "rm":
    case "ram":
    case "swf":
    case "flv":
    case "mp4":
    case "3gp":
    case "m4v":
      type = "icon-video";
      break;
    case "xlsb":
    case "xlsm":
    case "xltx":
    case "xlam":
    case "xls":
    case "xlsx":
    case "numbers":
      type = "icon-xlsx";
      break;
    case "doc":
    case "docx":
    case "pages":
      type = "icon-docx";
      break;
    case "ppt":
    case "pptx":
      type = "icon-pptx";
      break;
    case "pdf":
      type = "icon-pdf";
      break;
    case "dmg":
      type = "icon-dmg";
      break;
    case "ts":
      type = "icon-ts";
    case "js":
      type = "icon-js";
      break;
    case "iso":
      type = "icon-iso";
      break;
    case "apk":
      type = "icon-apk";
      break;
    case "sh":
    case "shell":
      type = "icon-sh";
      break;
    case "exe":
      type = "icon-exe";
      break;
    default:
      type = "icon-default";
      break;
  }
  return type;
}
</script>
<template>
  <div class="flex items-center w-full">
    <span class="flex mr-2">
      <slot>
        <Icon :type="getIconName(value, folder)" class="text-lg"></Icon>
      </slot>
    </span>
    <span class="flex max-w-4/5">
      <!-- 文件夹名称 -->
      <template v-if="folder">
        <Tooltip placement="top" color="#3c6cfe" overlay-class-name="max-80" v-if="value && value.length > maxSize">
          <template #title>
            <span class="text-sm inline-block text-white">{{ value }}</span>
          </template>
          <span class="text-sm inline-block max-w-full truncate">{{ value }}</span>
        </Tooltip>
        <template v-else>
          <span class="text-sm inline-block">{{ value }}</span>
        </template>
      </template>
      <!-- 文件名称 -->
      <template v-else>
        <Tooltip placement="top" color="#3c6cfe" overlay-class-name="max-80" v-if="value && value.length > maxSize">
          <template #title>
            <span class="text-sm inline-block text-white">{{ value }}</span>
          </template>
          <span class="text-sm inline-block">{{ getName(value) }}</span>
        </Tooltip>
        <template v-else>
          <span class="text-sm inline-block">{{ getName(value) }}</span>
        </template>
      </template>
    </span>
  </div>
</template>