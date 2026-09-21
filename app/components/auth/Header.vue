<script setup lang="ts">
import Button from "~/components/ui/button/Button.vue";

defineProps<{
  title: string;
  description: string;
  showBackBtn?: boolean;
}>();

const emit = defineEmits<{
  back: [];
}>();
</script>
<template>
  <header class="flex flex-col gap-4">
    <Button
      v-if="showBackBtn"
      type="button"
      icon="heroicons:arrow-left"
      size="icon-lg"
      variant="ghost"
      class="rtl:rotate-180"
      :aria-label="$t('back')"
      @click="emit('back')"
    />
    <h2 class="text-2xl font-bold md:text-4xl">{{ $t(title) }}</h2>
    <p class="text-txt-caption md:text-xl">
      <slot name="description">{{ $t(description) }}</slot>
    </p>
  </header>
</template>
