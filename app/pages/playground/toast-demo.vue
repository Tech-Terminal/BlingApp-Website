<script setup lang="ts">
import type { ToastVariants } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";

useHead({
  title: "Toast",
});

const colors: NonNullable<ToastVariants["color"]>[] = [
  "default",
  "primary",
  "success",
  "danger",
  "warning",
  "info",
];

const showColorToast = (color: NonNullable<ToastVariants["color"]>) => {
  toast[color](`${color} toast`, {
    description: "Same chrome, design-system color tokens.",
    duration: 8000,
  });
};

const showPrimaryAction = () => {
  toast.primary("Saved", {
    description: "Your changes were written.",
    action: { label: "Undo", onClick: () => toast.default("Undone") },
  });
};

const showDangerAction = () => {
  toast.error("Could not send code", {
    description: "Check the number and try again.",
    action: {
      label: "Retry",
      onClick: () => toast.info("Retrying…"),
    },
  });
};
</script>

<template>
  <main class="flex flex-col gap-8">
    <h1 class="text-xl font-medium">Toast</h1>

    <section class="flex flex-col gap-3">
      <h2 class="text-sm font-medium">Colors</h2>
      <div class="flex flex-wrap items-center gap-3">
        <Button
          v-for="color in colors"
          :key="color"
          :color="color"
          :label="color"
          @click="showColorToast(color)"
        />
      </div>
    </section>

    <section class="flex flex-col gap-3">
      <h2 class="text-sm font-medium">With action</h2>
      <div class="flex flex-wrap items-center gap-3">
        <Button
          color="primary"
          label="Primary + action"
          @click="showPrimaryAction"
        />
        <Button
          color="danger"
          label="Danger + action"
          @click="showDangerAction"
        />
      </div>
    </section>
  </main>
</template>
