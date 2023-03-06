<script setup lang="ts">
/**
 * @file 文件下载
 * @author svon.me@gmail.com
 */

import Icon from "../icon";
import { PropType, ref } from "vue";
import UrlPattern from "url-pattern";
import { DownloadType } from "./type";
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

const _r = ref<number>(Math.random());
const iframe = ref<HTMLIFrameElement>();

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

  const pattern = new UrlPattern('(http(s)\\://)(:subdomain.):domain.:tld(\\::port)(/*)');

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

      let url = "";
      const location = pattern.match(window.location.origin);
      switch(location.domain) {
        case "eciol-dev":
          url = "http://filebus.eciol-dev.com/signalr";
          break;
        case "eciol-test":
          url = "http://fssyweb.eciol-test.com/signalr";
          break;
        case "ectranslate":
          url = "http://fscommonweb.ectranslate.com/signalr";
          break;
        case "eciol":
          url = "https://fscnweb.eciol.com/signalr";
          break;
      }
      const query = {
        ServerFileID: 2,
        Url: url,
        RealPath: props.value.replace('/\\/g', '\\\\'),
        FullName: `\\${props.name}`
      };
      download.showDownload([query]);
    }
    return;
  }

  if (props.type === DownloadType.file) {
    let url = "";
    const location = pattern.match(window.location.origin);
    switch(location.domain) {
      case "eciol-dev":
        url = "http://erpapi.eciol-dev.com/";
        break;
      case "eciol-test":
        url = "http://erpapi.eciol-test.com/";
        break;
      case "ectranslate":
        url = "http://nerpapi.ectranslate.com:9999/";
        break;
      case "eciol":
        url = "https://erpapi.eciol.com/";
        break;
    }
    const link = path.join(url, "service-file", props.value);
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
          <iframe class="w-full h-full" ref="iframe" :src="`/download/test.html?_r=${_r}`"></iframe>
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