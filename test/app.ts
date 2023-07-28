/**
 * @file test
 * @author theresia@eci.com
 */
import "./http/index"
import Demo from "./demo.vue";
import { createApp as create } from "vue";
// 引入 tailwindcss
import "virtual:windi.css";
import "./tailwind.css";

import "ant-design-vue/dist/antd.css";

import "@ue/modal/dist/index.css";
import "@ue/upload/dist/index.css";

import type { App } from "vue";

function App() {
  const app: App = create(Demo);
  app.mount("#app");;
}

setTimeout(App);