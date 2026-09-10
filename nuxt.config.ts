import tailwindcss from "@tailwindcss/vite";
import { createResolver } from "nuxt/kit";

const { resolve } = createResolver(import.meta.url);

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: [
    "@nuxt/eslint",
    "@nuxt/image",
    "@nuxt/fonts",
    "nuxt-i18n-micro",
    "shadcn-nuxt",
    "@nuxt/icon",
  ],
  css: ["~/assets/css/index.css"],
  typescript: {
    tsConfig: {
      compilerOptions: {
        moduleResolution: "bundler",
        module: "esnext",
      },
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
  app: {
    head: {
      link: [
        {
          rel: "icon",
          type: "image/png",
          href: "/favicon-96x96.png",
          sizes: "96x96",
        },
        { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
        { rel: "shortcut icon", href: "/favicon.ico" },
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "/apple-touch-icon.png",
        },
        { rel: "manifest", href: "/site.webmanifest" },
      ],
      meta: [
        { name: "apple-mobile-web-app-title", content: "Bling" },
        { name: "color-scheme", content: "light" },
        { name: "theme-color", content: "#ffffff" },
      ],
    },
  },
  fonts: {
    families: [
      {
        name: "IBM Plex Sans Arabic",
        provider: "google",
        weights: [400, 500, 600, 700],
      },
      {
        name: "Twemoji Country Flags",
        provider: "none",
      },
    ],
  },
  i18n: {
    locales: [
      { code: "en", language: "en-US", dir: "ltr", iso: "en-US" },
      { code: "ar", language: "ar-KW", dir: "rtl", iso: "ar-KW" },
    ],
    defaultLocale: "ar",
    fallbackLocale: "ar",
    autoDetectLanguage: false,
    localeCookie: "user-locale",
  },
  icon: {
    mode: "css",
    cssLayer: "base",
    serverBundle: {
      collections: ["hugeicons"], // <!--- this
    },
    customCollections: [
      {
        prefix: "app",
        dir: resolve("./app/assets/icons"),
      },
    ],
  },
});
