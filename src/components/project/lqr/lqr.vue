<script setup lang="ts">
import * as _ from "lodash-es";
import { computed } from "vue";
import { confirm } from "@ue/modal";
import { lazyload } from "@ue/utils";
import { Button } from "ant-design-vue";
import i18n from "../../../utils/i18n";

const props = defineProps({
  /** 任务ID */
  id: {
    required: true,
    type: [String, Number],
  },
  /** 类型 1：lqr 2:lqa 3:lqf */
  lqType: {
    type: [String, Number],
    default: () => 1
  },
  level: {
    required: false,
    type: [String, Number],
    default: () => 0
  },
});

const lqTypeName = computed(()=>{
  if (props.lqType == 1){
    return "LQR"
  }else if (props.lqType == 3){
    return "LQF"
  }
})

const onClick = async function() {
  const list = lazyload(() => import("./list.vue"));
  confirm(list, { width: 800, title: lqTypeName.value }, { id: props.id, lqType: props.lqType });
}

const isMultiple = function(value: string | number): boolean {
  if (_.toLower(String(value)) === "multiple") {
    return true;
  }
  return false;
}
const toNumber = function(value: string | number) {
  return Number(value);
}

const className = computed<string[]>(function() {
  if (isMultiple(props.level)) {
    return [];
  }
  const level = toNumber(props.level);
  if (level <= 3) { // level >= 1 && 
    return ["lqr-a"];
  }
  if (level === 4) {
    return ["lqr-b"];
  }
  if (level >= 5) { // && level <= 7
    return ["lqr-c"];
  }
  return [];
});

</script>
<template>
  <Button v-if="isMultiple(level) || toNumber(level) > 0" :class="className" @click="onClick">
    <template v-if="isMultiple(level)">
      <span>{{ i18n.part(i18n.lqr.title.lqrResult, 0, { lqTypeName: lqTypeName, level: _.upperFirst(_.toLower(String(level))) }) }}</span>
    </template>
    <template v-else>
      <span>{{ i18n.part(i18n.lqr.title.lqrResult, 1, { lqTypeName: lqTypeName, level: level }) }}</span>
    </template>
  </Button>
</template>
<style scoped lang="less">

.lqr(@color, @border, @bg) {
  &:not(:hover) {
    color: @color;
    border-color: @border;
    background-color: @bg;
  }
}
.lqr-a {
  .lqr(#52C41A, #B7EB8F, #F6FFED);
}
.lqr-b {
  .lqr(#E49251, #FFBF8D, #FFFAF0);
}
.lqr-c {
  .lqr(#E45651, #ED6864, #FFE4E3);
}
</style>