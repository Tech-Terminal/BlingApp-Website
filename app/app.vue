<script setup lang="ts">
useHead({
  titleTemplate: (title) => (title ? `${title} - Bling` : "Bling"),
});
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <header class="bg-black p-4">
      <AppLogo to="/" preload />
    </header>
  </div>
</template>
