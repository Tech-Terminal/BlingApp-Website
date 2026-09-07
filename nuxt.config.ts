import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxt/eslint"],
  css: ["~/assets/css/index.css"],
  vite: {
    plugins: [tailwindcss()],
  },
});
