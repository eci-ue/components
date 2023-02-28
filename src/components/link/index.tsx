/**
 * @file 超链接
 * @author svon.me@gmail.com
 */

import * as _ from "lodash-es";
import safeGet from "@fengqiaogang/safe-get";
import { RouterLink, useRouter } from "vue-router";
import { defineComponent, PropType, h as createElement } from "vue";

import { Props } from "./props";
import type { LocationQueryRaw, RouteParamsRaw, RouteLocationRaw } from "vue-router";

const isHref = function(value: string | RouteLocationRaw) {
  if (typeof value === "string") {
    return true;
  }
  return false;
}

const blank = "_blank";

export default defineComponent<Props>({
  name: "Link",
  props: {
    to: {
      required: false,
      default: "",
      type: [String, Object] as PropType<string | RouteLocationRaw>
    },
    tag: {
      type: String,
      default: "div",
      required: false,
    },
    target: {
      type: String,
      default: "",
      required: false,
    }
  } as any,
  setup(props: Props, { slots }) {
    const router = useRouter();
    const link = function(href: string | RouteLocationRaw, target?: string) {
      if (isHref(href)) {
        const value = { href, target: target && blank.includes(target) ? blank : "_self" };
        return createElement("a", value, slots);
      }
      return createElement(RouterLink, { to: href }, slots);
    }
    return () => {
      if (props.to) {
        if (isHref(props.to)) {
          return link(props.to, props.target);
        }
        const name = safeGet<string>(props.to, "name");
        const params = safeGet<RouteParamsRaw>(props.to, "params") || {};
        const query = safeGet<LocationQueryRaw>(props.to, "query") || {};
        const target = props.target || safeGet<string>(props.to, "meta.target");
        if (target && blank.includes(target)) {
          const url = router.resolve({ name, params, query });
          return link(url.fullPath, target);
        }
        return link({ name, params, query } as any, target);
      }
      return createElement(props.tag || "a", {}, slots);
    };
  }
});