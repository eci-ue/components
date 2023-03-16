<script setup lang="ts">
/**
 * @file 语言对
 * @author svon.me@gmail.com
 */

import * as _ from "lodash-es";
import i18n from "../../../utils/i18n";
import { computed, PropType, ref } from "vue";
import { CheckboxGroup, Checkbox } from "ant-design-vue";
import { LanguagePairs } from "../../language";

import type { Meta } from "./props";
import type { LanguagePairsData } from "../../language/props";

const emit = defineEmits(["update:value", "change"]);

const props = defineProps({
  value: {
    type: Array as PropType<Array<string | number>>,
    default: () => []
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

const checkAll = ref<boolean>(false);
const indeterminate = ref<boolean>(false);

const checkboxList = computed<LanguagePairsData[]>(function() {
  if (props.meta?.list) {
    return props.meta?.list;
  }
  return [];
});

const border = computed<string[]>(function() {
  return props.meta?.border ? ["p-4", "border", "border-solid", "border-normal-color"] : [];
});

const makeKey = function(data: LanguagePairsData) {
  const source = data.source?.id ? data.source.id : data.source;
  const target = data.target?.id ? data.target.id : data.target;
  if (target) {
    return `${source}.${target}`;
  }
  return source as string;
};

const onCheckAllChange: any = function() {
  indeterminate.value = false;
  if (checkAll.value) {
    checkAll.value = false;
    text.value = [];
  } else {
    checkAll.value = true;
    text.value = _.map(checkboxList.value, makeKey);
  }
  return false;
};

const text = computed<Array<string | number>>({
  get: () => _.concat(props.value),
  set: (value: Array<string | number>) => {
    emit("update:value", value);
    emit("change", value);
    if (value.length === checkboxList.value.length) {
      indeterminate.value = false;
      checkAll.value = true;
    } else if (value.length > 0){
      indeterminate.value = true;
      checkAll.value = false;
    } else {
      indeterminate.value = false;
      checkAll.value = false;
    }
  }
});
const allText = computed<string>(function() {
  if (props.meta?.title) {
    return props.meta?.title;
  }
  return i18n.project.label.allLanguages;
});
</script>

<template>
  <div :class="border" v-show="(checkboxList.length > 0)" @change.prevent.stop>
    <div>
      <label class="ant-checkbox-wrapper" :class="{'ant-checkbox-wrapper-checked': checkAll}">
        <span class="ant-checkbox" :class="{'ant-checkbox-indeterminate': indeterminate, 'ant-checkbox-checked': checkAll}">
          <input type="checkbox" class="ant-checkbox-input" @change.prevent="onCheckAllChange">
          <span class="ant-checkbox-inner"></span>
        </span>
        <span>
          <span>{{allText}}</span>
        </span>
      </label>
    </div>
    <CheckboxGroup class="pl-5 mt-2" v-model:value="text">
      <div class="mt-2 first:mt-0" v-for="item in checkboxList" :key="makeKey(item)">
        <div class="flex items-center">
          <Checkbox :value="makeKey(item)"></Checkbox>
          <LanguagePairs class="px-2" :source="item.source" :target="item.target"></LanguagePairs>
        </div>
      </div>
    </CheckboxGroup>
  </div>
</template>