require('ts-node').register({
  compilerOptions: {
    module: "ESNext"
  }
});
const path = require("path");
const script = require("@ue/i18n/script");

console.log(script);

// const langs = path.resolve(__dirname, "..", "src/langs/language.ts");

// try {
//   const src = script.Export(langs, "G:/temp/components.xlsx");
//   console.log(`export file = %s.`, src);
// } catch (error) {
//   console.log(error);
// }

