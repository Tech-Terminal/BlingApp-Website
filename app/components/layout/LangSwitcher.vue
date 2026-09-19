<script setup lang="ts">
const { locales, setLocale, locale, defaultLocale } = useI18n();

const switchedLocale = computed(
  () =>
    locales.value.find((l) => l.code !== locale.value)?.code ?? defaultLocale,
);
</script>
<template>
  <button
    class="inline-flex cursor-pointer items-center gap-0.75 rounded-full px-3 py-1 text-lg font-medium text-txt-primary uppercase transition-colors duration-300 hover:bg-bg-primary-subtle"
    @click="setLocale(switchedLocale)"
  >
    <span>
      {{ switchedLocale }}
    </span>
    <Icon name="hugeicons:language-circle" size="20" />
  </button>
</template>
