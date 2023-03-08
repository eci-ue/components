<script setup lang="ts">
/**
 * @file 文件下载
 * @author svon.me@gmail.com
 */

import Icon from "../icon";
import { PropType, computed, ref } from "vue";
import UrlPattern from "url-pattern";
import { DownloadType, Env, NetApi, DomainApi } from "./type";
import * as message from "@ue/message";
import safeGet from "@fengqiaogang/safe-get";
import { downloadFile, fileDownloadUrl, path } from "@ue/utils";

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
  }
});

const iframe = ref<HTMLIFrameElement>();

const env = computed<Env>(function() {
  const pattern = new UrlPattern('(http(s)\\://)(:subdomain.):domain.:tld(\\::port)(/*)');
  const location = pattern.match(window.location.origin);
  if (location.domain === "eciol-dev") {
    return Env.dev;
  }
  if (location.domain === "eciol-test") {
    return Env.test;
  }
  if (location.domain === "ectranslate") {
    return Env.ectranslate;
  }
  return Env.prod;
});

const iframeSrc = computed<string>(function() {
  const r = Math.random();
  return `/download/${env.value}.html?_r=${r}`;
});

// 触发文件下载
const onDownload = function() {
  if (!props.value) {
    return false;
  }
  const tips = "Download success, Please check your browser's download records";

  if (props.type === DownloadType.oss) {
    const url = fileDownloadUrl(props.value);
    downloadFile(url, props.name);
    message.success(tips);
    return;
  }

  if (props.type === DownloadType.net) {
    const content = iframe.value?.contentWindow;
    // @ts-ignore
    const Control = safeGet(content, "Eci.Control.DownloadControl");
    if (Control) {
      // @ts-ignore
      const download = new Control(
        { IsSingleProgress: false, fileNameSource: ' ' },
        {
          complete: () => message.success(tips),
          close () {},
          error (err: string) {
            if (typeof err === "string") {
              message.error(err);
            } else {
              message.error("Network error");
            }
          }
        }
      );

      const query = {
        ServerFileID: 2,
        Url: NetApi[env.value],
        RealPath: props.value.replace('/\\/g', '\\\\'),
        FullName: `\\${props.name}`
      };
      download.showDownload([query]);
    }
    return;
  }

  if (props.type === DownloadType.file) {
    const link = path.join(DomainApi[env.value], "service-file", props.value);
    downloadFile(link, props.name);
    message.success(tips);
    return;
  }
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
      <div v-if="value" class="cursor-pointer px-2 py-1" @click="onDownload">
        <slot>
          <Icon class="text-sm" type="download-outlined"></Icon>
        </slot>
      </div>
      <div v-else class="px-2 py-1">
        <slot>
          <Icon class="text-sm" type="download-outlined"></Icon>
        </slot>
      </div>
    </div>
  </div>
</template>