<script setup lang="ts">
import { useForm } from "vee-validate";
import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import { PhoneInput } from "@/components/ui/input";

useHead({
  title: "Form Field",
});

const { t } = useI18n();

const formId = `${useId()}-form`;

const { handleSubmit } = useForm({
  initialValues: {
    email: "",
    nickname: "",
    website: "",
    invalidEmail: "not-an-email",
    phone: "",
  },
});

const requiredRule = (value: unknown) => {
  if (typeof value === "string" && value.trim().length > 0) {
    return true;
  }

  return String(t("validation.required"));
};

const emailRule = (value: unknown) => {
  if (typeof value !== "string" || value.trim().length === 0) {
    return String(t("validation.required"));
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    return String(t("validation.email"));
  }

  return true;
};

const submitted = ref<string | null>(null);

const onSubmit = handleSubmit((values) => {
  submitted.value = JSON.stringify(values);
});
</script>

<template>
  <main class="flex flex-col gap-8">
    <h1 class="text-xl font-medium">Form Field</h1>

    <Form :id="formId" class="flex max-w-sm flex-col gap-8" @submit="onSubmit">
      <section class="flex flex-col gap-3">
        <h2 class="text-sm font-medium">Required</h2>
        <FormField
          name="email"
          label="Email"
          required
          :rules="emailRule"
          type="email"
          placeholder="you@example.com"
          autocomplete="email"
        />
      </section>

      <section class="flex flex-col gap-3">
        <h2 class="text-sm font-medium">Optional</h2>
        <FormField
          name="nickname"
          label="Nickname"
          optional
          placeholder="How should we call you?"
        />
      </section>

      <section class="flex flex-col gap-3">
        <h2 class="text-sm font-medium">Description</h2>
        <FormField
          name="website"
          label="Website"
          optional
          description="Shown on your public profile."
          type="url"
          placeholder="https://example.com"
        />
      </section>

      <section class="flex flex-col gap-3">
        <h2 class="text-sm font-medium">Error</h2>
        <FormField
          name="invalidEmail"
          label="Email"
          required
          :rules="emailRule"
          type="email"
          placeholder="you@example.com"
          validate-on-mount
        />
      </section>

      <section class="flex flex-col gap-3">
        <h2 class="text-sm font-medium">Phone slot</h2>
        <FormField name="phone" label="Phone" required :rules="requiredRule">
          <template #default="field">
            <PhoneInput v-bind="field" placeholder="500 12345" />
          </template>
        </FormField>
      </section>

      <Button type="submit" label="Submit" color="primary" />
      <p v-if="submitted" class="text-sm text-txt-caption">
        Submitted: {{ submitted }}
      </p>
    </Form>
  </main>
</template>
