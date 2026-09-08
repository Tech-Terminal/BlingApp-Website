import { applyYupLocale } from "~/utils/yup-locale";

export default defineNuxtPlugin({
  name: "yup-locale",
  enforce: "post",
  setup(): void {
    const { $ts } = useI18n();
    applyYupLocale($ts);
  },
});
