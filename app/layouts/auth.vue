<template>
  <div class="grid h-svh md:grid-cols-2">
    <div class="relative h-full overflow-hidden">
      <NuxtImg
        src="/images/auth-bg.png"
        role="presentation"
        class="h-full w-full object-cover object-top"
        preload
      />
      <div
        class="absolute top-0 mt-10 flex w-full flex-col items-center justify-center gap-6 max-md:row-span-2 md:mt-20"
      >
        <AppLogo class="w-40" />
        <div class="space-y-4 text-center md:space-y-6">
          <h1 class="text-2xl font-semibold text-txt-base md:text-4xl">
            {{ $t("auth.title") }}
          </h1>
          <p class="text-txt-base">{{ $t("auth.description") }}</p>
        </div>
      </div>
    </div>
    <main
      :class="[
        'md:content-center',
        'rounded-t-3xl bg-bg-bg',
        'inset-x-0 bottom-0 max-md:absolute max-md:top-64',
      ]"
    >
      <NuxtImg
        src="/images/wave.png"
        role="presentation"
        class="absolute inset-e-0 top-0 ms-auto w-sm object-contain object-center max-md:hidden ltr:rotate-y-180"
      />
      <section class="mx-auto max-w-xl space-y-6 p-6 md:space-y-10">
        <NuxtPage />
      </section>
    </main>
  </div>
</template>
