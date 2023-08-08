/**
 * @file 菜单名称
 * @author svon.me@gmail.com
 */

import Link from "../link";
import { defineComponent } from "vue";
import safeGet from "@fengqiaogang/safe-get";
import type { PropType } from "vue";
import type { MenuData } from "./type";
import type { RouteLocationRaw } from "vue-router";


export default defineComponent({
  name: "Link",
  props: {
    data: {
      required: true,
      type: Object as PropType<MenuData>,
    }
  },
  setup(props) {
    const className = "px-6 h-full ease-in duration-300 cursor-pointer flex items-center";
    return () => {
      const url = props.data.link;
      if (url && typeof url === "object" && safeGet<RouteLocationRaw>(url, "to")) {
        const target = safeGet<string>(url, "target");
        const to = safeGet<RouteLocationRaw>(url, "to");
        return (<Link class={ className } to={ to } target={ target }>{ props.data.label }</Link>);
      }
      if (url) {
        const value: string | RouteLocationRaw = url as any;
        return <Link class={ className } to={ value }>{ props.data.label }</Link>;
      }
      return (<Link class={ className } tag="a">{ props.data.label }</Link>);
    };
  }
});