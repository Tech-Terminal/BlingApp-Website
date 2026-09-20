<script setup lang="ts">
import Button from "~/components/ui/button/Button.vue";
import { Form, FormField } from "~/components/ui/form";
import PhoneInput from "~/components/ui/input/PhoneInput.vue";
import * as yup from "yup";
import { useForm } from "vee-validate";
import { handleApiFormError } from "~/utils/api-error";

const { t } = useI18n();

const localePath = useLocalePath();
useHead({
  title: () => String(t("signIn.browserTitle")),
});

definePageMeta({
  layout: {
    name: "auth",
    props: {
      title: "signIn.title",
      description: "signIn.description",
    },
  },
});

const formId = `${useId()}-form`;

const schema = yup.object({
  phone: yup.string().kuwaitPhone().required(),
});

type TForm = yup.InferType<typeof schema>;

const { handleSubmit, meta, isSubmitting } = useForm<TForm>({
  validationSchema: schema,
});

const submit = handleSubmit(async (values, ctx) => {
  try {
    const response = await $fetch<ApiResponse>("/api/auth/sign-in", {
      method: "POST",
      body: values,
    });

    localePath({
      path: "/auth/otp-verification",
    });

    toast.success(response?.message);
  } catch (error) {
    handleApiFormError(error, ctx.setErrors);
  }
});
</script>
<template>
  <Form :id="formId" class="flex flex-col gap-6 md:gap-8">
    <div class="space-y-2">
      <FormField v-slot="{ componentField }" name="phone" :label="t('phone')">
        <PhoneInput
          :model-value="componentField.modelValue"
          :placeholder="t('signIn.phonePlaceholder')"
          @update:model-value="componentField['onUpdate:modelValue']"
        />
      </FormField>
      <p class="text-sm">{{ t("signIn.phoneDescription") }}</p>
    </div>

    <Button
      type="submit"
      :label="t('signIn.trigger')"
      color="primary"
      size="lg"
      :disabled="!meta.dirty"
      :loading="isSubmitting"
      @click="submit"
    />

    <p class="space-x-2 text-center font-semibold">
      <span>{{ t("noAccount") }}</span>
      <NuxtLinkLocale
        class="cursor-pointer text-txt-primary"
        :to="{
          path: '/auth/sign-up',
        }"
        >{{ t("signUp.browserTitle") }}</NuxtLinkLocale
      >
    </p>
  </Form>
</template>
