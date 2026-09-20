<script setup lang="ts">
import type { PrimitiveProps } from "reka-ui";
import type { HTMLAttributes } from "vue";
import type { ButtonVariants } from ".";
import { Primitive } from "reka-ui";
import { cn } from "@/lib/utils";
import { buttonVariants } from ".";
import type { RouteLocationRaw } from "vue-router";
import { NuxtLinkLocale } from "#components";

interface Props extends PrimitiveProps {
  variant?: ButtonVariants["variant"];
  color?: ButtonVariants["color"];
  size?: ButtonVariants["size"];
  class?: HTMLAttributes["class"];
  icon?: string;
  prefixIcon?: string;
  suffixIcon?: string;
  label?: string;
  disabled?: boolean;
  loading?: boolean;

  // link props
  to?: RouteLocationRaw;
}

const props = withDefaults(defineProps<Props>(), {
  as: "button",
});

const resolvedDisabled = computed(() => props.loading || props.disabled);

const showPrefixIcon = computed(
  () => !props.loading && (props.prefixIcon || props.icon),
);

const showSuffixIcon = computed(() => !props.loading && props.suffixIcon);

const iconSize = computed(() => {
  const sizes: Record<NonNullable<ButtonVariants["size"]>, number> = {
    xs: 16,
    default: 24,
    sm: 14,
    lg: 24,
    icon: 16,
    "icon-xs": 16,
    "icon-sm": 20,
    "icon-lg": 24,
  };
  return sizes[props.size ?? "default"];
});
</script>

<template>
  <Primitive
    data-slot="button"
    :data-variant="variant"
    :data-color="color"
    :data-size="size"
    :disabled="resolvedDisabled"
    :as="to ? NuxtLinkLocale : as"
    :to="to"
    :as-child="asChild"
    :class="cn(buttonVariants({ variant, color, size }), props.class)"
  >
    <Icon
      v-if="showPrefixIcon"
      :name="(prefixIcon || icon) as string"
      :size="iconSize"
    />
    <Icon
      v-if="loading"
      name="app:loading"
      class="animate-spin"
      :size="iconSize"
    />
    <span v-if="label" class="line-clamp-1 truncate text-nowrap">
      <slot>
        {{ label }}
      </slot>
    </span>
    <Icon v-if="showSuffixIcon" :name="suffixIcon as string" :size="iconSize" />
  </Primitive>
</template>
