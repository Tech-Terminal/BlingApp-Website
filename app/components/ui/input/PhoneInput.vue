<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import type { CountryCode } from "libphonenumber-js";
import {
  AsYouType,
  getCountryCallingCode,
  getExampleNumber,
  parseIncompletePhoneNumber,
  parsePhoneNumberFromString,
  validatePhoneNumberLength,
} from "libphonenumber-js";
import examples from "libphonenumber-js/mobile/examples";
import { cn } from "@/lib/utils";
import Input from "./Input.vue";

defineOptions({ inheritAttrs: false });

const KW_COUNTRY: CountryCode = "KW";
const KW_FLAG = "🇰🇼";
const KW_CALLING_CODE = getCountryCallingCode(KW_COUNTRY);
const KW_DIAL_CODE = `+${KW_CALLING_CODE}`;

const kwExample = getExampleNumber(KW_COUNTRY, examples);
const kwPlaceholder = kwExample?.formatNational() ?? "500 12345";
const kwPattern = kwPlaceholder.replace(/\d/g, "[0-9]");
const kwMaxLength = kwPlaceholder.length;

const props = defineProps<{
  defaultValue?: string;
  class?: HTMLAttributes["class"];
  loading?: boolean;
  disabled?: boolean;
}>();

const modelValue = defineModel<string>({ default: "" });

function toNationalDigits(value: string): string {
  const parsed = parsePhoneNumberFromString(value, {
    defaultCountry: KW_COUNTRY,
    extract: false,
  });

  if (parsed?.country === KW_COUNTRY) {
    return parsed.nationalNumber;
  }

  let digits = parseIncompletePhoneNumber(value).replace(/^\+/, "");

  if (digits.startsWith(KW_CALLING_CODE)) {
    digits = digits.slice(KW_CALLING_CODE.length);
  }

  while (
    digits &&
    validatePhoneNumberLength(digits, KW_COUNTRY) === "TOO_LONG"
  ) {
    digits = digits.slice(0, -1);
  }

  return digits;
}

function formatNational(nationalDigits: string): string {
  if (!nationalDigits) {
    return "";
  }

  return new AsYouType(KW_COUNTRY).input(nationalDigits);
}

function toE164(nationalDigits: string): string {
  if (!nationalDigits) {
    return "";
  }

  const parsed = parsePhoneNumberFromString(nationalDigits, KW_COUNTRY);

  if (parsed?.country === KW_COUNTRY) {
    return parsed.number;
  }

  return `${KW_DIAL_CODE}${nationalDigits}`;
}

const displayValue = ref(
  formatNational(
    toNationalDigits(String(modelValue.value || props.defaultValue || "")),
  ),
);

watch(displayValue, async (raw: string) => {
  const national = toNationalDigits(raw);
  const formatted = formatNational(national);
  const next = toE164(national);

  if (next !== (modelValue.value || "")) {
    modelValue.value = next;
  }

  if (formatted === raw) {
    return;
  }

  await nextTick();
  displayValue.value = formatted;
});

watch(modelValue, (value?: string) => {
  const formatted = formatNational(
    toNationalDigits(String(value || props.defaultValue || "")),
  );

  if (formatted !== displayValue.value) {
    displayValue.value = formatted;
  }
});
</script>

<template>
  <Input
    v-model="displayValue"
    v-bind="$attrs"
    :class="cn('[direction:ltr]', props.class)"
    :disabled="disabled"
    :loading="loading"
    type="tel"
    inputmode="tel"
    :pattern="kwPattern"
    :maxlength="kwMaxLength"
    autocomplete="tel-national"
    dir="ltr"
    :placeholder="kwPlaceholder"
  >
    <template #prefix>
      <span
        class="flex shrink-0 items-center gap-2 text-sm text-input-text-value"
        dir="ltr"
      >
        <span
          class="font-flags inline-block shrink-0 text-xl leading-none"
          aria-hidden="true"
        >
          {{ KW_FLAG }}
        </span>
        <span class="tabular-nums group-has-disabled:text-input-text-disabled">
          {{ KW_DIAL_CODE }}
        </span>
      </span>
    </template>
  </Input>
</template>
