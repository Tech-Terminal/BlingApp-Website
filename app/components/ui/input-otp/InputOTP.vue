<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import type { OTPInputEmits, OTPInputProps } from "vue-input-otp";
import { reactiveOmit } from "@vueuse/core";
import { useForwardPropsEmits } from "reka-ui";
import { OTPInput, REGEXP_ONLY_DIGITS } from "vue-input-otp";
import { cn } from "@/lib/utils";
import { InputOTPGroup, InputOTPSlot } from ".";

const props = withDefaults(
  defineProps<
    Omit<OTPInputProps, "maxlength"> & {
      class?: HTMLAttributes["class"];
      maxlength?: number;
    }
  >(),
  {
    maxlength: 4,
  },
);

const emits = defineEmits<OTPInputEmits>();

const delegatedProps = reactiveOmit(props, "class");

// OTPInputEmits overloads overflow Reka UI's recursive emit typing (TS2589).
const forwarded = useForwardPropsEmits(
  delegatedProps,
  emits as (event: string, ...args: unknown[]) => void,
);
</script>

<template>
  <OTPInput
    v-slot="slotProps"
    v-bind="forwarded"
    :container-class="
      cn('flex items-center gap-2 has-disabled:opacity-20', props.class)
    "
    data-slot="input-otp"
    :pattern="REGEXP_ONLY_DIGITS"
    class="disabled:cursor-not-allowed"
  >
    <InputOTPGroup>
      <template v-for="(i, index) in slotProps.slots" :key="index">
        <InputOTPSlot :index="index" />
      </template>
    </InputOTPGroup>
  </OTPInput>
</template>
