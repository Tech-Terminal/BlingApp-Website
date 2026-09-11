<script setup lang="ts">
defineProps<{
  title: string;
  description: string;
}>();
</script>
<template>
  <header class="flex flex-col gap-4">
    <h1 class="text-2xl md:text-4xl font-bold">{{ title }}</h1>
    <p class="text-txt-caption md:text-xl">{{ description }}</p>
  </header>
</template>
