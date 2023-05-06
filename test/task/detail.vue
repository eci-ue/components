<script setup lang="ts">
import { FileInformation, WorkMode } from "../../src/index";
import { useState } from "@ue/utils";

const id = "400000090";
const { state } = useState.data<any>(() => {
  const data = '{"id":400000090,"taskName":"E_zh-CN_en-US_20230506-062509","mainType":"Translation","workFlowId":531997,"resourceId":7161,"resourceName":"Outer7161","subType":"E","catType":2,"fileManualType":0,"innerOuterType":1,"onlineOfflineType":1,"status":2,"projectId":10101147,"projectName":"CDXX_memoq zh to en","resourceFileNum":1,"deliveryFileNum":0,"updateTime":null,"updateUser":null,"createTime":"2023-05-06 06:25:27","createUser":"987d5291d992464ab86bd757b684b101","relBgfile":0,"operate":["submit","instruction"],"taskBilingualFileRspList":[{"id":400000083,"bilingualFileName":"新建 文本文档 (2).txt","bilingualFileId":10608028,"catFileId":"0402d73d-8070-440c-bf66-b87db4f1812c","catUrl":"https://memoq.ecinnovations.com/memoqweb/webtrans/Translation.aspx?prj=9be03784-6ce2-ed11-9edc-f52e8da68b6c&doc=0402d73d-8070-440c-bf66-b87db4f1812c","taskBilingualFileStageRspList":[{"workLoad":39,"resourceName":"Translator0","rate":100,"subType":"T","current":false,"online":true,"status":4,"catUrl":null},{"workLoad":53,"resourceName":"Outer7161","rate":0,"subType":"E","current":true,"online":true,"status":2,"catUrl":"https://memoq.ecinnovations.com/memoqweb/webtrans/Translation.aspx?prj=9be03784-6ce2-ed11-9edc-f52e8da68b6c&doc=0402d73d-8070-440c-bf66-b87db4f1812c"}],"lqrName":"welcome.png","lqrVisitPath":"drive/20230506/GExXy6sse1hbGRf21gwqhmSIGWkqW0/welcome.png","lqrIndex":1,"lqrData":{"id":1654742016146866177,"type":1,"fileName":"welcome.png","storageType":1,"storagePath":"drive/20230506/GExXy6sse1hbGRf21gwqhmSIGWkqW0/welcome.png","point":0.0,"level":0,"overallQuality":2,"itemQuality":1,"rate":1,"advice":"1233","updateTime":null,"updateUser":null,"createTime":"2023-05-06 06:56:55","createUser":2024,"tresourceId":2246,"tresourceName":"Outer2246","eresourceName":"Outer7161","eresourceId":7161,"ttaskId":400000083,"tpaidWords":null,"twords":39,"epaidWords":null,"ewords":53,"eadjustPercent":null,"etaskId":400000090,"tadjustPercent":null}}],"workInstructionList":[],"attachments":null,"resourceIdCard":null,"workLoad":53.00,"acceptTime":"2023-05-06 06:25:35","rejectReason":null,"deliveryTime":"2023-05-13 06:40:23","realWorkLoad":0.00,"workLoadUnit":"11","slang":7,"slangName":"zh-CN","tlang":12,"tlangName":"en-US","commentRequest":null,"transferFrom":null,"transferTo":null,"dataFrom":1,"fee":0.10,"feeCost":0.10,"currency":28,"currencyName":"RMB","mtDiscount":0,"mtFactor":1.00,"reviewFactor100":null,"reviewFactor101":null,"priceId":"18891","unitPrice":0.1000,"priceName":"0.1 RMB/Word","payForMatch100":0,"payForMatch101":0,"jasNum":"ECI_JAS_202305_000002","jasCreateTime":"2023-05-06 06:25:35","amount":5.30,"taskOuterDetailRspArrayList":[{"id":1654734099498729473,"taskId":400000090,"breakDown":null,"breakDownName":"repetition","discount":0.40,"unitPrice":0.10,"words":0,"subTotal":0.0000},{"id":1654734099498729474,"taskId":400000090,"breakDown":null,"breakDownName":"hit101","discount":0.25,"unitPrice":0.10,"words":0,"subTotal":0.0000},{"id":1654734099498729475,"taskId":400000090,"breakDown":null,"breakDownName":"hit100","discount":0.25,"unitPrice":0.10,"words":0,"subTotal":0.0000},{"id":1654734099498729476,"taskId":400000090,"breakDown":null,"breakDownName":"hit9599","discount":1.00,"unitPrice":0.10,"words":0,"subTotal":0.0000},{"id":1654734099498729477,"taskId":400000090,"breakDown":null,"breakDownName":"hit8594","discount":1.00,"unitPrice":0.10,"words":0,"subTotal":0.0000},{"id":1654734099511312385,"taskId":400000090,"breakDown":null,"breakDownName":"hit7584","discount":1.00,"unitPrice":0.10,"words":0,"subTotal":0.0000},{"id":1654734099511312386,"taskId":400000090,"breakDown":null,"breakDownName":"hit5074","discount":1.00,"unitPrice":0.10,"words":0,"subTotal":0.0000},{"id":1654734099519700993,"taskId":400000090,"breakDown":null,"breakDownName":"noMatch","discount":1.00,"unitPrice":0.10,"words":53,"subTotal":5.3000}],"lqrOper":3,"unitName":"Word"}';
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
      :pm="false" 
      :partner="true" 
      :status="state.status" 
      :mode="catType(state.catType)"
      :projectId="state.projectId" 
      :id="id" 
      :language="state.slang"></FileInformation>
  </div>
</template>