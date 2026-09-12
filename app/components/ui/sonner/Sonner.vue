<script lang="ts" setup>
import type { ToasterProps } from "vue-sonner";
import { Toaster as Sonner } from "vue-sonner";
import { cn } from "@/lib/utils";
import { toastLayoutClass } from ".";

const props = defineProps<ToasterProps>();

const { localeProperties, defaultDirection } = useI18n();
</script>

<template>
  <Sonner
    v-bind="props"
    :class="cn('toaster group font-default', props.class)"
    position="top-center"
    :dir="props.dir ?? localeProperties.dir ?? defaultDirection"
    :close-button="props.closeButton ?? true"
    :gap="props.gap ?? 12"
    :toast-options="
      props.toastOptions ?? {
        unstyled: true,
        closeButton: true,
        classes: {
          toast: toastLayoutClass,
          title: 'text-(--toast-text)',
          description: 'text-xs font-normal text-(--toast-caption)',
          content: 'flex min-w-0 flex-1 flex-col gap-0.5',
          closeButton:
            'order-last ms-auto flex size-5 shrink-0 items-center justify-center rounded-full text-(--toast-icon) hover:bg-bg-disabled',
          actionButton:
            'ms-auto shrink-0 rounded-md px-2 py-1 text-xs font-medium text-(--toast-text)',
          cancelButton:
            'shrink-0 rounded-md px-2 py-1 text-xs font-medium text-(--toast-caption)',
        },
      }
    "
    :style="{
      '--toast-bg': 'var(--color-bg-modal)',
      '--toast-text': 'var(--color-txt-default)',
      '--toast-caption': 'var(--color-txt-caption)',
      '--toast-border': 'var(--color-border-default)',
      '--toast-icon': 'var(--color-icons-default)',
      ...props.style,
    }"
  >
    <template #close-icon>
      <Icon name="hugeicons:cancel-01" :size="16" />
    </template>
  </Sonner>
</template>
