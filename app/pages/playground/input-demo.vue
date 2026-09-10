<script setup lang="ts">
import { Input, PhoneInput } from "@/components/ui/input";

useHead({
  title: "Input",
});

const modelValue = ref("Bound value");
const phoneValue = ref("");
</script>

<template>
  <main class="flex flex-col gap-8">
    <h1 class="text-xl font-medium">Input</h1>

    <section class="flex flex-col gap-3">
      <h2 class="text-sm font-medium">Default</h2>
      <div class="flex max-w-sm flex-col gap-3">
        <Input placeholder="Placeholder" />
        <Input default-value="With value" />
      </div>
    </section>

    <section class="flex flex-col gap-3">
      <h2 class="text-sm font-medium">v-model</h2>
      <div class="flex max-w-sm flex-col gap-3">
        <Input v-model="modelValue" placeholder="Type here" />
        <p class="text-sm text-txt-caption">Value: {{ modelValue }}</p>
      </div>
    </section>

    <section class="flex flex-col gap-3">
      <h2 class="text-sm font-medium">Phone (Kuwait)</h2>
      <div class="flex max-w-sm flex-col gap-3">
        <PhoneInput v-model="phoneValue" />
        <p dir="ltr" class="text-sm text-txt-caption">
          Value: {{ phoneValue || "—" }}
        </p>
        <PhoneInput disabled />
        <PhoneInput aria-invalid="true" default-value="+96550001234" />
        <PhoneInput loading />
      </div>
    </section>

    <section class="flex flex-col gap-3">
      <h2 class="text-sm font-medium">Types</h2>
      <div class="flex max-w-sm flex-col gap-3">
        <Input type="email" placeholder="Email" autocomplete="email" />
        <Input
          type="password"
          placeholder="Password"
          autocomplete="current-password"
        />
      </div>
    </section>

    <section class="flex flex-col gap-3">
      <h2 class="text-sm font-medium">Icons</h2>
      <div class="flex max-w-sm flex-col gap-3">
        <Input prefix-icon="hugeicons:search-01" placeholder="Prefix icon" />
        <Input suffix-icon="hugeicons:mail-01" placeholder="Suffix icon" />
        <Input
          prefix-icon="hugeicons:user"
          suffix-icon="hugeicons:mail-01"
          placeholder="Both icons"
        />
      </div>
    </section>

    <section class="flex flex-col gap-3">
      <h2 class="text-sm font-medium">States</h2>
      <div class="flex max-w-sm flex-col gap-3">
        <Input disabled placeholder="Disabled" />
        <Input
          disabled
          prefix-icon="hugeicons:search-01"
          placeholder="Disabled with icon"
        />
        <Input readonly default-value="Readonly" />
        <Input aria-invalid="true" placeholder="Invalid" />
        <Input
          aria-invalid="true"
          prefix-icon="hugeicons:mail-01"
          default-value="invalid@example.com"
        />
        <Input loading placeholder="Loading" />
        <Input
          loading
          prefix-icon="hugeicons:search-01"
          suffix-icon="hugeicons:mail-01"
          placeholder="Loading hides suffix"
        />
      </div>
    </section>
  </main>
</template>
