<script setup lang="ts">
definePageMeta({
  path: "/",
});

const { getImage } = useImage();
const background = getImage("/images/hero-bg.webp");
useHead({
  link: [
    {
      rel: "preload",
      as: "image",
      href: background.url,
    },
  ],
});
</script>
<template>
  <section
    class="min-h-svh bg-cover bg-top bg-no-repeat"
    :style="{
      backgroundImage: `url('${background.url}')`,
    }"
  >
    landing
  </section>
</template>
