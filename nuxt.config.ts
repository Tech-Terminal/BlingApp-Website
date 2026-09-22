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
    "@nuxtjs/i18n",
    "shadcn-nuxt",
    "@nuxt/icon",
    "nuxt-spyglass",
  ],
  css: ["~/assets/css/index.css"],
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
    defaults: {
      weights: [400, 500, 600, 700],
      styles: ["normal"],
      subsets: ["arabic", "latin", "latin-ext"],
    },
    families: [
      {
        name: "IBM Plex Sans Arabic",
        provider: "google",
        fallbacks: ["sans-serif"],
        global: true,
        preload: true,
      },
      {
        name: "Twemoji Country Flags",
        provider: "none",
        global: true,
        preload: true,
      },
    ],
  },
  i18n: {
    locales: [
      { code: "en", language: "en-US", dir: "ltr", file: "en.json" },
      { code: "ar", language: "ar-KW", dir: "rtl", file: "ar.json" },
    ],
    defaultLocale: "ar",
    defaultDirection: "rtl",
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected",
      redirectOn: "root",
    },
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
  image: {
    format: ["webp"],
  },
  runtimeConfig: {
    backendBase: "",
    public: {
      apiBase: "/api",
    },
  },
  spyglass: {
    enabled: true,
    logFile: ".data/spyglass/logs.ndjson",
    maxFileSize: 5 * 1024 * 1024,
    mcpHint: true,
  },
});
