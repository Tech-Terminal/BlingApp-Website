import createApiClient from "~~/server/utils/api";
import type { OtpVerificationResponse } from "./types";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const apiClient = createApiClient(event);

  const response = await apiClient<ApiResponse<OtpVerificationResponse>>(
    "/auth/verify-register-otp",
    {
      method: "POST",
      body,
    },
  );

  if (response.data) {
    setTokens(event, response.data.accessToken, response.data.refreshToken);
  }
  return { ...response, data: response.data?.client };
});
