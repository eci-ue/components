
const path = require("path");
const style = require("@ue/style");

const tailWind = require("@ue/style/src/tailwind.cjs");

const src = path.join(__dirname, "../node_modules", "@ue/style/style/variables.less");

const colors = style(src);

const config = tailWind(colors);

module.exports = config;