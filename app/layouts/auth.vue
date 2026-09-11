<script setup lang="ts">
import AuthHeader from "./components/AuthHeader.vue";

defineProps<{
  title: string;
  description: string;
}>();
</script>
<template>
  <div class="grid md:grid-cols-2 h-svh">
    <div class="relative h-full overflow-hidden">
      <NuxtImg
        src="/images/auth-bg.png"
        role="presentation"
        class="w-full h-full object-cover object-top"
        preload
      />
      <div
        class="absolute top-0 flex flex-col items-center justify-center gap-6 w-full md:mt-20 mt-10"
      >
        <AppLogo />
        <div class="space-y-4 md:space-y-6 text-center">
          <h1 class="font-semi-bold md:text-4xl text-2xl text-txt-base">
            {{ $t("auth.title") }}
          </h1>
          <p class="text-txt-base">{{ $t("auth.description") }}</p>
        </div>
      </div>
    </div>
    <main
      :class="[
        'content-center',
        'max-md:absolute max-md:bottom-0 max-md:inset-x-0 max-md:w-full max-md:bg-bg-bg max-md:rounded-t-3xl',
      ]"
    >
      <NuxtImg
        src="/images/wave.png"
        role="presentation"
        class="w-sm object-center object-contain ms-auto max-md:hidden absolute top-0 inset-e-0 ltr:rotate-y-180"
      />
      <section class="p-6 max-w-xl mx-auto space-y-6 md:space-y-10">
        <AuthHeader :title="$t(title)" :description="$t(description)" />
        <NuxtPage />
      </section>
    </main>
  </div>
</template>
