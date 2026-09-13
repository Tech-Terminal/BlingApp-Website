<script setup lang="ts">
const INTRINSIC_WIDTH = 216;
const INTRINSIC_HEIGHT = 107;
const ASPECT_RATIO = INTRINSIC_WIDTH / INTRINSIC_HEIGHT;

const props = withDefaults(
  defineProps<{
    width?: number;
    height?: number;
    alt?: string;
    to?: string;
    preload?: boolean;
  }>(),
  {
    alt: "Bling",
    preload: false,
  },
);

const resolvedWidth = computed(() => {
  if (props.width) {
    return props.width;
  }

  if (props.height) {
    return Math.round(props.height * ASPECT_RATIO);
  }

  return INTRINSIC_WIDTH;
});

const resolvedHeight = computed(() => {
  if (props.height) {
    return props.height;
  }

  if (props.width) {
    return Math.round(props.width / ASPECT_RATIO);
  }

  return INTRINSIC_HEIGHT;
});

const imageProps = computed(() => ({
  src: "/images/logo.png",
  alt: props.alt,
  width: resolvedWidth.value,
  height: resolvedHeight.value,
  densities: "x1 x2",
  preload: props.preload,
  format: "webp",
  class: "h-auto max-w-full",
}));
</script>

<template>
  <NuxtLink v-if="to" :to="to" :aria-label="alt" class="inline-flex shrink-0">
    <NuxtImg v-bind="imageProps" />
  </NuxtLink>
  <NuxtImg v-else v-bind="imageProps" />
</template>
