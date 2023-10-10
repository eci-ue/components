<script setup lang="ts">
/**
 * @file 动态表单 - 文件上传
 * @author svon.me@gmail.com
 */

import * as _ from "lodash-es";
import i18n from "../../utils/i18n";
import { computed, PropType, ref } from "vue";
import { UploadOSS, SkinView } from "@ue/upload";
import Download from "../download/index.vue";
import { DownloadType } from "../download/type";

import type { UploadMeta as Meta } from "./props";
import type { UploadFile, FileData } from "@ue/upload";
import safeGet from "@fengqiaogang/safe-get";

const name = ref<string>();
const emit = defineEmits(["update:value", "change"]);

const props = defineProps({
  value: {
    required: false,
    type: [Object, String] as PropType<UploadFile | string>,
  },
  disabled: {
    type: Boolean,
    default: () => false
  },
  // 动态表单，整个表单的数据
  state: {
    type: Object,
    default: () => {
      return {};
    }
  },
  meta: {
    required: false,
    type: Object as PropType<Meta>,
  }
});

const label = computed<string | undefined>(function() {
  if (props.value && _.isObject(props.value)) {
    return props.value.name;
  }
  if (props.value && _.isString(props.value)) {
    const text = props.value.split("/");
    return text[text.length - 1]
  }
  return name.value;
});
const placeholder = computed<string>(function() {
  if (props.meta?.placeholder) {
    return props.meta.placeholder;
  }
  return "Please select File";
});
const fileUrl = computed<string>(function() {
  if (props.value && _.isObject(props.value)) {
    const value = safeGet<string>(props.value, "url");
    if (value) {
      return value;
    }
  }
  if (props.value && _.isString(props.value)) {
    return props.value;
  }
  return "";
});

const projectId = computed<string | number | undefined>(function() {
  if (props.meta) {
    return props.meta.projectId;
  }
});

const taskId = computed<string | number | undefined>(function() {
  if (props.meta) {
    return props.meta.taskId;
  }
});

const onSuccess = function(file: FileData) {
  name.value = file.name();
  const value = file.value;
  let data = value ? _.omit(value, ["file"]) : null;
  if (props.meta?.transform && typeof props.meta.transform === "function") {
    data = props.meta.transform(value);
  }
  emit("update:value", data);
  emit("change", data);
};

</script>
<template>
  <div>
    <UploadOSS class="w-full" :success="onSuccess" :disabled="disabled" :project-id="projectId" :task-id="taskId">
      <SkinView.Input 
        :disabled="disabled" 
        :name="label" 
        :placeholder="placeholder" 
        :label="i18n.common.button.upload">
      </SkinView.Input>
    </UploadOSS>
    <div class="mt-2" v-if="meta && meta.preview">
      <Download :value="fileUrl" :type="DownloadType.oss"><span>{{ label }}</span></Download>
    </div>
  </div>
</template>