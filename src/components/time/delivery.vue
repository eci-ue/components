<script setup lang="ts">
/**
 * @file 交付时间判断
 * @author svon.me@gmail.com
 */

import dayjs from "dayjs";
import Time from "./index";
import { main } from "./util";
import { PropType, computed } from "vue";
import type { DeliveryProps } from "./type";
import type { date as UtilDate } from "@ue/utils";

const props = defineProps({
  /** 时间 */
  value: {
    default: "",
    type: [Number, String] as PropType<UtilDate.DateValue>
  },
  /** 是否按日期形式格式化 */
  date: {
    type: Boolean as PropType<boolean | undefined>,
    required: false,
    default () {
      return undefined;
    }
  },
  /** 默认时间格式规则 */
  format: {
    type: String,
    default: ""
  },
  /** 间隔多少小时, 默认24 */
  interval: {
    type: Number,
    default: 24
  }
});

const className = computed<string | string[]>(function() {
  const value = main(props as DeliveryProps);
  if (/^-+$/.test(value)) {
    return [];
  }
  const today = new Date();
  // 交付时间为小于当前时间
  if (dayjs(value).isBefore(today, "h")) {
    return ["text-red"];
  }
  // 交互时间在当前时间24小时内
  if (dayjs(value).subtract(props.interval, "h").isBefore(today, "h")) {
    return ["text-yellow"];
  }
  return [];
});

</script>

<template>
  <Time :class="className" :value="value" :date="date ? true : false" :format="format"></Time>
</template>