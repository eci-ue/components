<script setup lang="ts">
import * as _ from "lodash-es";
import { Icon } from "@ue/icon";
import { PropType } from "vue";
import { before } from "./util";
import { api } from "../../../api";
import { AddLqr } from "../lqr/index";
import i18n from "../../../utils/i18n";
import { fileDownloadUrl } from "@ue/utils";
import { Button } from "ant-design-vue";

import { Status } from "../type";
import { WorkMode } from "../../export";
import type { TaskFileItem } from "./type";
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
  /** 工作模式 */
  mode: {
    required: true,
    type: String as PropType<WorkMode>,
  },  
  /** 类型 1：lqr 2:lqa 3:lqf */
  lqType: {
    type: [String, Number],
    default: () => 1
  },
  // lqf 枚举
  lqfOper: {
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
  },
  /** 项目状态 */
  status: {
    required: false,
    type: Number as PropType<Status>,
  },
  /** 当前是否为 PM */
  pm: {
    type: Boolean,
    required: false,
    default: () => false
  }
});


// lqf 链接处理
const lqfLink = function(value: string): string | undefined {
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

// 查看 Lqf
const onCheckLqf = function(e: Event, value: string) {
  const run =async () => {
    const status = await before(props.before ,"lqf");
    if (status) {
      const url = lqfLink(value);
      if (url) {
        window.open(url);
      }
    }
  }
  if (props.mode === WorkMode.Transdoc) {
    run();
  } else {
    onAddLqf(e, props.data);
  }
}

// 添加 Lqf
const onAddLqf = async function(e: Event, data: TaskFileItem) {
  const status = await before(props.before, "addLqf");
  if (!status) {
    return false;
  }

  let disabled: boolean = true;
  // 判断项目状态是否为进行中
  if (props.status && _.includes([Status.inProgress, Status.inInterrupt], Number(props.status))) {
    disabled = false;
  }
  if (props.pm) {
    disabled = true;
  }

  const option = { disabled, id: props.id, file: data.bilingualFileId, partner: props.partner, lqType: props.lqType };
  const callback = async function(value: object) {
    if (disabled) {
      return false;
    }
    const status = await api.project.saveLqr(value, props.partner);
    if (status) {
      $emit("add", e, data);
    }
    return status;
  };
  AddLqr(option, { onOk: callback }, data.lqfData || {});
};

</script>

<template>
  <div v-if="data">
    <template v-if="lqfOper && String(lqfOper) === '3'">
      <!-- 可上传 -->
      <!-- 如果有 lqf 链接 -->
      <span v-if="data.lqfVisitPath" class="break-all max-w-40 cursor-pointer ant-btn-link" @click="onCheckLqf($event, data.lqfVisitPath)">{{ data.lqfName }}</span>
      <!-- 无链接时展示添加按钮 -->
      <Button v-else type="link" class="text-sm" @click="onAddLqf($event, data)">
        <span class="flex items-center">
          <Icon class="flex mr-1" type="icon-a-add"></Icon>
          <span>{{ i18n.common.button.addLqf }}</span>
          <span class="ml-0.5">{{ data.lqfIndex }}</span>
        </span>
      </Button>
    </template>
    <template v-else-if="lqfOper && String(lqfOper) === '2' && data.lqfVisitPath">
      <!-- Lqf Link -->
      <span @click="onCheckLqf($event, data.lqfVisitPath)" class="break-all max-w-40 cursor-pointer ant-btn-link">{{ data.lqfName }}</span>
    </template>
    <template v-else>
      <span>--</span>
    </template>
  </div>
</template>