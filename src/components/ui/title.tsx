/**
 * @file Title
 * @author svon.me@gmail.com
 */

import { Divider } from "ant-design-vue";
import { defineComponent, h as createElement } from "vue";

export default defineComponent({
  name: "UiTitle",
  props: {
    /**
     * 标题
     */
    value: {
      type: String,
      required: true,
    },
    /**
     * 是否显示左侧的标签颜色
     */
    leftBorder: {
      type: Boolean,
      default: true
    },
    /**
     * 是否显示分割线
     */
    vertical: {
      type: Boolean,
      default: true
    }
  },
  setup(props, { slots }) {
    return () => {
      let before;
      const className: string[] = ["text-base", "text-black", "text-opacity-85", "font-bold", "leading-5"];
      if (props.leftBorder) {
        className.push("pl-3", "relative", "title");
        before = <i class="h-full absolute left-0 top-0 bg-primary rounded-sm w-1"></i>
      }
      let content: any[] = [];
      if (slots.default) {
        if (props.vertical) {
          content.push(<Divider class="h-[1.2em] border-border-color mx-4 my-0" type="vertical"></Divider>);
        }
        content.push(slots.default());
      }
      const title = typeof props.value === "object" ? createElement(props.value) : createElement("span", null, props.value);
      return (<div class="flex items-center">
        <div class={ className }>{ before }{ title }</div>{ content }
      </div>);
    }
  }
});