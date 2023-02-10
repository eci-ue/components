/**
 * @file 超级 Icon
 * @author svon.me@gmail.com
 * @description 组合 IconFont & Ant Design Icon 图标
 */

import * as _ from "lodash-es";
import { IconExpand } from "./expand";
import safeGet from "@fengqiaogang/safe-get";
import * as icons from "@ant-design/icons-vue";
import { DefineComponent, defineComponent, h as createElement, PropType } from "vue";

import type { Props } from "./props";
import type { Component, CSSProperties } from "vue";

const expand = function(props: Props) {
  let value: Component | boolean = false;
  for (const callback of IconExpand()) {
    value = callback(props);
    if (value) {
      break;
    }
  }
  return value;
};

const create = function(name: string) {
  const iconFontStyle: CSSProperties = {
    "font-style": "normal",
    "line-height": 0,
    "text-transform": "none",
    "vertical-align": "-0.125em",
    "text-rendering": "optimizeLegibility",
    "-webkit-font-smoothing": "antialiased",
    "fill": "currentColor",
    "overflow": "hidden",
  };
  const svgStyle: CSSProperties = {
    width: "1rem", 
    height: "1rem",
  };
  return (<span class="icon-font">
    <i style={ iconFontStyle }>
      <svg aria-hidden="true" style={ svgStyle }>
        <use xlinkHref={`#${name}`}/>
      </svg>
    </i>
  </span>);
};

export default defineComponent({
  name: "EciIcon",
  props: {
    type: {
      required: true,
      type: String as PropType<string | DefineComponent>
    },
    size: {
      type: [String, Number] as PropType<string | number>,
      default: ""
    },
    class: {
      type: String,
      default: ""
    },
    color: {
      type: String,
      default: ""
    },
  },
  setup(props: Props, { slots }) {
    let isExpand: boolean = false;
    const icon = function(name: string | DefineComponent) {
      if (_.isString(name)) {
        const expandValue = expand(props);
        if (expandValue) {
          isExpand = true;
          return expandValue;
        }
        const key = _.upperFirst(_.camelCase(name));
        if (_.hasIn(icons, key)) {
          return safeGet<DefineComponent>(icons, key);
        }
        return create(name);
      }
      return name as DefineComponent;
    };

    return () => {
      const content = icon(props.type);
      const className = [props["class"]];
      if (props["class"] && props["class"].includes("flex")) {
        className.push("eci-icon");
      } else {
        className.push("eci-icon", "inline-flex");
      }
      const style = {};
      if (props.color) {
        _.set(style, "color", props.color);
      }
      if (props.size) {
        const value = _.isNumber(props.size) ? `${props.size}px` : props.size;
        if (isExpand) {
          className.push("items-center");
          _.set(style, "--eci-icon-size", value);
          _.set(style, "--icon-size", value);
          _.set(style, "height", "var(--icon-size)");
        } else {
          _.set(style, "fontSize", value);
        }
      }
      return createElement(content, { style, "class": className }, slots);
    }
  }
});