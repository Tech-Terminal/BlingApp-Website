import { applyYupLocale } from "~/utils/yup-locale";

export default defineNuxtPlugin({
  name: "yup-locale",
  dependsOn: ["i18n:plugin"],
  setup(nuxtApp): void {
    const { t } = nuxtApp.$i18n;
    applyYupLocale((key, params) =>
      params === undefined ? String(t(key)) : String(t(key, params)),
    );
  },
});
