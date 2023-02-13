/**
 * @file test
 * @author theresia@eci.com
 */
import "./http/index"
import Demo from "./demo.vue";
import { createApp as create } from "vue";
import "@ue/model/dist/index.css";

import "ant-design-vue/dist/antd.css";

import type { App } from "vue";

function App() {
  const app: App = create(Demo);
  app.mount("#app");;
}

setTimeout(App);