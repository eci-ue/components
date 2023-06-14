<script setup lang="ts">
/**
 * @file 动态表单 - 下拉框
 * @author svon.me@gmail.com
 */
import * as _ from "lodash-es";
import { computed, PropType } from "vue";
import DBList from "@fengqiaogang/dblist";
import safeGet from "@fengqiaogang/safe-get";
import { Select, SelectOption } from "ant-design-vue";

import type { SelectItem } from "./type";
import type { FormItemMeta } from "@ue/form";

interface Meta extends FormItemMeta{
  mode: string;
  list: Array<SelectItem>;
  allowClear: boolean;
  showSearch: boolean;
}

const emit = defineEmits(["update:value", "change"])

const props = defineProps({
  value: {
    type: [String, Number, Array] as PropType<string | number | Array<string | number>>,
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

const mode = computed<any>(function() {
  if (props.meta?.mode) {
    return props.meta.mode;
  }
  return "multiple"; // 'multiple' | 'tags' | 'combobox'
});

const placeholder = computed<string | undefined>(function() {
  if (props.meta?.placeholder) {
    return props.meta.placeholder;
  }
});

const allowClear = computed<boolean>(function() {
  if (props.meta && "allowClear" in props.meta) {
    return props.meta.allowClear;
  }
  return true;
});

const showSearch = computed<boolean>(function() {
  if (props.meta && "showSearch" in props.meta) {
    return props.meta.showSearch;
  }
  return true;
});

const DB = computed<DBList<SelectItem>>(function() {
  const data = new DBList<SelectItem>();
  if (props.meta) {
    const list = safeGet<SelectItem[]>(props.meta, "list") || [];
    data.insert(list.map(function(item: SelectItem) {
      return {
        text: item.name ? item.name.toLowerCase() : item.text?.toLowerCase(),
        ...item,
      }
    }));
  }
  return data;
})

const text = computed<Array<string | number>>({
  get: () => {
    return _.compact(_.concat(props.value));
  },
  set: (value: Array<string | number>) => {
    const temp = _.compact(_.concat(value));
    if (mode.value === "combobox") {
      emit("update:value", _.first(temp));
      emit("change", _.first(temp));
    } else {
      emit("update:value", temp);
      emit("change", temp);
    }
  }
});

const filterOption = function(input: string, option: SelectItem) {
  const db = DB.value;
  const data = db.selectOne({
    value: option.value
  });
  if (data && data.text) {
    const indexOf = data.text.indexOf(input.toLowerCase());
    if (indexOf >= 0) {
      return true;
    }
  }
  return false;
}

</script>
<template>
  <div>
    <Select class="w-full" v-model:value="text" :disabled="disabled" :placeholder="placeholder" :mode="mode" :showSearch="showSearch" :allowClear="allowClear" :filter-option="filterOption">
      <template v-for="item in DB.clone<SelectItem>()" :key="item.value">
        <SelectOption :value="item.value">{{ item.name || item.text }}</SelectOption>
      </template>
    </Select>
  </div>
</template>