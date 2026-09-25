<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { AvatarRoot } from "reka-ui";
import { cn } from "@/lib/utils";
import AvatarImage from "./AvatarImage.vue";
import AvatarFallback from "./AvatarFallback.vue";

const props = defineProps<{
  class?: HTMLAttributes["class"];
  src: string | null | undefined;
  fallback: string;
}>();

const resolvedFallback = computed(() => {
  if (!props.fallback) return "BG";

  const initials = props.fallback
    .split(" ")
    .slice(0, 2)
    .map((name) => name[0])
    .join("");
  return initials;
});
</script>

<template>
  <AvatarRoot
    data-slot="avatar"
    :class="
      cn(
        'relative flex size-12 shrink-0 overflow-hidden rounded-full',
        props.class,
      )
    "
  >
    <AvatarImage v-if="src" :src="src" :alt="fallback" />
    <AvatarFallback>{{ resolvedFallback }}</AvatarFallback>
  </AvatarRoot>
</template>
