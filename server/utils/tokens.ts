import type { H3Event } from "h3";

export const ACCESS_TOKEN_COOKIE = "access_token";
export const REFRESH_TOKEN_COOKIE = "refresh_token";

const tokenCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
};

export const setTokens = (
  event: H3Event,
  accessToken: string,
  refreshToken: string,
) => {
  setCookie(event, ACCESS_TOKEN_COOKIE, accessToken, tokenCookieOptions);
  setCookie(event, REFRESH_TOKEN_COOKIE, refreshToken, tokenCookieOptions);
};

export const clearTokens = (event: H3Event) => {
  deleteCookie(event, ACCESS_TOKEN_COOKIE, tokenCookieOptions);
  deleteCookie(event, REFRESH_TOKEN_COOKIE, tokenCookieOptions);
};

export const getAccessToken = (event: H3Event) =>
  event.context.accessToken ?? getCookie(event, ACCESS_TOKEN_COOKIE);

export const getRefreshToken = (event: H3Event) =>
  event.context.refreshToken ?? getCookie(event, REFRESH_TOKEN_COOKIE);
