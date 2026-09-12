import type { Action, ExternalToast } from "vue-sonner";
import { toast as sonner } from "vue-sonner";
import { toastVariants, type ToastVariants } from "@/components/ui/sonner";

export type ToastPayload = {
  description?: string;
  action?: Action;
  duration?: number;
};

const show = (
  color: ToastVariants["color"],
  message: string,
  payload?: ToastPayload,
) => {
  const options: ExternalToast = {
    class: toastVariants({ color }),
    description: payload?.description,
    action: payload?.action,
    duration: payload?.duration,
  };

  return sonner(message, options);
};

const toastFn = (
  message: string,
  payload?: ToastPayload & { color?: ToastVariants["color"] },
) => show(payload?.color ?? "default", message, payload);

export const toast = Object.assign(toastFn, {
  default: (message: string, payload?: ToastPayload) =>
    show("default", message, payload),
  primary: (message: string, payload?: ToastPayload) =>
    show("primary", message, payload),
  success: (message: string, payload?: ToastPayload) =>
    show("success", message, payload),
  error: (message: string, payload?: ToastPayload) =>
    show("danger", message, payload),
  warning: (message: string, payload?: ToastPayload) =>
    show("warning", message, payload),
  info: (message: string, payload?: ToastPayload) =>
    show("info", message, payload),
});
