<script setup lang="ts">
import { FileInformation, WorkMode } from "../../src/index";
import { useState } from "@ue/utils";

const id = "300615021";
const { state } = useState.data<any>(() => {
  const data = '{"id":300615021,"taskName":"E_en-US_zh-CN_20230512-094901","mainType":"Translation","workFlowId":664228,"resourceId":863,"resourceName":"SYJY_Penny[王扬]","subType":"E","catType":0,"fileManualType":0,"innerOuterType":0,"onlineOfflineType":0,"status":2,"projectId":10094139,"projectName":"SYJY_ProjectName10094139","resourceFileNum":1,"deliveryFileNum":0,"updateTime":null,"updateUser":null,"createTime":"2023-05-12 09:49:17","createUser":"24ce45effab84203a33971b62e98c5d0","relBgfile":0,"operate":["submit","instruction"],"taskBilingualFileRspList":[{"id":300615020,"bilingualFileName":"444","bilingualFileId":10609088,"catFileId":null,"catUrl":null,"taskBilingualFileStageRspList":[{"workLoad":12121,"resourceName":"Translator0","rate":0,"subType":"T","current":false,"online":false,"status":4,"catUrl":null},{"workLoad":12121,"resourceName":"SYJY_Penny[王扬]","rate":0,"subType":"E","current":true,"online":false,"status":2,"catUrl":null}],"lqrName":"Source_Word.docx","lqrVisitPath":"drive/20230512/AHxkz8Ncjl00ZQ6Zs88BgEKssHsahI/Source_Word.docx","lqrIndex":1,"lqrData":{"id":1657195495867650049,"type":1,"fileName":"Source_Word.docx","storageType":1,"storagePath":"drive/20230512/AHxkz8Ncjl00ZQ6Zs88BgEKssHsahI/Source_Word.docx","point":3.0,"level":1,"overallQuality":null,"itemQuality":null,"rate":null,"advice":null,"updateTime":null,"updateUser":null,"createTime":"2023-05-13 01:26:10","createUser":863,"tresourceId":1167,"tresourceName":"SYJY_Geni[张莹]","eresourceName":"SYJY_Penny[王扬]","eresourceId":863,"ttaskId":300615020,"tpaidWords":18182,"twords":12121,"epaidWords":6060,"ewords":12121,"etaskId":300615021,"tadjustPercent":50.0,"eadjustPercent":-50.0}}],"workInstructionList":null,"attachments":null,"resourceIdCard":null,"workLoad":12121.00,"acceptTime":"2023-05-12 09:49:47","rejectReason":null,"deliveryTime":"2023-05-31 09:00:10","realWorkLoad":6060.00,"workLoadUnit":"11","slang":12,"tlang":7,"slangShortName":"en-US","tlangShortName":"zh-CN","commentRequest":null,"transferFrom":null,"transferTo":null,"dataFrom":1,"fee":25.28,"feeCost":45.78,"currency":28,"currencyName":null,"mtDiscount":null,"mtFactor":null,"reviewFactor100":null,"reviewFactor101":null,"lqrLevel":"1","lqrOper":2,"unitName":"Word","qualityLevel":null,"dtpToolName":null,"taskFactor":null,"taskType":null}';
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