<script setup lang="ts">
import Icon from "../icon";
import * as _ from "lodash-es";
import { api } from "../../api";
import { form } from "@ue/form";
import { ratePartner, interupt } from "./util";
import { computed, reactive, PropType } from "vue";
import { Menu, MenuItem, Button, Space, Modal, message } from "ant-design-vue";
import { DoOperation, IconType, Skin } from "./type";
import type { RatePartner, itemType } from "./type";

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
const onReload = function (name:string,tip?: string) {
  message.success(tip)
  emit("reload",name);
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
  }
};

const taskId = computed(function () {
  return props.item[props.keyId]
});

//confirm
const confirm = async function (name: string) {
  const status = await api.task.confirm(taskId.value);
  if (status) {
    onReload(name,"Confirm Successfully!")
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
      try {
        const status = await api.task.saveRatePartner<RatePartner>(params);
        console.log(status)
        if (status) {
          onReload(name,"Save Successfully!")
        }
      } catch (error) {
        const tips = _.get(error, "message");
        message.error(tips);
      }

    }
  });
}
//interrupts
const interruptTask = async function (name: string) {
  form(interupt(), {
    title: "Interupt",
    async onOk(data: any) {
      try {
        const status = await api.task.addInterupt(taskId.value, data.reason)
        console.log(status)
        if (status) {
          onReload(name,"Interupt Successfully!")
        }
      } catch (error) {
        const tips = _.get(error, "message");
        message.error(tips);
      }
    }
  });

}
//delete
const deleteTask = async function (name: string) {
  Modal.confirm({
    content: 'Are you sure delete this task.',
    onOk: async () => {
      try {
        const status = await api.task.deleteTask(taskId.value)
        if (status) {
          onReload(name,"Delete Successfully!")
        }
      } catch (error) {
        const tips = _.get(error, "message");
        message.error(tips);
      }
    }
  });
}
//cancel
const cancelTask = async function (name: string) {
  Modal.confirm({
    content: 'Are you sure cancel this task.',
    onOk: async () => {
      try {
        const status = await api.task.cancelTask(taskId.value)
        if (status) {
          onReload(name,"Cancel Successfully!")
        }
      } catch (error) {
        const tips = _.get(error, "message");
        message.error(tips);
      }
    }
  });
}

//reject
const rejectTask = function (name: string) {
  Modal.confirm({
    content: 'Are you sure reject this task.',
    onOk: async () => {
      try {
        const status = await api.task.rejectTask(taskId.value)
        if (status) {
          onReload(name,"Reject Successfully!")
        }
      } catch (error) {
        const tips = _.get(error, "message");
        message.error(tips);
      }
    }
  });
}
//Hedge Jas
const tip = `Are you sure you want to create a hedged JAS?The newly created hedging JAS is a JAS with a negative workload that needs to be confirmed by the resource.`
const onHedge = async function (name: string) {
  Modal.confirm({
    content: tip,
    onOk: async () => {
      try {
        const status = await api.task.hedgeJAS(taskId.value)
        if (status) {
          onReload(name,"Saved Successfully!")
        }
      } catch (error) { }
    }
  });
}

const typeIcon = function (name: string) {
  return (IconType as any)[name]
}
</script>

<template>
  <Menu v-if="layout == Skin.vertical">
    <MenuItem @click="handleClick(name)" :key="name" v-for="name in optTypes"> {{ name }} </MenuItem>
  </Menu>
  <Space :size="22" v-else>
    <Button @click="handleClick(name)" :key="name" v-for="name in optTypes">
      <template #icon>
        <Icon class="text-base" :type="typeIcon(name)"></Icon>
      </template>
      <span>{{ name }}</span>
    </Button>
  </Space>

</template>