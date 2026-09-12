<script setup lang="ts">
import Button from "~/components/ui/button/Button.vue";
import { InputOTP } from "~/components/ui/input-otp";
import { Form, FormField } from "~/components/ui/form";

const { t } = useI18n();
useHead({
  title: () => String(t("otpVerification")),
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
</script>
<template>
  <Form :id="formId" class="flex flex-col gap-6 md:gap-8">
    <FormField v-slot="{ componentField }" name="otp" class="grow mx-auto">
      <InputOTP v-bind="componentField" placeholder="----" />
    </FormField>
    <Button
      type="submit"
      :label="t('otpVerification.trigger')"
      color="primary"
      size="lg"
    />
  </Form>
</template>
