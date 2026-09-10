<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { useVModel } from "@vueuse/core";
import { cn } from "@/lib/utils";

defineOptions({ inheritAttrs: false });

const props = defineProps<{
  defaultValue?: string | number;
  modelValue?: string | number;
  class?: HTMLAttributes["class"];
  prefixIcon?: string;
  suffixIcon?: string;
  loading?: boolean;
  disabled?: boolean;
}>();

const emits = defineEmits<{
  (e: "update:modelValue", payload: string | number): void;
}>();

const modelValue = useVModel(props, "modelValue", emits, {
  passive: true,
  defaultValue: props.defaultValue,
});

const resolvedDisabled = computed(() => props.loading || props.disabled);

const showPrefixIcon = computed(() => Boolean(props.prefixIcon));

const showSuffixIcon = computed(
  () => !props.loading && Boolean(props.suffixIcon),
);

const iconSize = 20;
</script>

<template>
  <div :class="cn('group relative w-full', props.class)">
    <Icon
      v-if="showPrefixIcon"
      data-slot="input-prefix"
      :name="prefixIcon as string"
      :size="iconSize"
      :class="
        cn(
          'pointer-events-none absolute inset-s-(--padding-input-x) top-1/2 -translate-y-1/2 text-txt-placeholder',
          'group-focus-within:text-input-icon-focused',
          'group-has-aria-invalid:text-input-icon-error',
          'group-has-disabled:text-input-icon-disabled',
        )
      "
    />
    <input
      v-model="modelValue"
      v-bind="$attrs"
      data-slot="input"
      :disabled="resolvedDisabled"
      :class="
        cn(
          'h-input w-full min-w-0 rounded-input border-(length:--border-input) bg-bg-bg px-input-x py-input-y text-sm text-input-text-value outline-none transition-colors',
          'border-input-border-default placeholder:text-input-text-placeholder',
          'file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-input-text-value',
          'enabled:not-read-only:hover:border-border-primary',
          'enabled:not-read-only:focus:border-input-border-focused enabled:not-read-only:focus:ring-shades-primary-1 enabled:not-read-only:focus:ring-3',
          'enabled:not-read-only:focus-visible:border-input-border-focused enabled:not-read-only:focus-visible:ring-shades-primary-1',
          'read-only:cursor-default read-only:bg-btn-default-default',
          'disabled:cursor-not-allowed disabled:border-input-border-disabled disabled:bg-input-bg-disabled disabled:text-input-text-disabled disabled:placeholder:text-input-text-disabled',
          'aria-invalid:border-input-border-error aria-invalid:text-input-text-error',
          'aria-invalid:hover:border-input-border-error aria-invalid:focus:border-input-border-error aria-invalid:focus:ring-shades-danger-1 aria-invalid:focus-visible:ring-shades-danger-1 ',
          showPrefixIcon &&
            'ps-[calc(var(--padding-input-x)+var(--size-5)+var(--gap-input))]',
          (showSuffixIcon || loading) &&
            'pe-[calc(var(--padding-input-x)+var(--size-5)+var(--gap-input))]',
        )
      "
    />
    <Icon
      v-if="loading"
      data-slot="input-loading"
      name="app:loading"
      :size="iconSize"
      :class="
        cn(
          'pointer-events-none absolute inset-e-(--padding-input-x) top-1/2 -translate-y-1/2 animate-spin text-txt-placeholder',
          'group-has-disabled:text-input-icon-disabled',
        )
      "
    />
    <Icon
      v-else-if="showSuffixIcon"
      data-slot="input-suffix"
      :name="suffixIcon as string"
      :size="iconSize"
      :class="
        cn(
          'pointer-events-none absolute inset-e-(--padding-input-x) top-1/2 -translate-y-1/2 text-txt-placeholder',
          'group-focus-within:text-input-icon-focused',
          'group-has-aria-invalid:text-input-icon-error',
          'group-has-disabled:text-input-icon-disabled',
        )
      "
    />
  </div>
</template>
