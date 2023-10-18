<script setup lang="ts">
import { FileInformation, WorkMode } from "../../src/index";
import { useState } from "@ue/utils";

const id = "300615021";
const { state } = useState.data<any>(() => {
  const data = `{
        "taskAttribute":1,
        "id":4000087767,
        "taskName":"P_zh-CN_en-US_20231017-015539",
        "mainType":"Translation",
        "workFlowId":100204049,
        "resourceId":10002322,
        "resourceName":"SYJY_Alyssa[郑炫玥]",
        "subType":"P",
        "catType":2,
        "fileManualType":0,
        "innerOuterType":0,
        "onlineOfflineType":0,
        "status":2,
        "projectId":10064677,
        "projectName":"CDXX_ProjectName10064677",
        "resourceFileNum":1,
        "deliveryFileNum":0,
        "updateTime":null,
        "updateUser":null,
        "createTime":"2023-10-17 01:56:29",
        "createUser":"987d5291d992464ab86bd757b684b101",
        "relBgfile":0,
        "mtShow":null,
        "operate":[
            "submit",
            "instruction"
        ],
        "taskBilingualFileRspList":[
            {
                "id":4000087766,
                "bilingualFileName":"测试",
                "bilingualFileId":10609046,
                "catFileId":null,
                "catUrl":null,
                "taskBilingualFileStageRspList":[
                    {
                        "workLoad":40,
                        "resourceName":"Translator0",
                        "rate":0,
                        "subType":"E",
                        "current":false,
                        "online":false,
                        "status":2,
                        "catUrl":null
                    },
                    {
                        "workLoad":40,
                        "resourceName":"SYJY_Alyssa[郑炫玥]",
                        "rate":0,
                        "subType":"P",
                        "current":true,
                        "online":false,
                        "status":2,
                        "catUrl":null
                    }
                ],
                "lqrName":null,
                "lqrVisitPath":null,
                "lqrIndex":1,
                "lqrData":null,
                "showLqr":true,
                "lqfName":null,
                "lqfVisitPath":null,
                "lqfIndex":1,
                "lqfData":null,
                "showLqf":true
            }
        ],
        "workInstructionList":null,
        "attachments":null,
        "resourceIdCard":null,
        "workLoad":23,
        "acceptTime":"2023-10-17 01:56:29",
        "rejectReason":null,
        "deliveryTime":"2023-10-26 01:56:18",
        "realWorkLoad":0,
        "workLoadUnit":"12",
        "slang":7,
        "tlang":12,
        "slangShortName":"zh-CN",
        "tlangShortName":"en-US",
        "commentRequest":null,
        "transferFrom":null,
        "transferTo":null,
        "dataFrom":1,
        "fee":11.06,
        "feeCost":22.37,
        "currency":28,
        "currencyName":"CNY",
        "mtDiscount":null,
        "mtFactor":null,
        "reviewFactor100":null,
        "reviewFactor101":null,
        "lqrLevel":4,
        "lqrOper":3,
        "lqfLevel":5,
        "lqfOper":3,
        "unitName":"Hour",
        "qualityLevel":null,
        "dtpToolName":null,
        "taskFactor":null,
        "taskType":null,
        "taskTypeName":null
    }`;
  return Promise.resolve(JSON.parse(data));
});

const catType = function(value: number) {
  if (value === 1) {
    return WorkMode.Transdoc;
  } else if (value === 2) {
    return WorkMode.Memoq;
  } else {
    return WorkMode.Offline;
  }
}

</script>
<template>
  <div class="p-4">
    <FileInformation 
      :lqr-level="state.lqrLevel" 
      :lqf-level="state.lqfLevel" 
      :lqr-oper="state.lqrOper" 
      :lqf-oper="state.lqfOper" 
      :list="state.taskBilingualFileRspList"
      :pm="true" 
      :partner="false" 
      :status="state.status" 
      :mode="catType(state.catType)"
      :projectId="state.projectId" 
      :id="id" 
      :language="state.slang"></FileInformation>
  </div>
</template>