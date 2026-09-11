<script setup lang="ts">
defineProps<{
  id: string;
}>();

const emit = defineEmits<{
  (e: "submit"): void;
}>();
</script>
<template>
  <form :id="id" novalidate @submit.prevent="emit('submit')">
    <slot />
  </form>
</template>
