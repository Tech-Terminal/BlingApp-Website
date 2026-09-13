<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import type { RuleExpression } from "vee-validate";
import { Field } from "vee-validate";
import { cn } from "@/lib/utils";
import FormControl from "./FormControl.vue";
import FormDescription from "./FormDescription.vue";
import FormItem from "./FormItem.vue";
import FormLabel from "./FormLabel.vue";
import FormMessage from "./FormMessage.vue";

defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    name: string;
    label?: string;
    description?: string;
    required?: boolean;
    optional?: boolean;
    rules?: RuleExpression<unknown>;
    validateOnMount?: boolean;
    class?: HTMLAttributes["class"];
  }>(),
  {
    required: false,
    optional: false,
    validateOnMount: false,
  },
);

const { t } = useI18n();

const showRequired = computed(() => props.required);
const showOptional = computed(() => props.optional && !props.required);
</script>

<template>
  <Field
    v-slot="{ componentField }"
    :name="name"
    :rules="rules"
    :validate-on-mount="validateOnMount"
    :validate-on-input="true"
  >
    <FormItem :class="cn(props.class)">
      <div
        v-if="label || $slots.label || showOptional"
        class="flex items-center justify-between gap-2"
      >
        <FormLabel v-if="label || $slots.label">
          <slot name="label">{{ label }}</slot>
          <span v-if="showRequired" class="text-txt-danger" aria-hidden="true"
            >*</span
          >
        </FormLabel>
        <span v-if="showOptional" class="text-xs text-txt-caption">
          {{ t("form.optional") }}
        </span>
      </div>
      <FormControl class="mt-1.5">
        <slot v-bind="{ componentField }" />
      </FormControl>
      <FormDescription v-if="description || $slots.description">
        <slot name="description">{{ description }}</slot>
      </FormDescription>
      <FormMessage />
    </FormItem>
  </Field>
</template>
