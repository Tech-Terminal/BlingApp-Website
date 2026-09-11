<script setup lang="ts">
const { t } = useI18n();
useHead({
  title: () => String(t("login")),
});
</script>
<template>
  <h1>login</h1>
</template>
