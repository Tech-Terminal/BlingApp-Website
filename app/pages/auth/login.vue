<script setup lang="ts">
import Button from "~/components/ui/button/Button.vue";
import { Form, FormField } from "~/components/ui/form";
import PhoneInput from "~/components/ui/input/PhoneInput.vue";

const { t } = useI18n();
useHead({
  title: () => String(t("login")),
});

definePageMeta({
  layout: {
    name: "auth",
    props: {
      title: "login.title",
      description: "login.description",
    },
  },
});

const formId = `${useId()}-form`;
</script>
<template>
  <Form :id="formId" class="flex flex-col gap-6 md:gap-8">
    <div class="space-y-2">
      <FormField v-slot="{ componentField }" name="phone" :label="t('phone')">
        <PhoneInput
          v-bind="componentField"
          :placeholder="t('login.phonePlaceholder')"
        />
      </FormField>
      <p class="text-sm">{{ t("login.phoneDescription") }}</p>
    </div>

    <Button
      type="submit"
      :label="t('login.trigger')"
      color="primary"
      size="lg"
    />

    <p class="font-semi-bold text-center space-x-2">
      <span>{{ t("noAccount") }}</span>
      <NuxtLink
        class="text-txt-primary cursor-pointer"
        :to="{
          path: '/auth/sign-up',
        }"
        >{{ t("signUp.browserTitle") }}</NuxtLink
      >
    </p>
  </Form>
</template>
