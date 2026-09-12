<script setup lang="ts">
import Button from "~/components/ui/button/Button.vue";
import { Form } from "~/components/ui/form";

const { t } = useI18n();
useHead({
  title: () => String(t("signUp")),
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
          path: '/auth/login',
        }"
        >{{ t("login.trigger") }}</NuxtLink
      >
    </p>
  </Form>
</template>
