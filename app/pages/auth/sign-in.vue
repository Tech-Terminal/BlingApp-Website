<script setup lang="ts">
import { useStepper } from "@vueuse/core";

const { t } = useI18n();
const localePath = useLocalePath();
const { goTo, current: currentStep } = useStepper(
  ["signIn", "otpVerification"],
  "signIn",
);

const phone = ref("");

useHead({
  title: () => String(t("signIn.browserTitle")),
});

definePageMeta({
  layout: "auth",
});

const goToVerifications = async (p: string) => {
  goTo("otpVerification");
  phone.value = p;
};

const otpVerificationSuccess = () => {
  navigateTo(localePath("/"));
};
</script>
<template>
  <Transition name="fade" mode="out-in">
    <AuthOtpVerification
      v-if="currentStep === 'otpVerification'"
      :verify-otp-url="'/api/auth/sign-in-verify-otp'"
      :phone="phone"
      @back="goTo('signIn')"
      @success="otpVerificationSuccess"
    />
    <AuthSignIn
      v-else-if="currentStep === 'signIn'"
      @submit="goToVerifications"
    />
  </Transition>
</template>
