<script setup lang="ts">
defineProps<{
  id: string;
}>();

const emit = defineEmits<{
  (e: "submit"): void;
}>();
</script>
<template>
  <form :id="id" @submit.prevent="emit('submit')">
    <slot />
  </form>
</template>
