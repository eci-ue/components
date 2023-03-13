import path from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import jsx from "@vitejs/plugin-vue-jsx";
import WindCSS from "vite-plugin-windicss";

export default defineConfig({
  resolve: {
    extensions: [".ts", ".vue", ".js", ".tsx"],
    alias: {
      "src/": `${path.resolve(__dirname, "src")}/`,
      "test/": `${path.resolve(__dirname, "test")}/`,
      "types/": `${path.resolve(__dirname, "types")}/`,
    },
  },
  css: {
    preprocessorOptions: {
      css: {
        charset: false
      },
      scss: {}
    }
  },
  plugins: [vue(), jsx(), WindCSS()],
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
        /^lodash/i,
        /^bignumber/i,
        /^vue/i,
        /ali-oss/i,
        /ant-design/i,
        /@ue\//i,
        /@fengqiaogang/,
        /@js-lion\/api/i,
        /url-pattern/i,
      ],
      output: {
        inlineDynamicImports: true
      }
    }
  },
  server: {
    port: 8080,
    host: "0.0.0.0",
    https: false,
    hmr: {
      protocol: 'ws',
      host: '127.0.0.1',
      port: 8080,
    },
    proxy: {
      "/fssyweb": {
        target: "http://fssyweb.eciol-test.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/fssyweb/, '')
      },
    }
  },
})
