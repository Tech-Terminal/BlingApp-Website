import createApiClient from "~~/server/utils/api";
import type { OtpVerificationResponse } from "./types";

const backendPaths = {
  login: "/auth/verify-login-otp",
  register: "/auth/verify-register-otp",
} as const;

type OtpPurpose = keyof typeof backendPaths;

export default defineEventHandler(async (event) => {
  const { purpose, ...body } = await readBody<{
    purpose?: OtpPurpose;
    phone?: string;
    otp?: string;
  }>(event);

  const backendPath = purpose ? backendPaths[purpose] : undefined;

  if (!backendPath) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid OTP purpose",
    });
  }

  const apiClient = createApiClient(event);

  const response = await apiClient<ApiResponse<OtpVerificationResponse>>(
    backendPath,
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
