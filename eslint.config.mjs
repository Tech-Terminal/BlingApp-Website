// @ts-check
import prettierConfig from "eslint-config-prettier";
import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt(prettierConfig, {
  rules: {
    "vue/require-default-prop": "off",
  },
});
