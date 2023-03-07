<script setup lang="ts">
import Icon from "../icon";
import * as _ from "lodash-es";
import { api } from "../../api";
import { form } from "@ue/form";
import { confirm as modalComfirm } from "@ue/model";
import { ratePartner, interupt } from "./util";
import { computed, reactive, PropType } from "vue";
import * as message from "@ue/message";
import { Menu, MenuItem, Button, Space, Modal } from "ant-design-vue";
import { DoOperation, IconType, Skin, Status } from "./type";
import type { RatePartner, itemType } from "./type";
import { lazyload } from "@ue/utils";

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
const emit = defineEmits(["reload"]);

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
  form(ratePartner(), {
    okText: "Save",
    title: "Rate the partner",
    async onOk(data: any) {
      const params = reactive<RatePartner>({
        impression: _.get(data, "impression"),
        resourceId: props.item.resourceId,
        resourceName: props.item.resourceName,
        taskId: taskId.value
      })
      _.forEach(data.partner, item => {
        (params as any)[item] = 1
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
    title: "Interupt Reason",
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
  const isOk = await message.confirm('Are you sure delete this task.');
  if (isOk) {
    const status = await api.task.deleteTask(taskId.value)
    if (status) {
      onReload(name)
    }
  }
}
//cancel
const cancelTask = async function (name: string) {
  const isOk = await message.confirm('Are you sure cancel this task.');
  if (isOk) {
    const status = await api.task.cancelTask(taskId.value)
    if (status) {
      onReload(name)
    }
  }
}

//reject
const rejectTask = async function (name: string) {
  const isOk = await message.confirm('Are you sure reject this task.');
  if (isOk) {
    const status = await api.task.rejectTask(taskId.value)
    if (status) {
      onReload(name)
    }
  }
}
//Hedge Jas
const tip = `Are you sure you want to create a hedged JAS?The newly created hedging JAS is a JAS with a negative workload that needs to be confirmed by the resource.`
const onHedge = async function (name: string) {
  const isOk = await message.confirm(tip);
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
    const isOk = await message.confirm('Are you sure submit this task.');
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
      title: "Submit Work",
      width: 408,
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
  modalComfirm(Instruction, "Task Instruction", { data });
}

const typeButton = function (name: string) {
  return {
    icon:IconType[name],
    type:name == DoOperation.submit?"primary":"default"
  } as any
}
</script>

<template>
  <div>
    <Menu v-if="layout == Skin.vertical">
      <MenuItem @click="handleClick(name)" :key="name" v-for="name in optTypes"> {{ _.upperFirst(name) }} </MenuItem>
    </Menu>
    <Space size="large" v-else>
      <Button @click="handleClick(name)" :type="typeButton(name).type" :key="name" v-for="name in optTypes">
        <template #icon>
          <Icon class="text-base" :type="typeButton(name).icon"></Icon>
        </template>
        <span>{{ _.upperFirst(name) }}</span>
      </Button>
    </Space>
</div>
</template>