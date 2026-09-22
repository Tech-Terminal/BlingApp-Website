<script setup lang="ts">
import { useStepper } from "@vueuse/core";

const { t } = useI18n();
const localePath = useLocalePath();
const { goTo, current: currentStep } = useStepper(
  ["signUp", "otpVerification"],
  "signUp",
);

const phone = ref("");

useHead({
  title: () => String(t("signUp.browserTitle")),
});

definePageMeta({
  layout: "auth",
});

const goToVerification = async (p: string) => {
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
      :verify-otp-url="'/api/auth/verify-register-otp'"
      :phone="phone"
      @back="goTo('signUp')"
      @success="otpVerificationSuccess"
    />
    <AuthSignUp
      v-else-if="currentStep === 'signUp'"
      @submit="goToVerification"
    />
  </Transition>
</template>
