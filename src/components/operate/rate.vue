<script setup lang="ts">
/**
 * @file 评价
 * @author theresia@eci.com
 */

import * as _ from "lodash-es";
import { watch } from "vue";
import { FormItem } from "ant-design-vue";
import FormCheckbox from "../form/checkbox.vue";
import i18n from "../../utils/i18n";
import { RatePartnerList } from "./type";

const $emit = defineEmits(["update:state"]);
const props = defineProps({
  value: {
    type: Array,
    required: false,
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
    type: Object,
  }
});
const metaObj = {
  list: [{
    value: RatePartnerList.proactive,
    name: i18n.operate.list.proactiveCooperation
  },
  {
    value: RatePartnerList.accident,
    name: i18n.operate.list.noQualityAccident
  },
  {
    value: RatePartnerList.delivery,
    name: i18n.operate.list.deliveryOnTime
  }
  ],
  skin: "contain"
}
const rate = [RatePartnerList.proactive, RatePartnerList.accident, RatePartnerList.delivery]
watch(() => props.meta?.defualtVal, (val) => {
  console.log(val)
  props.state.rate = _.difference(rate, val)
}, { immediate: true })
</script>
<template>
  <FormItem label="Rate">
    <FormCheckbox v-model:value="state.rate" :meta="metaObj" class="rate-check-box"></FormCheckbox>
  </FormItem>
</template>
<style lang="scss" scoped>
.rate-check-box {
  ::v-deep(.ant-checkbox-wrapper) {
    user-select: none;
    @apply mr-6 w-50;
  }

  ::v-deep(.ant-checkbox-wrapper-checked) {
    @apply bg-info-color border-info-color text-white;
  }

  ::v-deep(.ant-checkbox-checked .ant-checkbox-inner) {
    @apply bg-white text-info-color border-info-color;
  }

  ::v-deep(.ant-checkbox-checked .ant-checkbox-inner::after) {
    @apply border-info-color;
  }
}
</style>