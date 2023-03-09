<script setup lang="ts">
/**
 * @file Amonut 明细列表
 * @author svon.me@gmail.com
 */

import _ from "lodash-es";
import { PropType } from "vue";
import BigNumber from "bignumber.js";
import { taskPhaseList } from "./type";
import safeGet from "@fengqiaogang/safe-get";
import { toFixed, valueFormat } from "@ue/utils";

import type { AmountItemData } from "./type";

const props = defineProps({
  /** Service Type */
  type: {
    type: String,
    default: "T",
    required: true,
  },
  /** 费用单位 */
  moneyUnit: {
    type: String,
    required: true,
  },
  /** work 单位 */
  workUnit: {
    type: String,
    required: true,
    default: "Word",
  },
  /** taskOuterDetailRspArrayList */
  list: {
    default: [],
    required: true,
    type: Array as PropType<AmountItemData[]>
  }
});


const task = function<T>(index: number, key: string, autoValue?: T) {
  const value = safeGet<T>(props.list, `[${index}].${key}`);
  return (value || autoValue) as T;
}

const amount = function(list: AmountItemData[]): string {
  let sum = new BigNumber(0);
  const array = _.compact(_.concat(list));
  for (const data of array) {
    sum = sum.plus(data.subTotal);
  }
  return sum.toFixed(4);
}
</script>

<template>
  <div class="ant-table ant-table-bordered">
    <div class="ant-table-container">
      <div class="ant-table-content">
        <table class="table-fixed">
          <thead class="ant-table-thead">
            <tr>
              <th class="ant-table-cell">Service Type</th>
              <th class="ant-table-cell">Item</th>
              <th class="ant-table-cell">
                <span class="block text-right">
                  <span>Workload</span>
                  <span class="ml-1" v-if="workUnit">({{ workUnit }})</span>
                </span>
              </th>
              <th class="ant-table-cell">
                <span class="block text-right">
                  <span>Unit Price</span>
                  <span class="ml-1" v-if="moneyUnit">({{ moneyUnit }})</span>
                </span>
              </th>
              <th class="ant-table-cell">
                <span class="block text-right">Discount</span>
              </th>
              <th class="ant-table-cell">
                <span class="block text-right">
                  <span>Subtotal</span>
                  <span class="ml-1" v-if="moneyUnit">({{ moneyUnit }})</span>
                </span>
              </th>
            </tr>
          </thead>
          <tbody class="ant-table-tbody">
            <tr v-for="(name, index) in taskPhaseList" :key="name">
              <td class="ant-table-cell" rowspan="8" v-if="index < 1">T</td>
              <td class="ant-table-cell">{{ name }}</td>
              <td class="ant-table-cell text-right">{{ toFixed(task<number>(index, "words"), 0) }}</td>
              <td class="ant-table-cell text-right" rowspan="8" v-if="index < 1">{{ toFixed(task<number>(index, "unitPrice"), 4) }}</td>
              <td class="ant-table-cell text-right">{{ valueFormat(toFixed(task<number>(index, "discount", 0) * 100, 0), "%") }}</td>
              <td class="ant-table-cell text-right">{{ toFixed(task<number>(index, "subTotal"), 4) }}</td>
            </tr>
            <tr>
              <td class="ant-table-cell">JAS Amount</td>
              <td class="ant-table-cell text-right" colspan="5">{{ amount(list) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>