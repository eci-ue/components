<script setup lang="ts">
import { Icon } from "@ue/icon";
import * as _ from "lodash-es";
import { api } from "../../api";
import i18n from "../../utils/i18n";
import { form, confirm as modalComfirm } from "@ue/modal";
import { ratePartnerForm, interupt } from "./util";
import { computed, reactive, PropType } from "vue";
import * as message from "@ue/message";
import { Menu, MenuItem, Button, Space } from "ant-design-vue";
import { DoOperation, Skin, Status, RatePartnerList } from "./type";
import type { RatePartner, itemType } from "./type";
import { lazyload } from "@ue/utils";


const IconType: {[key:string]:string} = {
  delete: "delete-outlined",
  interrupt: "file-sync-outlined",
  submit: "send-outlined",
  instruction: "schedule-outlined"
}


const props = defineProps({
  item: {
    type: Object as PropType<itemType>,
    required: true
  },
  //操作按钮纯数组
  optTypes: {
    type: Array as PropType<Array<string>>,
    required: true
  },
  //水平（horizontal）或垂直（vertical）
  layout: {
    type: String as PropType<Skin>,
    default: "horizontal",
  },
  keyId: {
    type: String,
    default: "taskId",
  }
});
const emit = defineEmits(["reload","onClick"]);

//刷新列表
const onReload = function (name?: string) {
  emit("reload", name);
}

const handleClick = async (name: string) => {
  //合作伙伴评价
  if (name == DoOperation.partner) {
    ratePartnerFn(name)
  } else if (name == DoOperation.hedge) {
    onHedge(name)
  } else if (name == DoOperation.delete) {
    deleteTask(name)
  } else if (name == DoOperation.interrupt) {
    interruptTask(name)
  } else if (name == DoOperation.confirm) {
    confirm(name)
  } else if (name == DoOperation.cancel) {
    cancelTask(name)
  } else if (name == DoOperation.reject) {
    rejectTask(name)
  } else if (name == DoOperation.submit) {
    onSubmit(name)
  } else if (name == DoOperation.instruction) {
    onInstruction(name)
  }else{
    emit("onClick", name);
  }
};

const taskId = computed(function () {
  return props.item[props.keyId]
});

//confirm
const confirm = async function (name: string) {
  const status = await api.task.confirm(taskId.value);
  if (status) {
    onReload(name)
  }
}

//Rate partner
const ratePartnerFn = async function (name: string) {
  const data = await api.task.ratePartnerDetail<RatePartner>(taskId.value)
  form(ratePartnerForm(data), {
    okText: i18n.common.button.save,
    title: i18n.operate.title.rate,
    async onOk(data: any) {
      const params = reactive<RatePartner>({
        impression: _.get(data, "impression"),
        resourceId: props.item.resourceId,
        resourceName: props.item.resourceName,
        taskId: taskId.value,
        innerOuterType: props.item.innerOuterType
      })
      _.each(data.partner, item => {
        (params as any)[item] = 1
      })
      const rate = [RatePartnerList.proactive, RatePartnerList.accident, RatePartnerList.delivery]
      _.each(rate, item => {
        if (!_.includes(data.rate, item)) {
          (params as any)[item] = 1
        }
      })
      const status = await api.task.saveRatePartner<RatePartner>(params);
      if (status) {
        onReload(name)
      }
    }
  });
}
//interrupts
const interruptTask = async function (name: string) {
  form(interupt(), {
    title: i18n.operate.title.interupt,
    async onOk(data: any) {
      const status = await api.task.addInterupt(taskId.value, data.reason)
      if (status) {
        onReload(name)
      }
    }
  });

}
//delete
const deleteTask = async function (name: string) {
  const isOk = await message.confirm(i18n.message.task.delete);
  if (isOk) {
    const status = await api.task.deleteTask(taskId.value)
    if (status) {
      onReload(name)
    }
  }
}
//cancel
const cancelTask = async function (name: string) {
  const isOk = await message.confirm(i18n.message.task.cancel);
  if (isOk) {
    const status = await api.task.cancelTask(taskId.value)
    if (status) {
      onReload(name)
    }
  }
}

//reject
const rejectTask = async function (name: string) {
  const isOk = await message.confirm(i18n.message.task.reject);
  if (isOk) {
    const status = await api.task.rejectTask(taskId.value)
    if (status) {
      onReload(name)
    }
  }
}
//Hedge Jas
const onHedge = async function (name: string) {
  const isOk = await message.confirm(i18n.message.task.hedged);
  if (isOk) {
    const status = await api.task.hedgeJAS(taskId.value)
    if (status) {
      onReload(name)
    }
  }
}
//提交
const onSubmit = async function (name: string) {
  const Submitwork = lazyload(() => import("./work.vue"));
  if (props.item.status == Status.inProgress) {
    const isOk = await message.confirm(i18n.message.task.submit);
    if (isOk) {
      try {
        const status = await api.task.submit(taskId.value);
        if (status) {
          onReload(name)
        }
      } catch (error) { }
    }
  } else {
    modalComfirm(Submitwork, {
      width: 408,
      title: i18n.operate.title.work,
      onOk(flag) {
        if (flag) {
          onReload(name)
        }
        return flag
      }
    }, { taskId: taskId.value });
  }
}
// 中断信息
const onInstruction = function (name: string) {
  const Instruction = lazyload(() => import("./Instruction.vue"));
  const data = {
    commentRequest: props.item.commentRequest,
    workInstructionList: props.item.workInstructionList,
    attachments: props.item.attachments,
  }
  modalComfirm(Instruction, i18n.operate.title.instruction, { data });
}
//按钮图标与颜色
const buttonType = function (name: string): any {
  // @ts-ignore
  const icon = IconType[name];
  return { icon, type: name == DoOperation.submit ? "primary" : "default"};
}
//按钮文案
const buttonName = function (name: string) {
  let value = "";
  switch (name) {
    case DoOperation.cancel:
      value = i18n.common.button.cancel;
      break;
    case DoOperation.delete:
      value = i18n.common.button.delete;
      break;
    case DoOperation.interrupt:
      value = i18n.common.button.interrupt;
      break;
    case DoOperation.confirm:
      value = i18n.common.button.confirm;
      break;
    case DoOperation.reject:
      value = i18n.common.button.reject;
      break;
    case DoOperation.hedge:
      value = i18n.common.button.hedge;
      break;
    case DoOperation.partner:
      value = i18n.common.button.partner;
      break;
    case DoOperation.submit:
      value = i18n.common.button.submit;
      break;
    case DoOperation.instruction:
      value = i18n.common.button.instruction;
      break;
    case DoOperation.edit:
      value = i18n.common.button.edit;
      break;
    default:
      value = _.startCase(name);
      break;
  }
  return value;
}
</script>

<template>
  <Menu v-if="layout == Skin.vertical">
    <MenuItem class="py-2" @click="handleClick(name)" :key="name" v-for="name in optTypes">{{ buttonName(name) }}</MenuItem>
  </Menu>
  <Space size="large" v-else>
    <Button @click="handleClick(name)" :type="buttonType(name).type" :key="name" v-for="name in optTypes">
      <template #icon>
        <Icon class="text-base" :type="buttonType(name).icon"></Icon>
      </template>
      <span>{{ buttonName(name) }}</span>
    </Button>
  </Space>
</template>