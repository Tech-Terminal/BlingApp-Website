<script setup lang="ts">
import Button from "~/components/ui/button/Button.vue";
import { Form } from "~/components/ui/form";
import AuthHeader from "~/layouts/components/AuthHeader.vue";

const { t } = useI18n();
useHead({
  title: () => String(t("signUp")),
});

definePageMeta({
  layout: {
    name: "auth",
  },
});

const formId = `${useId()}-form`;
</script>
<template>
  <div>
    <AuthHeader
      :title="t('signUp.title')"
      :description="t('signUp.description')"
    />
    <Form :id="formId" class="flex flex-col gap-6 md:gap-8">
      <Button
        type="submit"
        :label="t('signUp.trigger')"
        color="primary"
        size="lg"
      />

      <p class="font-semi-bold text-center space-x-2">
        <span>{{ t("haveAccount") }}</span>
        <NuxtLink
          class="text-txt-primary cursor-pointer"
          :to="{
            path: '/auth/login',
          }"
          >{{ t("login.trigger") }}</NuxtLink
        >
      </p>
    </Form>
  </div>
</template>
