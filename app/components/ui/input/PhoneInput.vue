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
const kwFormat = kwExample?.formatNational() ?? "500 12345";
const kwPattern = kwFormat.replace(/\d/g, "[0-9]");
const kwMaxLength = kwFormat.length;

const props = defineProps<{
  defaultValue?: string;
  class?: HTMLAttributes["class"];
  loading?: boolean;
  disabled?: boolean;
  placeholder?: string;
}>();

const modelValue = defineModel<string>({ default: "" });
const { locale } = useI18n();

const dir = computed(() => (locale.value === "ar" ? "rtl" : "ltr"));
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
    :class="
      cn(
        'rtl:flex-row-reverse',
        {
          'text-end': dir === 'rtl',
        },
        props.class,
      )
    "
    :disabled="disabled"
    :loading="loading"
    :dir="dir"
    type="tel"
    inputmode="tel"
    :pattern="kwPattern"
    :maxlength="kwMaxLength"
    autocomplete="tel-national"
    :placeholder="placeholder"
  >
    <template #prefix>
      <span
        class="flex shrink-0 items-center gap-2 text-sm text-input-text-value rtl:flex-row-reverse"
      >
        <span
          class="inline-block shrink-0 font-flags text-xl leading-none"
          aria-hidden="true"
        >
          {{ KW_FLAG }}
        </span>
        <span class="tabular-nums group-has-disabled:text-input-text-disabled">
          {{ dir === "rtl" ? "&#x200E;" : "" }}{{ KW_DIAL_CODE }}
        </span>
      </span>
    </template>
  </Input>
</template>
