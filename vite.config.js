import path from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import jsx from "@vitejs/plugin-vue-jsx";

export default defineConfig({
  resolve: {
    extensions: [".ts", ".vue", ".js", ".tsx"],
    alias: {
      "src/": `${path.resolve(__dirname, "src")}/`,
      "test/": `${path.resolve(__dirname, "test")}/`,
      "types/": `${path.resolve(__dirname, "types")}/`,
    },
  },
  plugins: [vue(), jsx()],
  build: {
    target: "modules",
    polyfillModulePreload: false,
    lib: {
      entry: "src/index",
      name: "components",
      formats: ["es"],
      fileName: "components"
    },
    sourcemap: true,
    manifest: false,
    rollupOptions: {
      external: [
        /lodash/i,
        /^vue/i,
        /vue-router/i,
        /@ue/i,
        /@eci/i,
        /ali-oss/i,
        /ant-design-vue/i,
        /@ant-design\/icons-vue/i,
        /@fengqiaogang/,
        /@fengqiaogang/,
        /@js-lion\/api/i,
        /@ui\/model/i,
      ],
      output: {
        inlineDynamicImports: true
      }
    }
  },
  server: {
    port: 3000,
    host: "0.0.0.0",
    https: false,
    hmr: {
      protocol: 'ws',
      host: '127.0.0.1',
      port: 3000,
    },
    proxy: {
      // "/tbms-task": {
      //   target: "http://192.168.15.203:8091",
      //   changeOrigin: true,
      //   rewrite: (path) => path.replace(/^\/tbms-task/, '')
      // },
    }
  },
})
