/**
 * @file 动态表单
 * @author svon.me@gmail.com
 */

import * as _ from "lodash-es";
import { date } from "@eci/utils";
import { PropType, defineComponent } from "vue";

interface Props {
  value: date.DateValue;
  date: boolean | undefined;
  format: string;
};

const main = function(data: Props) {
  if (data.value) {
    if (data.value === "-" || data.value === "--") {
      return "--";
    }
    return date.format(data.value, data.format ? data.format : data.date);
  }
  return "--";
}

export default defineComponent({
  name: "UiTime",
  props: {
    value: {
      default: "",
      type: [Number, String] as PropType<date.DateValue>
    },
    date: {
      type: Boolean,
      required: false,
      default () {
        return undefined;
      }
    },
    format: {
      type: String,
      default: ""
    }
  },
  setup (props: Props) {
    return () => {
      const value = main(props);
      return (<span>{ value }</span>);
    };
  },
});
