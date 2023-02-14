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
const onReload = function (tip?: string) {
  message.success(tip)
  emit("reload");
}

const handleClick = async (name: string) => {
  //合作伙伴评价
  if (name == DoOperation.partner) {
    ratePartnerFn()
  } else if (name == DoOperation.hedge) {
    onHedge()
  } else if (name == DoOperation.delete) {
    deleteTask()
  } else if (name == DoOperation.interrupt) {
    interruptTask()
  } else if (name == DoOperation.confirm) {
    confirm()
  } else if (name == DoOperation.cancel) {
    cancelTask()
  } else if (name == DoOperation.reject) {
    rejectTask()
  }
};

const taskId = computed(function () {
  return props.item[props.keyId]
});

//confirm
const confirm = async function () {
  const status = await api.task.confirm(taskId.value);
  if (status) {
    onReload("Confirm Successfully!")
  }
}

//Rate partner
const ratePartnerFn = async function () {
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
        if (status) {
          onReload("Save Successfully!")
        }
      } catch (error) {
        const tips = _.get(error, "message");
        message.error(tips);
      }

    }
  });
}
//interrupts
const interruptTask = async function () {
  form(interupt(), {
    title: "Interupt",
    async onOk(data: any) {
      try {
        const status = await api.task.addInterupt(taskId.value, data.reason)
        if (status) {
          onReload("Interupt Successfully!")
        }
      } catch (error) {
        const tips = _.get(error, "message");
        message.error(tips);
      }
    }
  });

}
//delete
const deleteTask = async function () {
  Modal.confirm({
    content: 'Are you sure delete this task.',
    onOk: async () => {
      try {
        const status = await api.task.deleteTask(taskId.value)
        console.log(status)
        if (status) {
          onReload("Delete Successfully!")
        }
      } catch (error) {
        const tips = _.get(error, "message");
        message.error(tips);
      }
    }
  });
}
//cancel
const cancelTask = async function () {
  Modal.confirm({
    content: 'Are you sure cancel this task.',
    onOk: async () => {
      try {
        const status = await api.task.cancelTask(taskId.value)
        if (status) {
          onReload("Cancel Successfully!")
        }
      } catch (error) {
        const tips = _.get(error, "message");
        message.error(tips);
      }
    }
  });
}

//reject
const rejectTask = function () {
  Modal.confirm({
    content: 'Are you sure reject this task.',
    onOk: async () => {
      try {
        const status = await api.task.rejectTask(taskId.value)
        if (status) {
          onReload("Reject Successfully!")
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
const onHedge = async function () {
  Modal.confirm({
    content: tip,
    onOk: async () => {
      try {
        const status = await api.task.hedgeJAS(taskId.value)
        if (status) {
          onReload("Saved Successfully!")
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