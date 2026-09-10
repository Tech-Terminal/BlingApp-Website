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

const slots = useSlots();

const modelValue = useVModel(props, "modelValue", emits, {
  passive: true,
  defaultValue: props.defaultValue,
});

const showPrefixIcon = computed(
  () => !slots.prefix && Boolean(props.prefixIcon),
);

const showSuffixIcon = computed(
  () => !slots.suffix && Boolean(props.suffixIcon),
);

const iconSize = 20;
</script>

<template>
  <div
    :class="
      cn(
        'group relative flex h-input w-full min-w-0 items-center gap-input rounded-input border-(length:--border-input) bg-bg-bg px-input-x py-input-y text-sm text-input-text-value outline-none transition-colors',
        'border-input-border-default',
        'has-enabled:not-has-[input:read-only]:hover:border-border-primary',
        'has-enabled:not-has-[input:read-only]:focus-within:border-input-border-focused has-enabled:not-has-[input:read-only]:focus-within:ring-3 has-enabled:not-has-[input:read-only]:focus-within:ring-shades-primary-1',
        'has-[input:read-only]:bg-btn-default-default',
        'has-disabled:cursor-not-allowed has-disabled:border-input-border-disabled has-disabled:bg-input-bg-disabled has-disabled:text-input-text-disabled',
        'has-aria-invalid:border-input-border-error has-aria-invalid:text-input-text-error',
        'has-aria-invalid:hover:border-input-border-error has-aria-invalid:focus-within:border-input-border-error has-aria-invalid:focus-within:ring-shades-danger-1',
        props.class,
      )
    "
  >
    <slot name="prefix">
      <Icon
        v-if="showPrefixIcon"
        data-slot="input-prefix"
        :name="prefixIcon as string"
        :size="iconSize"
        :class="
          cn(
            'pointer-events-none shrink-0 text-txt-placeholder',
            'group-focus-within:text-input-icon-focused',
            'group-has-aria-invalid:text-input-icon-error',
            'group-has-disabled:text-input-icon-disabled',
          )
        "
      />
    </slot>
    <input
      v-bind="$attrs"
      v-model="modelValue"
      data-slot="input"
      :disabled="props.disabled"
      :class="
        cn(
          'h-full min-w-0 flex-1 bg-transparent p-0 text-sm text-input-text-value outline-none',
          'placeholder:text-input-text-placeholder',
          'file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-input-text-value',
          'read-only:cursor-default',
          'disabled:cursor-not-allowed disabled:text-input-text-disabled disabled:placeholder:text-input-text-disabled',
          'aria-invalid:text-input-text-error',
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
          'pointer-events-none shrink-0 animate-spin text-txt-placeholder',
          'group-has-disabled:text-input-icon-disabled',
        )
      "
    />
    <slot name="suffix">
      <Icon
        v-if="showSuffixIcon"
        data-slot="input-suffix"
        :name="suffixIcon as string"
        :size="iconSize"
        :class="
          cn(
            'pointer-events-none shrink-0 text-txt-placeholder',
            'group-focus-within:text-input-icon-focused',
            'group-has-aria-invalid:text-input-icon-error',
            'group-has-disabled:text-input-icon-disabled',
          )
        "
      />
    </slot>
  </div>
</template>
