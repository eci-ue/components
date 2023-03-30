<script setup lang="ts">
/**
 * @file 动态表单 - 单选框
 * @author svon.me@gmail.com
 * @description 选择的时间，返回数据时已做时区处理
 */

import { date } from "@ue/utils";
import i18n from "../../utils/i18n";
import dayjs, { Dayjs } from 'dayjs';
import { computed, PropType } from "vue";
import { DatePicker } from "ant-design-vue";

import type { DateMeta as Meta } from "./props";


const emit = defineEmits(["update:value", "change"]);

const props = defineProps({
  value: {
    type: String,
    default: ""
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

const placeholder = computed<string>(function () {
  if (props.meta?.placeholder) {
    return props.meta.placeholder;
  }
  return i18n.template(i18n.common.placeholder.select, { label: i18n.common.label.date });
});

const text = computed<string>({
  get: () => props.value,
  set: (value: string) => {
    const data = value ? date._format(value, !showTime.value) : "";
    const time = data ? data.date.format(data.template) : "";
    emit("update:value", time);
    emit("change", time);
  }
});

//是否显示时间
const showTime = computed<boolean>(function () {
  if (props.meta?.showTime) {
    return true;
  }
  return false
});

//时间格式
const format = computed<date.Template>(function () {
  if (props.meta?.showTime) {
    return date.Template.value;
  }
  return date.Template.date;
});
const disabledDate = (time: Dayjs) => {
  // Can not select days before today
  if (props.meta?.disabledBrfore && time) {
    const value = dayjs(time);
    if (value.isBefore(Date.now(), "d")) {
      return true;
    }
    // 是否禁用当天
    if (props.meta?.disabledSameDay) {
      if (value.isSame(Date.now(), "d")) {
        return true;
      }
    }
    // return current && current <= dayjs().startOf("day");
  }
  return false;
};

</script>
<template>
  <div>
    <DatePicker 
      class="w-full" 
      v-model:value="text" 
      :disabled="disabled" 
      :allow-clear="true" 
      :show-time="showTime"
      :format="format" 
      :value-format="format" 
      :disabled-date="disabledDate" 
      :placeholder="placeholder">
    </DatePicker>
  </div>
</template>