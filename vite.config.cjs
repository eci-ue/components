import path from "path";
import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import jsx from "@vitejs/plugin-vue-jsx";
import WindCSS from "vite-plugin-windicss";
import safeGet from "@fengqiaogang/safe-get";

const style = require("@ue/style");
const modifyVars = style(path.join(__dirname, "node_modules", "@ue/style/style/antd.less"));

const SassVariables = [];

for(const key of Object.keys(modifyVars)) {
  const value = `${key}: ${modifyVars[key]}`;
  SassVariables.push('$' + value + ';');
}

export default defineConfig(function({ mode }) {
  const envDir = path.resolve(__dirname, "src/config");
  const env = loadEnv(mode, envDir);
  return {
    envDir: envDir,
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
        scss: {
          additionalData: SassVariables.join("\n"),
        }
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
          /^axios/i,
          /^uuid/i,
          /ali-oss/i,
          /ant-design/i,
          /@ue/i,
          /@fengqiaogang/,
          /@js-lion/i,
          /ali-oss/i,
          /url-pattern/i,
          /js-cookie/i,
        ],
        output: {
          inlineDynamicImports: true
        }
      }
    },
    server: {
      port: safeGet(env, "VITE_PORT") || 8080,
      host: "0.0.0.0",
      https: false,
      hmr: {
        protocol: 'ws',
        host: '127.0.0.1',
        port: safeGet(env, "VITE_PORT") || 8080,
      },
    },
  };
});
