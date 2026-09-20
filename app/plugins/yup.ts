import { applyYupLocale, type Translate } from "./yup/locale";
import { applyYupMethods } from "./yup/methods";

export default defineNuxtPlugin({
  name: "yup",
  dependsOn: ["i18n:plugin"],
  setup(nuxtApp): void {
    const { t } = nuxtApp.$i18n;
    const translate: Translate = (key, params) =>
      params === undefined ? String(t(key)) : String(t(key, params));

    applyYupLocale(translate);
    applyYupMethods(translate);
  },
});
