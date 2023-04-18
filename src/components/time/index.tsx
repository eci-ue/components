/**
 * @file 动态表单
 * @author svon.me@gmail.com
 */

import { main } from "./util";
import * as _ from "lodash-es";
import type { date } from "@ue/utils";
import { PropType, defineComponent } from "vue";

import type { Props } from "./type";

export default defineComponent({
  props: {
    value: {
      default: "",
      type: [Number, String] as PropType<date.DateValue>
    },
    date: {
      type: [Boolean, String] as PropType<boolean | string>,
      required: false,
    },
    format: {
      type: String,
      required: false,
    }
  },
  setup (props: Readonly<Props>) {
    return () => {
      const value = main(props);
      return (<span>{ value }</span>);
    };
  },
});
