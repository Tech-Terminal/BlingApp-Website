<script setup lang="ts">
useHead({
  titleTemplate: (title) => (title ? `${title} - Bling` : "Bling"),
});
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtPage />
  </div>
</template>
