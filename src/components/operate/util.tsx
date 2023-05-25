
import * as _ from "lodash-es";
import i18n from "../../utils/i18n";
import { FormTextarea, FormCheckbox } from "../form/index";
import type { FormOptionValue, FormItemData } from "@ue/form";
import { lazyload } from "@ue/utils";
import { RatePartner,RatePartnerList } from "./type";
const ratePartnerList = _.map(RatePartnerList,item=>item)
export const ratePartnerForm = function (data: RatePartner): FormOptionValue {
  const RateCom = lazyload(() => import("./rate.vue"));
  let favoriteVal: string[] = []
  let rateVal: string[] = []
  _.each(data || {}, (val, key) => {
    if (_.includes(ratePartnerList, key) && val) {
      if (_.includes([RatePartnerList.favorite, RatePartnerList.pool], key)) {
        favoriteVal = _.concat(favoriteVal, key)
      } else {
        rateVal = _.concat(rateVal, key)
      }
    }
  })
  const Rate: FormItemData =
  {
    lable: i18n.operate.label.rate,
    from: false,
    component: RateCom,
    meta: {
      defualtVal: rateVal
    }
  };
  const Favorite: FormItemData = {
    key: "partner",
    component: FormCheckbox,
    value: favoriteVal,
    lable: i18n.operate.label.favorite,
    meta: {
      list: [{
        value: "addToFavorite",
        name: i18n.operate.list.addToFavorite
      },
      {
        value: "addToClientResourcePool",
        name: i18n.operate.list.addToClientResourcePool
      }
      ],
      skin: "vertical"
    }
  };

  const comment: FormItemData = {
    key: "impression",
    value: data.impression,
    lable: i18n.operate.label.impression,
    component: FormTextarea,
  };
  return [
    Rate, [Favorite, []], comment
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
