<script setup lang="ts">
import Button from "~/components/ui/button/Button.vue";
import { Form, FormField } from "~/components/ui/form";
import Input from "~/components/ui/input/Input.vue";
import PhoneInput from "~/components/ui/input/PhoneInput.vue";
import * as yup from "yup";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/yup";

const emit = defineEmits<{
  submit: [phone: string];
}>();

const { t } = useI18n();

const formId = `${useId()}-form`;

const schema = yup.object({
  name: yup.string().min(2).required(),
  phone: yup.string().kuwaitPhone().required(),
});

type TForm = yup.InferType<typeof schema>;

const { handleSubmit, meta, isSubmitting } = useForm<TForm>({
  validationSchema: toTypedSchema(schema),
});

const submit = handleSubmit(async (values, ctx) => {
  try {
    const response = await $fetch<ApiResponse>("/api/auth/sign-up", {
      method: "POST",
      body: values,
    });

    toast.success(response?.message);

    emit("submit", values.phone);
  } catch (error) {
    handleApiFormError(error, ctx.setErrors);
  }
});
</script>
<template>
  <div class="flex flex-col gap-6 md:gap-8">
    <AuthHeader title="signUp.title" description="signUp.description" />
    <Form :id="formId" class="flex flex-col gap-6 md:gap-8">
      <div class="flex flex-col gap-6 md:gap-8">
        <FormField v-slot="{ componentField }" name="name" :label="t('name')">
          <Input
            v-bind="componentField"
            type="text"
            autocomplete="name"
            class="text-end"
            :placeholder="t('signUp.namePlaceholder')"
          />
        </FormField>

        <div class="space-y-2">
          <FormField
            v-slot="{ componentField }"
            name="phone"
            :label="t('phone')"
          >
            <PhoneInput
              :model-value="componentField.modelValue"
              :placeholder="t('signUp.phonePlaceholder')"
              @update:model-value="componentField['onUpdate:modelValue']"
            />
          </FormField>
          <p class="text-sm">{{ t("signUp.phoneDescription") }}</p>
        </div>
      </div>

      <p class="text-center leading-md">
        <span>{{ t("signUp.termsPrefix") }}</span>
        <NuxtLinkLocale class="font-semibold text-txt-default">
          {{ t("signUp.termsLink") }}
        </NuxtLinkLocale>
      </p>

      <Button
        type="submit"
        :label="t('signUp.trigger')"
        color="primary"
        size="lg"
        :disabled="!meta.dirty"
        :loading="isSubmitting"
        @click="submit"
      />

      <p class="space-x-2 text-center font-semibold">
        <span>{{ t("haveAccount") }}</span>
        <NuxtLinkLocale
          class="cursor-pointer text-txt-primary"
          :to="{
            path: '/auth/sign-in',
          }"
          >{{ t("signIn.trigger") }}</NuxtLinkLocale
        >
      </p>
    </Form>
  </div>
</template>
