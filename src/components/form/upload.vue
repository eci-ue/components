<script setup lang="ts">
/**
 * @file 动态表单 - 文本输入框
 * @author svon.me@gmail.com
 */

import * as _ from "lodash-es";
import { computed, PropType } from "vue";
import Upload, { UploadSkin } from "../upload";

import type { FormItemMeta } from "@ue/form/types/props";
import type { UploadFile } from "../upload/props";

interface Meta extends FormItemMeta {
  transform?: (value: UploadFile) => any
}

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
});
const placeholder = computed<string>(function() {
  if (props.meta?.placeholder) {
    return props.meta.placeholder;
  }
  return "Please select File";
});

const onSuccess = function(value: UploadFile) {
  let data = value ? _.omit(value, ["file"]) : null;
  if (value && props.meta?.transform && typeof props.meta.transform === "function") {
    data = props.meta.transform(value);
  }
  emit("update:value", data);
  emit("change", data);
};


</script>
<template>
  <div>
    <Upload 
      class="w-full" 
      @success="onSuccess" 
      :disabled="disabled" 
      :name="label" 
      :placeholder="placeholder" 
      :skin="UploadSkin.input" 
      label="Upload">
    </Upload>
  </div>
</template>