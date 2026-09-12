import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";

export { default as Button } from "./Button.vue";

export const buttonVariants = cva(
  "focus-visible:border-ring inline-flex shrink-0 items-center justify-center gap-2 rounded-btn font-medium whitespace-nowrap transition-all outline-none focus-visible:ring-3 focus-visible:ring-(--btn-solid-hover)/50 enabled:cursor-pointer disabled:pointer-events-none disabled:opacity-20 aria-invalid:border-border-danger aria-invalid:ring-border-danger/20 dark:aria-invalid:ring-border-danger/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      color: {
        default: [
          "[--btn-solid:var(--color-btn-default-default)]",
          "[--btn-solid-hover:var(--color-btn-default-hovered)]",
          "[--btn-solid-active:var(--color-btn-default-pressed)]",
          "[--btn-solid-focus:var(--color-btn-default-focused)]",
          "[--btn-soft:var(--color-btn-default-default)]",
          "[--btn-soft-hover:var(--color-btn-default-hovered)]",
          "[--btn-soft-active:var(--color-btn-default-pressed)]",
          "[--btn-fg:var(--color-txt-default)]",
          "[--btn-solid-fg:var(--color-btn-default-l-content)]",
          "[--btn-border:var(--color-border-default)]",
          "[--btn-ring:var(--color-border-ring)]",
        ],
        primary: [
          "[--btn-solid:var(--color-btn-primary-default)]",
          "[--btn-solid-hover:var(--color-btn-primary-hovered)]",
          "[--btn-solid-active:var(--color-btn-primary-pressed)]",
          "[--btn-solid-focus:var(--color-btn-primary-focused)]",
          "[--btn-soft:var(--color-shades-primary-1)]",
          "[--btn-soft-hover:var(--color-shades-primary-2)]",
          "[--btn-soft-active:var(--color-shades-primary-3)]",
          "[--btn-fg:var(--color-txt-primary)]",
          "[--btn-solid-fg:var(--color-txt-base)]",
          "[--btn-border:var(--color-btn-primary-default)]",
          "[--btn-ring:var(--color-btn-primary-focused)]",
        ],
        success: [
          "[--btn-solid:var(--color-btn-success-default)]",
          "[--btn-solid-hover:var(--color-btn-success-hovered)]",
          "[--btn-solid-active:var(--color-btn-success-pressed)]",
          "[--btn-solid-focus:var(--color-btn-success-focused)]",
          "[--btn-soft:var(--color-shades-success-1)]",
          "[--btn-soft-hover:var(--color-shades-success-2)]",
          "[--btn-soft-active:var(--color-shades-success-3)]",
          "[--btn-fg:var(--color-txt-success)]",
          "[--btn-solid-fg:var(--color-txt-base)]",
          "[--btn-border:var(--color-btn-success-default)]",
          "[--btn-ring:var(--color-btn-success-focused)]",
        ],
        danger: [
          "[--btn-solid:var(--color-btn-danger-default)]",
          "[--btn-solid-hover:var(--color-btn-danger-hovered)]",
          "[--btn-solid-active:var(--color-btn-danger-pressed)]",
          "[--btn-solid-focus:var(--color-btn-danger-focused)]",
          "[--btn-soft:var(--color-shades-danger-1)]",
          "[--btn-soft-hover:var(--color-shades-danger-2)]",
          "[--btn-soft-active:var(--color-shades-danger-3)]",
          "[--btn-fg:var(--color-txt-danger)]",
          "[--btn-solid-fg:var(--color-txt-base)]",
          "[--btn-border:var(--color-btn-danger-default)]",
          "[--btn-ring:var(--color-btn-danger-focused)]",
        ],
        warning: [
          "[--btn-solid:var(--color-btn-warning-default)]",
          "[--btn-solid-hover:var(--color-btn-warning-hovered)]",
          "[--btn-solid-active:var(--color-btn-warning-pressed)]",
          "[--btn-solid-focus:var(--color-btn-warning-focused)]",
          "[--btn-soft:var(--color-shades-warning-1)]",
          "[--btn-soft-hover:var(--color-shades-warning-2)]",
          "[--btn-soft-active:var(--color-shades-warning-3)]",
          "[--btn-fg:var(--color-txt-warning)]",
          "[--btn-solid-fg:var(--color-txt-base)]",
          "[--btn-border:var(--color-btn-warning-default)]",
          "[--btn-ring:var(--color-btn-warning-focused)]",
        ],
        info: [
          "[--btn-solid:var(--color-btn-info-default)]",
          "[--btn-solid-hover:var(--color-btn-info-hovered)]",
          "[--btn-solid-active:var(--color-btn-info-pressed)]",
          "[--btn-solid-focus:var(--color-btn-info-focused)]",
          "[--btn-soft:var(--color-shades-info-1)]",
          "[--btn-soft-hover:var(--color-shades-info-2)]",
          "[--btn-soft-active:var(--color-shades-info-3)]",
          "[--btn-fg:var(--color-txt-info)]",
          "[--btn-solid-fg:var(--color-txt-base)]",
          "[--btn-border:var(--color-btn-info-default)]",
          "[--btn-ring:var(--color-btn-info-focused)]",
        ],
      },
      variant: {
        solid:
          "bg-(--btn-solid) text-(--btn-solid-fg) hover:bg-(--btn-solid-hover) focus-visible:bg-(--btn-solid-focus) active:bg-(--btn-solid-active)",
        soft: "bg-(--btn-soft) text-(--btn-fg) hover:bg-(--btn-soft-hover) focus-visible:bg-(--btn-soft-hover) active:bg-(--btn-soft-active)",
        ghost:
          "bg-transparent text-(--btn-fg) hover:bg-(--btn-soft) focus-visible:bg-(--btn-soft) active:bg-(--btn-soft-active)",
        outline:
          "border border-(--btn-border) bg-transparent text-(--btn-fg) shadow-xs hover:bg-(--btn-soft) focus-visible:bg-(--btn-soft) active:bg-(--btn-soft-active)",
        dashed:
          "border border-dashed border-(--btn-border) bg-transparent text-(--btn-fg) shadow-xs hover:bg-(--btn-soft) focus-visible:bg-(--btn-soft) active:bg-(--btn-soft-active)",
      },
      size: {
        default: "h-9 min-w-10 px-3 py-2 text-sm has-[>svg]:px-3",
        xs: "h-6 gap-1 px-2 text-xs has-[>svg]:px-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-9 min-w-9 gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-(--height-global) min-w-(--height-global) px-lg py-2 text-lg has-[>svg]:px-4",
        icon: "size-9",
        "icon-xs": "size-6 [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8",
        "icon-lg": "size-10 p-md",
      },
    },
    defaultVariants: {
      color: "default",
      variant: "solid",
      size: "default",
    },
  },
);
export type ButtonVariants = VariantProps<typeof buttonVariants>;
