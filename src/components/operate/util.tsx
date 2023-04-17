
import * as _ from "lodash-es";
import i18n from "../../utils/i18n";
import { FormTextarea, FormCheckbox } from "../form/index";
import type { FormOptionValue, FormItemData } from "@ue/form";

export const ratePartner = function (): FormOptionValue {
  const proactiveCooperation: FormItemData = {
    key: "partner",
    component: FormCheckbox,
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
        value: "innerOuterType",
        name: i18n.operate.list.innerOuterType
      }],
      skin: "vertical"
    }
  };

  const comment: FormItemData = {
    key: "impression",
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
