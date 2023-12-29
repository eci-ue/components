<script setup lang="ts">
/**
 * @file Memoq Express
 * @author theresia@eci.com
 */

import * as _ from "lodash-es";
import { PropType, ref, onMounted } from "vue";
import MemoqItem from "./card.vue";

import { Button, Spin } from "ant-design-vue";
import { ApiType, MemoqItemData } from "./type";


const $emit = defineEmits(["create"]);

const props = defineProps({
  // 请求数据列表接口
  requestApi: {
    required: true,
    type: Function as PropType<ApiType>,
  }
});


//loading状态
const loading = ref(false)
//memoq数据列表
let memoqList = ref()
//获取数据列表
const getData = async function () {
  loading.value = true
  if (props.requestApi?.listApi && typeof props.requestApi.listApi === "function") {
    try {
      memoqList.value = await Promise.resolve(props.requestApi.listApi());
    } catch (error) {
      memoqList.value = [];
    }
  }
  loading.value = false
}

//删除
const delItem = async function (item: MemoqItemData) {
  if (props.requestApi?.deleteApi && typeof props.requestApi.deleteApi === "function") {
    try {
      const status = await Promise.resolve(props.requestApi.deleteApi(item));
      if (status) {
        getData()
      }
    } catch (error) { }
  }
}

onMounted(() => {
  getData()
})

defineExpose({ reload: getData });
</script>
<template>
  <Spin :spinning="loading">
    <div class="card-box" v-if="_.size(memoqList) > 0">
      <template v-for="item in memoqList">
        <MemoqItem :item="item" @delete="delItem"></MemoqItem>
      </template>
    </div>
    <div v-else class="min-h-50 flex items-center justify-center">
      <Button type="link" @click=" $emit('create')">Import the first memoq project</Button>
    </div>
  </Spin>
</template> 
<style scoped lang="less">
.card-box {
  @apply grid grid-cols-2 gap-4 lg:grid-cols-3 2xl:grid-cols-4;
}
</style>