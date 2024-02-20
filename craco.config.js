const esbuildPlugin = require("craco-esbuild");

module.exports = {
  style: {
    postcss: {
      mode: "file",
    },
  },
  plugins: [{ plugin: esbuildPlugin }],
};
