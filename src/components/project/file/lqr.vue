<script setup lang="ts">
import Icon from "../../icon";
import { PropType } from "vue";
import { before } from "./util";
import { api } from "../../../api";
import { AddLqr } from "../lqr/index";
import i18n from "../../../utils/i18n";
import { fileDownloadUrl } from "@ue/utils";
import { Button } from "ant-design-vue";

import type { TaskFileItem } from './type';
import type { HookFunction } from "@ue/utils";

const $emit = defineEmits(["add"]);

const props = defineProps({
  /** 任务ID */
  id: {
    required: true,
    type: [String, Number]
  },
  /** 
   * 是否为外部议员
   * @description 当 partner 为 true 时 pm & innerOuterType 两字段失效
   */
  partner: {
    type: Boolean,
    required: false,
    default: () => false
  },
  // lqr 枚举
  lqrOper: {
    type: [String, Number],
    required: false,
  },
  // 节点数据
  data: {
    required: true,
    type: Object as PropType<TaskFileItem>,
  },
  /** 触发前钩子 */
  before: {
    required: false,
    type: [Function, Array] as PropType<HookFunction | HookFunction[]>
  }
});


// lqr 链接处理
const lqrLink = function(value: string): string | undefined {
  if (value && /^http/.test(value)) {
    return value;
  }
  if (value && /^\/\//.test(value)) {
    return value;
  }
  if (value) {
    return fileDownloadUrl(value);
  }
};

// 查看 Lqr
const onCheckLqr = async function(value: string) {
  const status = await before(props.before ,"lqr");
  if (status) {
    const url = lqrLink(value);
    if (url) {
      window.open(url);
    }
  }
}

// 添加 Lqr
const onAddLqr = async function(e: Event, data: TaskFileItem) {
  const status = await before(props.before, "addLqr");
  if (!status) {
    return false;
  }
  const option = { id: props.id, file: data.bilingualFileId, partner: props.partner };
  const callback = async function(value: object) {
    const status = await api.project.saveLqr(value, props.partner);
    if (status) {
      $emit("add", e, data);
    }
    return status;
  };
  AddLqr(option, { onOk: callback });
};

</script>

<template>
  <div v-if="data">
    <template v-if="lqrOper && String(lqrOper) === '3'">
      <!-- 可上传 -->
      <!-- 如果有 lqr 链接 -->
      <Button v-if="data.lqrVisitPath" type="link" @click="onCheckLqr(data.lqrVisitPath)">{{ data.lqrName }}</Button>
      <!-- 无链接时展示添加按钮 -->
      <Button v-else type="link" class="text-sm" @click="onAddLqr($event, data)">
        <span class="flex items-center">
          <Icon class="flex mr-1" type="icon-a-add"></Icon>
          <span>{{ i18n.common.button.addLqr }}</span>
          <span class="count-item ml-0.5"></span>
        </span>
      </Button>
    </template>
    <template v-else-if="lqrOper && String(lqrOper) === '2' && data.lqrVisitPath">
      <!-- Lqr Link -->
      <Button type="link" @click="onCheckLqr(data.lqrVisitPath)">{{ data.lqrName }}</Button>
    </template>
    <template v-else>
      <span>--</span>
    </template>
  </div>
</template>