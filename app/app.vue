<script setup lang="ts">
import "vue-sonner/style.css";
import { Toaster } from "@/components/ui/sonner";

type AppLocale = {
  code: string;
  language?: string;
  dir?: "ltr" | "rtl" | "auto";
};

const { locale, locales } = useI18n();

const currentLocale = computed(() =>
  (locales.value as AppLocale[]).find((item) => item.code === locale.value),
);

useHead({
  htmlAttrs: {
    lang: () => currentLocale.value?.language ?? "ar-KW",
    dir: () => currentLocale.value?.dir ?? "rtl",
  },
  titleTemplate: (title?: string) => (title ? `${title} - Bling` : "Bling"),
});
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <Toaster />
  </div>
</template>
