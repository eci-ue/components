<script setup lang="ts">
/**
 * @file 中断文件提示
 * @author theresia@eci.com
 */

import Icon from "../icon";
import * as _ from "lodash-es";
import { confirm } from "@ue/model";
import { lazyload } from "@ue/utils";

const props = defineProps({
  taskId: {
    type: [Number, String],
    required: true,
  }
});
//打开文件夹
const Interrputted = lazyload(() => import("./files.vue"));
const onChangeFile = function () {
  confirm(Interrputted, "Submit Interrputted", { taskId: props.taskId });
};

</script>

<template>
    <Icon @click="onChangeFile" type="question-circle-filled" class="text-base cursor-pointer" color="#A9B5C9"></Icon>
</template>