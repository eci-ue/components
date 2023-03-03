
import * as _ from "lodash-es";
import { FormTextarea, FormCheckbox } from "../form/index";
import type { FormOptionValue, FormItemData } from "@ue/form/types/props";

export const ratePartner = function (): FormOptionValue {
  const proactiveCooperation: FormItemData = {
    key: "partner",
    component: FormCheckbox,
    meta: {
      list: [{
        value: "proactiveCooperation",
        name: "Proactive Cooperation"
      }, {
        value: "noQualityAccident",
        name: "No Quality Accident"
      }, {
        value: "deliveryOnTime",
        name: "Delivery On Time"
      }, {
        value: "addToFavorite",
        name: "Add To Favorite"
      }, {
        value: "innerOuterType",
        name: "Add To This Client’s Resource Pool"
      }],
      skin: "vertical"
    }
  };

  const comment: FormItemData = {
    key: "impression",
    lable: "My Impression",
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
      lable: "Reason",
      component: FormTextarea,
    }
  ]
}
