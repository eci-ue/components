<script setup lang="ts">
/**
 * @file 动态表单 - 文件上传
 * @author svon.me@gmail.com
 */

import * as _ from "lodash-es";
import i18n from "../../utils/i18n";
import { computed, PropType, ref } from "vue";
import { UploadOSS, SkinView } from "@ue/upload";

import type { UploadMeta as Meta } from "./props";
import type { UploadFile, FileData } from "@ue/upload";

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
  return name.value;
});
const placeholder = computed<string>(function() {
  if (props.meta?.placeholder) {
    return props.meta.placeholder;
  }
  return "Please select File";
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
    <UploadOSS class="w-full" :success="onSuccess" :disabled="disabled">
      <SkinView.Input 
        :disabled="disabled" 
        :name="label" 
        :placeholder="placeholder" 
        :label="i18n.common.button.upload">
      </SkinView.Input>
    </UploadOSS>
  </div>
</template>