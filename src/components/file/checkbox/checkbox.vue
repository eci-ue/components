<script setup lang="ts">
/**
 * @file 网盘 - 选择文件
 * @author svon.me@gmail.com
 */

import * as _ from "lodash-es";
import { api } from "../../../api";
import DBlist from "@fengqiaogang/dblist";
import { ref, onMounted, PropType, computed } from "vue";

import File from "./file.vue";
import Icon from "../../icon";
import { Space, Breadcrumb, BreadcrumbItem, CheckboxGroup, Empty } from "ant-design-vue";

import type { FileItem } from "../props";

const emit = defineEmits(["update:value", "change"]);
const props = defineProps({
  value: {
    default: [],
    type: Array as PropType<Array<string | number>>,
  },
  // 查询网盘的所有文件
  all: {
    type: Boolean,
    default: false,
  },
  // 是否允许文件多选
  multiple: {
    type: Boolean,
    default: false,
  },
  // 根目录ID
  rootId: {
    type: [String, Number],
    default: 0,
  },
  // 禁用某些文件或文件夹 
  disable: {
    type: Array as PropType<Array<string | number>>,
    default: () => []
  },
});

const checkedValue = computed<Array<string | number>>({
  get: () => props.value,
  set: (value: Array<string | number>) => {
    emit("update:value", value);
    emit("change", value);
  }
});

const primaryKey = "id";
const foreignKey = "parentId";
const currentFolder = ref<string | number>(props.rootId); // 当前文件夹ID
const db = new DBlist([], primaryKey, foreignKey, props.rootId);

const selectedChildren = ref<FileItem[]>([]);
const setSelectedChildren = function(selectedValue: string | number, list: FileItem[]) {
  currentFolder.value = selectedValue;
  if (!props.multiple || list.length > 0) {
    selectedChildren.value = list;
  }
  if (props.multiple) {
    checkedValue.value = [];
  } else {
    checkedValue.value = [selectedValue];
  }
}

const getList = function(id: string | number) {
  const where = { [foreignKey]: id };
  return db.select<FileItem>(where);
};

const getSelectedName = function(): string {
  if (currentFolder.value === props.rootId) {
    return "All Files";
  }
  const data = db.selectOne<FileItem>({
    [primaryKey]: currentFolder.value
  });
  if (data.name && data.name.length > 30) {
    return data.name.replace(/^(.{10}).+(.{10})$/, "$1...$2");
  }
  return data.name;
}

const breadcrumbList = function(): FileItem[] {
  const root = {
    id: props.rootId, 
    name: "All Files"
  };
  const list = db.parentDeepFlatten<FileItem>({
    [primaryKey]: currentFolder.value
  });
  return _.concat<FileItem>(root as FileItem, list);
};

const onLoadList = async function(id: string | number) {
  const list = getList(id);
  if (list.length < 1) {
    const data = await api.file.childrenList<FileItem>(id, false, props.all);
    db.insert(data);
    setSelectedChildren(id, data);
  } else {
    setSelectedChildren(id, list);
  }
}

const onSwitch = function(id: number | string) {
  return onLoadList(id);
}

const onClickItem = async function(e: Event, data: FileItem) {
  const setCheckedValue = function(value: string | number) {
    if (props.multiple) {
      const list = _.concat(checkedValue.value);
      if (_.includes(list, data.id)) {
        _.remove(list, function(value: string | number) {
          return value === data.id;
        });
      } else {
        list.push(value);
      }
      checkedValue.value = list;
    }
  }
  if (data.id) {
    if (data.fileId && data.fileId > 0) {
      // 当前文件非文件夹
      setCheckedValue(data.id);
    } else {
      // 如果是文件夹
      await onSwitch(data.id);
      const childrenList = getList(data.id);
      // 如果文件夹为空时，选中当前文件
      if (childrenList.length < 1) {
        setCheckedValue(data.id);
      }
    }
  }
}

// 判断该文件是否可以选择
const isMove = function(fileId: string | number): boolean {
  let status = true;
  if (props.disable && props.disable.length > 0) {
    for (const value of props.disable) {
      if (value === fileId) {
        status = false;
        break;
      }
    }
  }
  return status;
}

onMounted(function() {
  onSwitch(props.rootId);
});
</script>

<template>
  <div>
    <div class="select-none mb-4">
      <Breadcrumb>
        <template v-for="item in breadcrumbList()" :key="item.id">
          <template v-if="(item.id === _.last(checkedValue))">
            <BreadcrumbItem :class="{'inline-block': item.id === rootId}">{{ item.name }}</BreadcrumbItem>
          </template>
          <template v-else>
            <BreadcrumbItem class="link" :class="{'inline-block': item.id === rootId}" @click="onSwitch(item.id as number)">{{ item.name }}</BreadcrumbItem>
          </template>
        </template>
      </Breadcrumb>
    </div>
    <CheckboxGroup class="w-full max-h-80 overflow-y-auto" v-model:value="checkedValue">
      <div v-if="selectedChildren.length > 0">
        <template v-for="item in selectedChildren" :key="item.id">
          <template v-if="isMove(item.id as number)">
            <File :data="item" :disable="false" :multiple="multiple" @click="onClickItem"></File>
          </template>
          <template v-else>
            <File :data="item" :disable="true" :multiple="multiple"></File>
          </template>
        </template>
      </div>
      <div v-else-if="multiple">
        <Empty :description="null"></Empty>
      </div>
      <div v-else>
        <div class="flex justify-center" style="font-size: 90px;">
          <Icon type="icon-folder"></Icon>
        </div>
        <div class="text-center">
          <Space class="text-sm text-eci-text-gray">
            <span>Move to</span>
            <span>{{ getSelectedName() }}</span>
            <span>Folder</span>
          </Space>
        </div>
      </div>
    </CheckboxGroup>
  </div>
</template>