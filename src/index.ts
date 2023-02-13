/**
 * @file 公共组件
 * @author svon.me@gmail.com
 */


import lib from "./lib/index";
import Pic from "./components/icon/pic.vue";
import Enum from "./components/enum/index.vue";
import Alert from "./components/alert/index.vue";
import Operate from "./components/operate/index.vue";
export { IconExpand } from "./components/icon/expand";

export { default as Icon } from "./components/icon";
export { default as Link } from "./components/link";
export { default as Time } from "./components/time";

export { Enum, Pic,Alert,Operate };

export default lib;