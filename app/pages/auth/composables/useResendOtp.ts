import { ref, shallowRef } from "vue";
import { useCountdown } from "@vueuse/core";

export const useResendOtp = () => {
  const countdown = shallowRef(60);
  const { t } = useI18n();
  const { remaining, start } = useCountdown(countdown, {
    immediate: true,
  });

  const attemptsCount = ref(1);

  const setDelaySeconds = () => {
    attemptsCount.value++;
    switch (attemptsCount.value) {
      case 1:
        countdown.value = 60;
        break;
      case 2:
        countdown.value = 60 * 5;
        break;
      case 3:
        countdown.value = 60 * 15;
        break;
      default:
        countdown.value = 60 * 60;
        break;
    }
    start();
  };

  const { pending: isPending, execute: resendCode } = useFetch("", {
    onResponseError: () => {},
    onResponse: () => {
      toast.success(t("otpVerification.resendOtpSuccess"));
      setDelaySeconds();
    },
  });

  return {
    resendCode,
    isPending,
    remaining,
    attemptsCount,
  };
};
