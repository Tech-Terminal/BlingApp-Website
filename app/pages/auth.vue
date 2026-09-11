<script setup lang="ts"></script>
<template>
  <div class="grid md:grid-cols-[1fr_1.6fr]">
    <div class="relative">
      <NuxtImg
        src="/images/auth-bg.png"
        role="presentation"
        class="w-full h-full object-cover object-center max-h-svh"
      />
      <div
        class="absolute top-0 flex flex-col items-center justify-center gap-6 w-full"
      >
        <AppLogo />
        <h1 class="font-semi-bold text-4xl text-txt-base">
          {{ $t("auth.title") }}
        </h1>
        <p class="text-txt-base">{{ $t("auth.description") }}</p>
      </div>
    </div>
    <main>
      <NuxtImg src="/images/wave.png" role="presentation" />
      <NuxtPage />
    </main>
  </div>
</template>
