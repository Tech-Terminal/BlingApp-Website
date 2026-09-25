import type { H3Event } from "h3";
import type { $Fetch } from "ofetch";
import { FetchError } from "ofetch";
import { refreshTokens } from "~~/server/utils/refresh";
import { clearTokens, getAccessToken } from "~~/server/utils/tokens";

const isAuthPath = (request: unknown) => {
  const path = typeof request === "string" ? request : String(request);
  return path.startsWith("/auth/");
};

const toH3Error = (error: unknown): never => {
  if (error instanceof FetchError) {
    throw createError({
      statusCode: error.statusCode ?? 500,
      statusMessage: error.statusMessage,
      data: error.data,
    });
  }

  throw error;
};

const createApiClient = (event: H3Event) => {
  const config = useRuntimeConfig(event);
  const locale = getCookie(event, "user-locale") ?? "ar";

  const client = $fetch.create({
    baseURL: config.backendBase,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Accept-Language": locale,
    },
    onRequest({ options }) {
      const accessToken = getAccessToken(event);

      if (!accessToken) {
        return;
      }

      const headers = new Headers(options.headers);
      headers.set("Authorization", `Bearer ${accessToken}`);
      options.headers = headers;
    },
  });

  const fetchWithRefresh = async <T>(
    request: Parameters<typeof client>[0],
    options?: Parameters<typeof client>[1],
  ): Promise<T> => {
    try {
      return await client<T>(request, options);
    } catch (error) {
      const statusCode =
        error instanceof FetchError ? error.statusCode : undefined;

      if (statusCode !== 401 || isAuthPath(request)) {
        return toH3Error(error);
      }

      const tokens = await refreshTokens(event);

      if (!tokens) {
        throw createError({ statusCode: 401 });
      }

      try {
        return await client<T>(request, options);
      } catch (retryError) {
        const retryStatus =
          retryError instanceof FetchError ? retryError.statusCode : undefined;

        if (retryStatus === 401) {
          clearTokens(event);
          throw createError({ statusCode: 401 });
        }

        return toH3Error(retryError);
      }
    }
  };

  return fetchWithRefresh as $Fetch;
};

export default createApiClient;
