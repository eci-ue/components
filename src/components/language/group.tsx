import _ from "lodash-es";
import Pairs from "./pairs.vue";
import { Badge } from "ant-design-vue";
import { PropType, defineComponent, h as createElement } from "vue";

import type { LanguagePairsData } from "./props";

export default defineComponent({
  props: {
    list: {
      type: Array as PropType<LanguagePairsData[]>,
      default: () => []
    },
    itemClass: {
      type: [String, Array] as PropType<string | string[]>,
      default: () => ["mt-2.5", "first:mt-0"]
    },
    // 显示第一个，其余的悬浮显示
    more: {
      type: Boolean,
      default: false
    },
    // 是否显示语言对名称，默认显示
    showName: {
      type: Boolean,
      default: true
    }
  },
  setup(props, { slots }) {
    return () => {
      if (props.more) {
        const [value, ...array] = props.list;
        const attr = { ...value, showName: props.showName };
        if (_.size(array) > 0) {
          const style = { backgroundColor: `#C9DFFC`, color: `#648ABC` };
          const slot = (<Badge count={ _.size(array) + 1 } numberStyle={ style }></Badge>);
          return createElement(Pairs, attr, slot);
        }
        return createElement(Pairs, attr);
      }
      return (<div>
        {
          _.map(props.list, function(item: LanguagePairsData) {
            const attr = { ...item, showName: props.showName };
            const slot = slots.default ? slots.default({ data: item }) : void 0;
            return (<div class={ props.itemClass }>
              { createElement(Pairs, attr, slot) }
            </div>);
          })
        }
      </div>);
    }
  }
});