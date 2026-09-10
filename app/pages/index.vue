<script setup lang="ts">
useHead({
  title: "Home",
});
</script>

<template>
  <main class="flex min-h-svh flex-col items-center justify-center gap-6 p-8">
    <AppLogo :height="64" />
    <NuxtLink to="/playground" class="text-txt-primary underline">
      Component playground
    </NuxtLink>
  </main>
</template>
