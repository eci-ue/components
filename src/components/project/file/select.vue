<script setup lang="ts">
import { ref, onMounted } from "vue";
import * as message from "@ue/message";
import i18n from "../../../utils/i18n";
import { CheckboxGroup, Checkbox, Divider } from "ant-design-vue";

import type { PropType } from "vue";

const props = defineProps({
  list: {
    required: false,
    default: () => [],
    type: Array as PropType<Array<{ id: string | number; name: string; exists: boolean; user: string }>>,
  }
});

const checkedAll = ref<boolean>(false);
const indeterminate = ref<boolean>(false);
const data = ref<Array<string | number>>([]);

onMounted(function() {
  const keys: Array<string | number> = [];
  for (const item of props.list) {
    if (item.exists) {
      continue;
    }
    keys.push(item.id);
  }
  onChange(keys);
});

const onCheckedAll = function () {
  if (props.list.length > 0 && data.value.length === props.list.length) {
    data.value = [];
    checkedAll.value = false;
  } else {
    data.value = props.list.map(data => data.id);
    checkedAll.value = true;
  }
  indeterminate.value = false;
}

const onChange: any = function (value: Array<string | number>) {
  console.log(value);
  if (value.length > 0 && value.length === props.list.length) {
    checkedAll.value = true;
    indeterminate.value = false;
  } else if (value.length === 0) {
    checkedAll.value = false;
    indeterminate.value = false;
  } else {
    checkedAll.value = false;
    indeterminate.value = true;
  }
  data.value = value;
}

const validate = function () {
  if (data.value.length > 0) {
    return true;
  }
  message.error(i18n.project.lqa.file.rule.tips);
  return false;
}

const submit = function () {
  if (validate()) {
    return { value: [...data.value] };
  }
  return false;
}

defineExpose({ onSubmit: submit, validate });

</script>

<template>
  <div class="select-none">
    <div>
      <Checkbox :checked="checkedAll" :indeterminate="indeterminate" @change="onCheckedAll">{{ i18n.common.label.all }}</Checkbox>
    </div>
    <Divider class="my-3"></Divider>
    <CheckboxGroup class="block" :value="data" @change="onChange">
      <div v-for="item in list" :key="item.id" class="mb-3 last:mb-0">
        <Checkbox :value="item.id">{{ item.user }} - {{ item.name }}</Checkbox>
      </div>
    </CheckboxGroup>
    <div class="mt-3">
      <slot name="buttons"></slot>
    </div>
  </div>
</template>