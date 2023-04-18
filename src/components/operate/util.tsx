
import * as _ from "lodash-es";
import i18n from "../../utils/i18n";
import { FormTextarea, FormCheckbox } from "../form/index";
import type { FormOptionValue, FormItemData } from "@ue/form";
import type { RatePartner } from "./type";
const ratePartnerList = ["proactiveCooperation","noQualityAccident","deliveryOnTime","addToFavorite","addToClientResourcePool"]
export const ratePartnerForm = function (data:RatePartner): FormOptionValue {
  let partnerVal: string[] = []
  _.each(data || {},(val,key)=>{
    if (_.includes(ratePartnerList,key) && val){
      partnerVal = _.concat(partnerVal,key)
    }
  })
  const proactiveCooperation: FormItemData = {
    key: "partner",
    component: FormCheckbox,
    value:partnerVal,
    meta: {
      list: [{
        value: "proactiveCooperation",
        name: i18n.operate.list.proactiveCooperation
      }, {
        value: "noQualityAccident",
        name: i18n.operate.list.noQualityAccident
      }, {
        value: "deliveryOnTime",
        name: i18n.operate.list.deliveryOnTime
      }, {
        value: "addToFavorite",
        name: i18n.operate.list.addToFavorite
      }, {
        value: "addToClientResourcePool",
        name: i18n.operate.list.addToClientResourcePool
      }],
      skin: "vertical"
    }
  };

  const comment: FormItemData = {
    key: "impression",
    value:data.impression,
    lable: i18n.operate.label.impression,
    component: FormTextarea,
  };
  return [
    [proactiveCooperation, []], comment
  ] as FormOptionValue;
}
export const interupt = function (): FormOptionValue {
  return [
    {
      key: "reason",
      lable: i18n.common.label.reason,
      component: FormTextarea,
    }
  ]
}
