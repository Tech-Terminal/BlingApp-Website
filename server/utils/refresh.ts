import type { H3Event } from "h3";
import type { OtpVerificationResponse } from "~~/server/api/auth/types";
import {
  clearTokens,
  getAccessToken,
  getRefreshToken,
  setTokens,
} from "~~/server/utils/tokens";

const REFRESH_RESULT_TTL_MS = 10_000;

// The lock is per Node process. With refresh-token rotation and several
// instances, two instances may send the same old refresh token, and the
// second one may be rejected. That user is then logged out. Fixing this
// needs a shared lock (for example Redis) or a backend grace period for
// the old token.
const inflight = new Map<string, Promise<OtpVerificationResponse | null>>();

const applyTokens = (event: H3Event, tokens: OtpVerificationResponse) => {
  setTokens(event, tokens.accessToken, tokens.refreshToken);
  event.context.accessToken = tokens.accessToken;
  event.context.refreshToken = tokens.refreshToken;
};

const requestRefresh = async (
  event: H3Event,
  refreshToken: string,
): Promise<OtpVerificationResponse | null> => {
  const config = useRuntimeConfig(event);
  const locale = getCookie(event, "user-locale") ?? "ar";
  const accessToken = getAccessToken(event);

  const client = $fetch.create({
    baseURL: config.backendBase,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Accept-Language": locale,
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    },
  });

  try {
    const response = await client<ApiResponse<OtpVerificationResponse>>(
      "/auth/refresh",
      {
        method: "POST",
        body: { refreshToken },
      },
    );

    const data = response.data;

    if (!data?.accessToken || !data.refreshToken) {
      clearTokens(event);
      return null;
    }

    applyTokens(event, data);
    return data;
  } catch {
    clearTokens(event);
    return null;
  }
};

export const refreshTokens = async (
  event: H3Event,
): Promise<OtpVerificationResponse | null> => {
  const refreshToken = getRefreshToken(event);

  if (!refreshToken) {
    clearTokens(event);
    return null;
  }

  const existing = inflight.get(refreshToken);

  if (existing) {
    const result = await existing;

    if (result) {
      applyTokens(event, result);
    } else {
      clearTokens(event);
    }

    return result;
  }

  const promise = requestRefresh(event, refreshToken);
  inflight.set(refreshToken, promise);

  try {
    return await promise;
  } finally {
    setTimeout(() => {
      inflight.delete(refreshToken);
    }, REFRESH_RESULT_TTL_MS);
  }
};
