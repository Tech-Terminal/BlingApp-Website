<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { reactiveOmit } from "@vueuse/core";
import { useForwardProps } from "reka-ui";
import { computed } from "vue";
import { useVueOTPContext } from "vue-input-otp";
import { cn } from "@/lib/utils";

const props = defineProps<{ index: number; class?: HTMLAttributes["class"] }>();

const delegatedProps = reactiveOmit(props, "class");

const forwarded = useForwardProps(delegatedProps);

const context = useVueOTPContext();

const slot = computed(() => context?.value.slots[props.index]);
</script>

<template>
  <div
    v-bind="forwarded"
    data-slot="input-otp-slot"
    :data-active="slot?.isActive"
    :class="
      cn(
        'border-input-border-default border-(length:--border-input) relative flex size-12 items-center justify-center text-sm shadow-xs transition-all outline-none rounded-full',
        'data-[active=true]:border-input-border-focused data-[active=true]:ring-shades-primary-1 data-[active=true]:aria-invalid:ring-shades-danger-1 data-[active=true]:ring-3 data-[active=true]:z-10',
        'aria-invalid:border-input-border-error  data-[active=true]:aria-invalid:border-input-border-error',
        !slot?.char && 'text-input-text-placeholder',
        props.class,
      )
    "
  >
    {{ slot?.char ?? slot?.placeholderChar }}
    <div
      v-if="slot?.hasFakeCaret"
      class="pointer-events-none absolute inset-0 flex items-center justify-center"
    >
      <div
        class="animate-caret-blink bg-input-text-value h-4 w-px duration-1000"
      />
    </div>
  </div>
</template>
