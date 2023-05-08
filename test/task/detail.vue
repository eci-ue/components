<script setup lang="ts">
import { FileInformation, WorkMode } from "../../src/index";
import { useState } from "@ue/utils";

const id = "300614909";
const { state } = useState.data<any>(() => {
  const data = '{"id":300614909,"taskName":"E_zh-CN_en-US_20230508-022050","mainType":"Translation","workFlowId":952936,"resourceId":10002322,"resourceName":"SYJY_Alyssa[郑炫玥](-)","subType":"E","catType":2,"fileManualType":0,"innerOuterType":0,"onlineOfflineType":1,"status":4,"projectId":10101152,"projectName":"CDXX_全流程测试-transfer to engineer","resourceFileNum":1,"deliveryFileNum":0,"updateTime":null,"updateUser":null,"createTime":"2023-05-08 02:21:28","createUser":"987d5291d992464ab86bd757b684b101","relBgfile":0,"operate":["confirm","reject"],"taskBilingualFileRspList":[{"id":300614908,"bilingualFileName":"Source_Word-1.docx","bilingualFileId":10609004,"catFileId":"a5c249e2-44ed-ed11-9edc-f52e8da68b6c","catUrl":"https://memoq.ecinnovations.com/memoqweb/login","taskBilingualFileStageRspList":[{"workLoad":55,"resourceName":"CQLX_Charlotte[王磊](-)","rate":100,"subType":"T","current":false,"online":true,"status":4,"catUrl":"https://memoq.ecinnovations.com/memoqweb/login"},{"workLoad":96,"resourceName":"SYJY_Alyssa[郑炫玥](-)","rate":100,"subType":"E","current":true,"online":true,"status":4,"catUrl":"https://memoq.ecinnovations.com/memoqweb/login"}],"lqrName":"HR测试账号信息.txt","lqrVisitPath":"drive/20230508/Nr2Rq6yoy9lcq7XO7l4gwBTgQnMVOY/HR测试账号信息.txt","lqrIndex":1,"lqrData":{"id":1655449884805926914,"type":1,"fileName":"HR测试账号信息.txt","storageType":1,"storagePath":"drive/20230508/Nr2Rq6yoy9lcq7XO7l4gwBTgQnMVOY/HR测试账号信息.txt","point":1.0,"level":4,"overallQuality":null,"itemQuality":null,"rate":null,"advice":null,"updateTime":null,"updateUser":null,"createTime":"2023-05-08 05:49:44","createUser":10002322,"tresourceId":10002579,"tresourceName":"CQLX_Charlotte[王磊](-)","eresourceName":"SYJY_Alyssa[郑炫玥](-)","eresourceId":10002322,"ttaskId":300614908,"tpaidWords":55,"twords":55,"epaidWords":96,"ewords":96,"etaskId":300614909,"tadjustPercent":0.0,"eadjustPercent":0.0}}],"workInstructionList":[],"attachments":null,"resourceIdCard":null,"unitName":"Word","workLoad":96.00,"acceptTime":"2023-05-08 05:39:54","rejectReason":null,"deliveryTime":"2023-05-08 05:50:33","realWorkLoad":96.00,"workLoadUnit":"11","slang":7,"slangName":"zh-CN","tlang":12,"tlangName":"en-US","commentRequest":null,"commentEngineer":null,"transferFrom":null,"transferTo":null,"dataFrom":1,"fee":25.28,"feeCost":45.78,"currency":28,"currencyName":null,"mtDiscount":null,"mtFactor":null,"reviewFactor100":null,"reviewFactor101":null,"priceId":null,"unitPrice":null,"priceName":null,"payForMatch100":null,"payForMatch101":null,"mtdiscount":null,"jasNum":null,"jasCreateTime":null,"amount":null,"taskOuterDetailRspArrayList":null,"emailTime":null,"lqrLevel":"4","lqrOper":2,"qualityLevel":null,"dtpToolName":null,"taskFactor":null,"taskType":null}';
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
      :lqr-oper="state.lqrOper" 
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