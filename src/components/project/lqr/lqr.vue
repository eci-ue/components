<script setup lang="ts">
import { computed } from "vue";
import { confirm } from "@ue/model";
import { lazyload } from "@ue/utils";
import { Button } from "ant-design-vue";

const props = defineProps({
  /** 任务ID */
  id: {
    required: true,
    type: [String, Number],
  },
  level: {
    required: false,
    type: [String, Number],
    default: () => 0
  },
});

const onClick = async function() {
  const list = lazyload(() => import("./list.vue"));
  confirm(list, { width: 600, title: "LQR" }, { id: props.id });
}

const toNumber = function(value: string | number) {
  return Number(value);
}

const className = computed<string[]>(function() {
  const level = toNumber(props.level);
  if (level >= 1 && level <= 3) {
    return ["lqr-a"];
  }
  if (level === 4) {
    return ["lqr-b"];
  }
  if (level >= 5 && level <= 7) {
    return ["lqr-c"];
  }
  return [];
});

</script>
<template>
  <Button v-if="toNumber(level) > 0" :class="className" @click="onClick">LQR Result: Level {{ level }}</Button>
</template>
<style scoped lang="scss">

@mixin lqr($color, $border, $bg) {
  &:not(:hover) {
    color: $color;
    border-color: $border;
    background-color: $bg;
  }
}
.lqr-a {
  @include lqr(#52C41A, #B7EB8F, #F6FFED);
}
.lqr-b {
  @include lqr(#E49251, #FFBF8D, #FFFAF0);
}
.lqr-c {
  @include lqr(#E45651, #ED6864, #FFE4E3);
}
</style>