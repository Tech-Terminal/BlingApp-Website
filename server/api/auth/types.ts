import type { AppClient } from "~~/shared/types/models";

export interface OtpVerificationResponse {
  client: AppClient;
  accessToken: string;
  refreshToken: string;
}
