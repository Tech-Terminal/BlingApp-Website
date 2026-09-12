import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";

export { default as Toaster } from "./Sonner.vue";

export const toastLayoutClass =
  "relative flex w-full items-center gap-2 rounded-xl border-(length:--border-stroke) border-[color:var(--toast-border)] bg-(--toast-bg) p-3 text-sm font-medium text-(--toast-text) shadow-xs";

export const toastVariants = cva("", {
  variants: {
    color: {
      default: [
        "[--toast-bg:var(--color-bg-modal)]",
        "[--toast-text:var(--color-txt-default)]",
        "[--toast-caption:var(--color-txt-caption)]",
        "[--toast-border:var(--color-border-default)]",
        "[--toast-icon:var(--color-icons-default)]",
      ],
      primary: [
        "[--toast-bg:var(--color-shades-primary-1)]",
        "[--toast-text:var(--color-txt-primary)]",
        "[--toast-caption:var(--color-txt-primary)]",
        "[--toast-border:var(--color-border-primary)]",
        "[--toast-icon:var(--color-icons-primary)]",
      ],
      success: [
        "[--toast-bg:var(--color-shades-success-1)]",
        "[--toast-text:var(--color-txt-success)]",
        "[--toast-caption:var(--color-txt-success)]",
        "[--toast-border:var(--color-border-success)]",
        "[--toast-icon:var(--color-icons-success)]",
      ],
      danger: [
        "[--toast-bg:var(--color-shades-danger-1)]",
        "[--toast-text:var(--color-txt-danger)]",
        "[--toast-caption:var(--color-txt-danger)]",
        "[--toast-border:var(--color-border-danger)]",
        "[--toast-icon:var(--color-icons-danger)]",
      ],
      warning: [
        "[--toast-bg:var(--color-shades-warning-1)]",
        "[--toast-text:var(--color-txt-warning)]",
        "[--toast-caption:var(--color-txt-warning)]",
        "[--toast-border:var(--color-border-warning)]",
        "[--toast-icon:var(--color-icons-warning)]",
      ],
      info: [
        "[--toast-bg:var(--color-shades-info-1)]",
        "[--toast-text:var(--color-txt-info)]",
        "[--toast-caption:var(--color-txt-info)]",
        "[--toast-border:var(--color-border-info)]",
        "[--toast-icon:var(--color-icons-info)]",
      ],
    },
  },
  defaultVariants: {
    color: "default",
  },
});

export type ToastVariants = VariantProps<typeof toastVariants>;
