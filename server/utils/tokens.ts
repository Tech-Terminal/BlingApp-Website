import type { H3Event } from "h3";

export const setTokens = (
  event: H3Event,
  accessToken: string,
  refreshToken: string,
) => {
  setCookie(event, "access_token", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  setCookie(event, "refresh_token", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });
};
