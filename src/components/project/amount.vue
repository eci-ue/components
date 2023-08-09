<script setup lang="ts">
/**
 * @file Amonut 明细列表
 * @author svon.me@gmail.com
 */

import * as _ from "lodash-es";
import { PropType } from "vue";
import i18n from "../../utils/i18n";
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
  /** 费用 */
  money: {
    type: [String, Number],
    required: false,
    default: () => 0
  },
  /** 费用保留小数后几位 */
  fixed: {
    type: Number,
    required: false,
    default: () => 4
  },
  /** 费用单位 */
  moneyUnit: {
    type: String,
    required: false,
  },
  /** work 单位 */
  workUnit: {
    type: String,
    required: false,
  },
  /** Workload ( MT factor)列是否显示 （mtDiscount机翻折扣和mtShow都为1时显示） */
  mtShow: {
    type: [Boolean, Number],
    required: false,
  },
  /** MT factor的值 */
  mtFactor: {
    type: [Number, String],
    required: false,
  },
  /** taskOuterDetailRspArrayList */
  list: {
    default: [],
    required: true,
    type: Array as PropType<AmountItemData[]>
  }
});


const task = function<T = number>(index: number, key: string, autoValue?: T) {
  const value = safeGet<T>(props.list, `[${index}].${key}`);
  return (value || autoValue) as T;
};

const amount = function(list: AmountItemData[]): string {
  let sum = new BigNumber(0);
  const array = _.compact(_.concat(list));
  for (const data of array) {
    sum = sum.plus(data.subTotal);
  }
  return sum.toFixed(4);
};
</script>

<template>
  <div class="ant-table ant-table-bordered">
    <div class="ant-table-container">
      <div class="ant-table-content">
        <table class="table-fixed">
          <thead class="ant-table-thead">
            <tr>
              <th class="ant-table-cell">{{ i18n.project.detail.type }}</th>
              <th class="ant-table-cell">{{ i18n.project.label.amount }}</th>
              <th class="ant-table-cell">
                <span class="block text-right">
                  {{ i18n.project.detail.workLoad }}
                </span>
              </th>
              <th class="ant-table-cell" v-if="mtShow">
                <span class="block text-right">
                  {{ i18n.project.detail.workLoadMT }}
                </span>
              </th>
              <th class="ant-table-cell">
                <span class="block text-right">
                  <span>{{ i18n.project.detail.unitPrice }}</span>
                  <span class="ml-1" v-if="moneyUnit">({{ moneyUnit }})</span>
                </span>
              </th>
              <th class="ant-table-cell">
                <span class="block text-right">{{ i18n.project.detail.discount }}</span>
              </th>
              <th class="ant-table-cell">
                <span class="block text-right">
                  <span>{{ i18n.project.detail.subtotal }}</span>
                  <span class="ml-1" v-if="moneyUnit">({{ moneyUnit }})</span>
                </span>
              </th>
            </tr>
          </thead>
          <tbody class="ant-table-tbody">
            <tr v-for="(name, index) in taskPhaseList" :key="name">
              <td class="ant-table-cell" rowspan="8" v-if="index < 1">{{ _.upperFirst(type) }}</td>
              <td class="ant-table-cell">{{ name }}</td>
              <td class="ant-table-cell text-right">
                <span v-if="mtShow">{{ toFixed(task(index, "initWords"), 0) }}</span>
                <span v-else>{{ toFixed(task(index, "words"), 0) }}</span>
              </td>
              <td class="ant-table-cell text-right" v-if="mtShow">
                {{ toFixed(task(index, "words"), 0) }}
                <span  v-if="index > 5">({{ mtFactor || 1 }})</span>
              </td>
              <td class="ant-table-cell text-right" rowspan="8" v-if="index < 1">{{ toFixed(money, fixed) }}</td>
              <td class="ant-table-cell text-right">{{ valueFormat(toFixed(task(index, "discount", 0) * 100, 0), "%") }}</td>
              <td class="ant-table-cell text-right">{{ toFixed(task(index, "subTotal"), fixed) }}</td>
            </tr>
            <tr>
              <td class="ant-table-cell">{{ i18n.project.label.amount }}</td>
              <td class="ant-table-cell text-right" colspan="5">{{ amount(list) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>