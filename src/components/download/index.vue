<script setup lang="ts">
/**
 * @file 文件下载
 * @author svon.me@gmail.com
 */

import * as _ from "lodash-es";
import { Icon } from "@ue/icon";
// import UrlPattern from "url-pattern";
import { Domain, DownloadType, Env } from "./type";
import { PropType, computed, ref } from "vue";
import { download, ossFileDownloadLink, downloadName } from "./util";
import type { HookFunction } from "@ue/utils";

const props = defineProps({
  /** 文件地址 */
  value: {
    type: String,
    required: false,
    default: ""
  },
  /** 文件名称 */
  name: {
    type: String,
    required: false,
    default: ""
  },
  /** 下载方式 */
  type: {
    type: Number as PropType<DownloadType>,
    required: false,
    default () {
      return DownloadType.oss;
    }
  },
  /** 文件下载时身份认证或其余附加数据 */
  cookie: {
    type: Object,
    required: false,
  },
  /** 触发前钩子 */
  before: {
    required: false,
    type: [Function, Array] as PropType<HookFunction | HookFunction[]>
  },
  /** 触发后钩子 */
  after: {
    required: false,
    type: [Function, Array] as PropType<HookFunction | HookFunction[]>
  }
});

const iframe = ref<HTMLIFrameElement>();

const env = computed<Env>(function() {
  // const pattern = new UrlPattern('(http(s)\\://)(:subdomain.):domain.*(\\::port)(/*)');
  // const location = pattern.match(window.location.origin);
  // if (location.domain === "eciol-dev") {
  //   return Env.dev;
  // }
  // if (location.domain === "eciol-test") {
  //   return Env.test;
  // }
  // if (location.domain === "ecinnovations") {
  //   return Env.ecinnovations;
  // }
  // if (location.domain === "ectranslate") {
  //   return Env.ectranslate;
  // }
  const url = window.location.origin;
  if (_.includes(url, "eciol-dev")) {
    return Env.dev;
  }
  if (_.includes(url, "eciol-dev")) {
    return Env.test;
  }
  if (_.includes(url, "ecinnovations")) {
    return Env.ecinnovations;
  }
  if (_.includes(url, "ectranslate")) {
    return Env.ectranslate;
  }
  return Env.prod;
});

const iframeSrc = computed<string>(function() {
  // 如果字符开头为 . 则删除
  const value = String(Domain[env.value]).replace(/^\./i, "");
  return `/export/download.html?env=${value}`;
  // return `https://static.eciol.com/html/export/${name}.html`;
});

// 触发文件下载
const onDownload = function() {
  if (!props.value) {
    return false;
  }
  const content = iframe.value?.contentWindow;
  download(props as any, content as any, env.value);
};

</script>

<template>
  <div class="inline-block">
    <div class="relative">
      <template v-if="type === DownloadType.net">
        <div class="absolute left-0 top-0 inline-block w-1 h-1 visible opacity-0">
          <iframe class="w-full h-full" ref="iframe" :src="iframeSrc"></iframe>
        </div>
      </template>
      <a class="block" v-if="value && type === DownloadType.oss" :href="ossFileDownloadLink(value)" :download="downloadName(value)">
        <slot>
          <Icon class="text-sm" type="download-outlined"></Icon>
        </slot>
      </a>
      <div v-else-if="value" class="cursor-pointer px-2 py-1 link" @click="onDownload">
        <slot>
          <Icon class="text-sm" type="download-outlined"></Icon>
        </slot>
      </div>
      <div v-else class="cursor-not-allowed px-2 py-1">
        <slot>
          <Icon class="text-sm" type="download-outlined"></Icon>
        </slot>
      </div>
    </div>
  </div>
</template>