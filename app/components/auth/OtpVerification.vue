<script setup lang="ts">
import Button from "~/components/ui/button/Button.vue";
import { InputOTP } from "~/components/ui/input-otp";
import { Form, FormField } from "~/components/ui/form";
import { formatCount } from "~/utils/formatters";
import * as yup from "yup";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/yup";
import type { AppClient } from "~~/shared/types/models";

const props = defineProps<{
  phone: string;
  purpose: "login" | "register";
}>();

const emit = defineEmits<{
  back: [];
  success: [];
}>();

const { t } = useI18n();

const formId = `${useId()}-form`;

const { resendCode, isPending, remaining } = useResendOtp(props.phone);

const schema = yup.object({
  phone: yup.string().kuwaitPhone().required().default(props.phone),
  otp: yup.string().min(6).max(6).required(),
});

const { handleSubmit, isSubmitting, meta } = useForm({
  validationSchema: toTypedSchema(schema),
  validateOnMount: false,
  initialErrors: {
    phone: "",
    otp: "",
  },
  initialValues: {
    phone: props.phone,
    otp: "",
  },
});

const onSubmit = handleSubmit(async (data, ctx) => {
  try {
    const response = await $fetch<ApiResponse<AppClient>>(
      "/api/auth/verify-otp",
      {
        method: "POST",
        body: { ...data, purpose: props.purpose },
      },
    );

    toast.success(response?.message ?? t("otpVerification.success"));

    emit("success");
  } catch (error) {
    handleApiFormError(error, ctx.setErrors);
  }
});
</script>
<template>
  <div class="flex flex-col gap-6 md:gap-8">
    <AuthHeader
      title="otpVerification.title"
      description="otpVerification.description"
      show-back-btn
      @back="emit('back')"
    >
      <template #description>
        {{ t("otpVerification.description", { phone: props.phone ?? "" }) }}
      </template>
    </AuthHeader>
    <Form :id="formId" class="flex flex-col gap-6 md:gap-8">
      <FormField v-slot="{ componentField }" name="otp" class="mx-auto grow">
        <InputOTP v-bind="componentField" />
      </FormField>
      <div class="flex flex-col gap-4">
        <Button
          type="submit"
          :label="t('otpVerification.trigger')"
          color="primary"
          size="lg"
          :disabled="!meta.dirty"
          :loading="isSubmitting"
          @click="onSubmit"
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
  </div>
</template>
