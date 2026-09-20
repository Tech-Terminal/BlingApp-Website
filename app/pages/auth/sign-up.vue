<script setup lang="ts">
import Button from "~/components/ui/button/Button.vue";
import { Form, FormField } from "~/components/ui/form";
import Input from "~/components/ui/input/Input.vue";
import PhoneInput from "~/components/ui/input/PhoneInput.vue";

const { t } = useI18n();

useHead({
  title: () => String(t("signUp.browserTitle")),
});

definePageMeta({
  layout: {
    name: "auth",
    props: {
      title: "signUp.title",
      description: "signUp.description",
    },
  },
});

const formId = `${useId()}-form`;
</script>
<template>
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
        <FormField v-slot="{ componentField }" name="phone" :label="t('phone')">
          <PhoneInput
            v-bind="componentField"
            :placeholder="t('signUp.phonePlaceholder')"
          />
        </FormField>
        <p class="text-sm">{{ t("signUp.phoneDescription") }}</p>
      </div>
    </div>

    <p class="text-center leading-md">
      <span>{{ t("signUp.termsPrefix") }}</span>
      <NuxtLink class="font-semibold text-txt-default">
        {{ t("signUp.termsLink") }}
      </NuxtLink>
    </p>

    <Button
      type="submit"
      :label="t('signUp.trigger')"
      color="primary"
      size="lg"
    />

    <p class="space-x-2 text-center font-semibold">
      <span>{{ t("haveAccount") }}</span>
      <NuxtLink
        class="cursor-pointer text-txt-primary"
        :to="{
          path: '/auth/sign-in',
        }"
        >{{ t("signIn.trigger") }}</NuxtLink
      >
    </p>
  </Form>
</template>
