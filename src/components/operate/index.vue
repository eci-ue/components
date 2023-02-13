<script setup lang="ts">
import _ from "lodash-es";
import { computed, reactive, PropType } from "vue";
import { Menu, MenuItem, Button, Space, Modal } from "ant-design-vue";
import { form } from "@ue/form";
import { RatePartner, DoOperation, ResourceType } from "./type";
import { default as Icon } from "../icon";
import { api } from "src/api";
import { ratePartner, interupt } from "./util";
import message from "ant-design-vue/lib/message/index";
import safeGet from "@fengqiaogang/safe-get";

enum Skin {
  horizontal = "horizontal",
  vertical = "vertical"
}

enum IconType {
  delete = "delete-outlined",
  interupt = "file-sync-outlined"
}

interface itemType extends ResourceType {
  taskId: string | number,
  id?: string | number,
  [key: string]: any
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
    type: String as PropType<String | Skin>,
    default: "horizontal",
  },
  keyId: {
    type: String,
    default: "taskId",
  }
});
const emit = defineEmits(["reload"]);

//刷新列表
const onReload = function () {
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
    onReload()
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
      api.task.saveRatePartner<RatePartner>(params);
    }
  });
}
//interrupts
const interruptTask = async function () {
  form(interupt(), {
    title: "Interupt",
    async onOk(data: any) {
      const status = await api.task.addInterupt(taskId.value, data.reason)
      if (status) {
        onReload()
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
        if (status) {
          onReload()
        }
      } catch (error) {
        const tips = safeGet<string>(error as object, "message");
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
          onReload()
        }
      } catch (error) {
        const tips = safeGet<string>(error as object, "message");
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
          onReload()
        }
      } catch (error) {
        const tips = safeGet<string>(error as object, "message");
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
          onReload()
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