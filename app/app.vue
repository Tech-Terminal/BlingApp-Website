<script setup lang="ts">
import { Button, type ButtonVariants } from "@/components/ui/button";

useHead({
  titleTemplate: (title) => (title ? `${title} - Bling` : "Bling"),
});

const variants: NonNullable<ButtonVariants["variant"]>[] = [
  "solid",
  "soft",
  "ghost",
  "outline",
  "dashed",
];

const colors: NonNullable<ButtonVariants["color"]>[] = [
  "default",
  "primary",
  "success",
  "danger",
  "warning",
  "info",
];
const btnSize: NonNullable<ButtonVariants["size"]>[] = [
  "default",
  "xs",
  "sm",
  "lg",
];
const btnIconSize: NonNullable<ButtonVariants["size"]>[] = [
  "icon",
  "icon-xs",
  "icon-sm",
  "icon-lg",
];
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <main class="m-16 flex min-h-svh flex-col gap-8">
      <section v-for="color in colors" :key="color" class="flex flex-col gap-3">
        <h2 class="text-sm font-medium capitalize">{{ color }}</h2>
        <div class="flex flex-wrap items-center gap-3">
          <Button
            v-for="variant in variants"
            :key="`${color}-${variant}`"
            :color="color"
            :variant="variant"
            label="Primary"
          />
        </div>
      </section>
      <section>
        <div class="flex flex-wrap items-center gap-3">
          <Button
            v-for="size in btnSize"
            :key="`primary-${size}`"
            :size="size"
            variant="solid"
            color="primary"
            icon="heroicons:plus-20-solid"
            suffix-icon="heroicons:minus-20-solid"
            :label="size"
          />
        </div>

        <div class="flex flex-wrap items-center gap-3">
          <Button
            v-for="iconSize in btnIconSize"
            :key="`primary-${iconSize}`"
            :size="iconSize"
            variant="solid"
            color="primary"
            icon="heroicons:plus-20-solid"
          />
        </div>
        <Button loading label="Loading" />
        <Button disabled label="Disabled" />
        <Button icon="heroicons--plus-20-solid" loading />
      </section>
    </main>
  </div>
</template>
