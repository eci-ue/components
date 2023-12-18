<script setup lang="ts">
/**
 * @file Lqr / Lqa / Lqf
 * @author svon.me@gmail.com
 */
import * as _ from "lodash-es";
import { Icon } from "@ue/icon";
import { PropType } from "vue";
import { before } from "./util";
import { api } from "../../../api";
import { AddLqr } from "../lqr/index";
import i18n from "../../../utils/i18n";
import { Button } from "ant-design-vue";
import { fileDownloadUrl } from "@ue/utils";

import { Status } from "../type";
import { WorkMode } from "../../export";
import { selectBilingualFile } from "./file";

import type { TaskFileItem } from "./type";
import type { HookFunction } from "@ue/utils";

const $emit = defineEmits(["add"]);

const props = defineProps({
  /** 任务ID */
  id: {
    required: true,
    type: [String, Number]
  },
  /** 项目ID */
  projectId: {
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
  type: {
    type: [String, Number],
    default: () => 1
  },
  // lqr / lqf 枚举
  oper: {
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
  },
  // 标题
  title: {
    required: false,
    type: String,
  }
});

const isLqf = function () {
  if (Number(props.type) === 3) {
    return true;
  }
  return false;
}

// 链接处理
const toLink = function (value: string): string | undefined {
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
const onCheck = function (e: Event, value: string) {
  const run = async () => {
    const status = await before(props.before, isLqf() ? "lqf" : "lqr");
    if (status) {
      const url = toLink(value);
      if (url) {
        window.open(url);
      }
    }
  }
  if (props.mode === WorkMode.Transdoc) {
    run();
  } else {
    onCreate(e, props.data);
  }
}

// 添加 Lqr / Lqf
const onCreate = async function (e: Event, data: TaskFileItem) {
  const status = await before(props.before, isLqf() ? "addLqf" : "addLqr");
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

  // 获取双语文件下的同组双语文件列表
  const lqrRelateBilingualFileIds: Array<string | number> = await selectBilingualFile(props.id, data.bilingualFileId, props.type);
  if (_.size(lqrRelateBilingualFileIds) < 1) {
    // 双语文件为空
    return false;
  }

  const option = {
    disabled,
    id: props.id,
    projectId: props.projectId,
    file: data.bilingualFileId,
    partner: props.partner,
    lqType: props.type
  };
  const callback = async function (value: object) {
    if (disabled) {
      return false;
    }
    // 报错报告
    const formData = { ...value, lqrRelateBilingualFileIds };
    const status = await api.project.saveLqr(formData, props.partner);
    if (status) {
      $emit("add", e, data);
    }
    return status;
  };
  AddLqr(option, { onOk: callback }, (isLqf() ? data.lqfData : data.lqrData) || {});
};

</script>

<template>
  <div v-if="data">
    <template v-if="oper && String(oper) === '3'">
      <!-- 可上传 -->
      <!-- 如果有链接 -->
      <template v-if="data.lqrVisitPath">
        <div v-if="title" class="max-w-40 cursor-pointer truncate" @click="onCheck($event, data.lqrVisitPath)">
          <slot></slot>
        </div>
        <template>--</template>
      </template>
      <!-- 无链接时展示添加按钮 -->
      <Button v-else type="link" class="text-sm" @click="onCreate($event, data)">
        <span class="flex items-center">
          <Icon class="flex mr-1" type="icon-a-add"></Icon>
          <template v-if="isLqf()">
            <span>{{ i18n.common.button.addLqf }}</span>
            <span class="ml-0.5">{{ data.lqfIndex }}</span>
          </template>
          <template v-else>
            <span>{{ i18n.common.button.addLqr }}</span>
            <span class="ml-0.5">{{ data.lqrIndex }}</span>
          </template>
        </span>
      </Button>
    </template>
    <template v-else-if="oper && String(oper) === '2' && data.lqrVisitPath">
      <!-- Link -->
      <div v-if="title" class="max-w-40 cursor-pointer truncate" @click="onCheck($event, data.lqrVisitPath)">
        <slot></slot>
      </div>
      <template v-else>--</template>  
    </template>
    <template v-else>--</template>
  </div>
  <template v-else>--</template>
</template>