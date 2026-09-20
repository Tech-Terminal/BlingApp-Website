<template>
  <div class="flex min-h-svh">
    <aside
      class="flex w-56 shrink-0 flex-col gap-4 border-e border-border-default p-4"
    >
      <NuxtLinkLocale to="/" class="text-sm font-medium">Bling</NuxtLinkLocale>
      <nav class="flex flex-col gap-1">
        <NuxtLinkLocale
          to="/playground"
          class="rounded-md px-2 py-1.5 text-sm"
          active-class=""
          exact-active-class="bg-shades-primary-1 text-txt-primary"
        >
          Overview
        </NuxtLinkLocale>
        <NuxtLinkLocale
          v-for="page in playgroundPages"
          :key="page.to"
          :to="page.to"
          class="rounded-md px-2 py-1.5 text-sm"
          active-class="bg-shades-primary-1 text-txt-primary"
        >
          {{ page.label }}
        </NuxtLinkLocale>
      </nav>
    </aside>
    <div class="min-w-0 flex-1 p-8">
      <NuxtPage />
    </div>
  </div>
</template>
