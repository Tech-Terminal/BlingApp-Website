<script setup lang="ts">
useHead({
  title: "Playground",
});
</script>

<template>
  <div class="flex flex-col gap-4">
    <h1 class="text-xl font-medium">Playground</h1>
    <p dir="ltr" class="text-txt-caption">
      Isolated pages for trying out UI components without touching the app
      shell.
    </p>
    <div class="flex flex-wrap gap-3">
      <NuxtLink
        v-for="page in playgroundPages"
        :key="page.to"
        :to="page.to"
        class="w-fit rounded-md border border-border-default px-3 py-2 text-sm"
      >
        {{ page.label }}
      </NuxtLink>
    </div>
  </div>
</template>
