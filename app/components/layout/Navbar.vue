<template>
  <nav
    class="fixed inset-x-0 top-6 z-50 mx-auto flex w-full max-w-11/12 justify-between rounded-full bg-bg-bg/5 px-20 py-5 shadow-edge-light backdrop-blur-xs"
  >
    <AppLogo class="h-12 max-w-24" />
    <ul class="self-center">
      <li></li>
    </ul>
    <div class="space-x-4 self-end">
      <LayoutLangSwitcher />
      <UiButton :label="$t('login.trigger')" size="lg" color="primary" />
    </div>
  </nav>
</template>

<script setup lang="ts"></script>
