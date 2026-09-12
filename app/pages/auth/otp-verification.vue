<script setup lang="ts">
import Button from "~/components/ui/button/Button.vue";
import { InputOTP } from "~/components/ui/input-otp";
import { Form, FormField } from "~/components/ui/form";
import { useResendOtp } from "./composables/useResendOtp";
import { formatCount } from "~/utils/formatters";

const { t } = useI18n();
useHead({
  title: () => String(t("otpVerification.browserTitle")),
});

definePageMeta({
  layout: {
    name: "auth",
    props: {
      title: "otpVerification.title",
      description: "otpVerification.description",
    },
  },
});

const formId = `${useId()}-form`;

const { resendCode, isPending, remaining } = useResendOtp();
</script>
<template>
  <Form :id="formId" class="flex flex-col gap-6 md:gap-8">
    <FormField v-slot="{ componentField }" name="otp" class="mx-auto grow">
      <InputOTP v-bind="componentField" placeholder="----" />
    </FormField>
    <div class="flex flex-col gap-4">
      <Button
        type="submit"
        :label="t('otpVerification.trigger')"
        color="primary"
        size="lg"
      />
      <Button
        v-if="remaining === 0"
        type="button"
        variant="ghost"
        :label="t('otpVerification.resendOtp')"
        color="primary"
        size="lg"
        :loading="isPending"
        @click="resendCode"
      />
      <div v-else-if="remaining > 0" class="mx-auto font-semibold">
        <span>
          {{ t("otpVerification.resendOtpAfter") }}
        </span>
        <span class="text-txt-primary">
          {{
            formatCount(remaining, {
              hours: false,
              minutes: true,
              seconds: true,
            })
          }}
        </span>
      </div>
    </div>
  </Form>
</template>
