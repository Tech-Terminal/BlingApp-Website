<script setup lang="ts">
import { useStepper } from "@vueuse/core";

const { t } = useI18n();
const { setUser } = useAuth();
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

const otpVerificationSuccess = (data: AppClient) => {
  setUser(data);
  navigateTo(localePath("/"));
};
</script>
<template>
  <Transition name="fade" mode="out-in">
    <AuthOtpVerification
      v-if="currentStep === 'otpVerification'"
      purpose="register"
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
