export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  let redirecting = false;

  const api = $fetch.create({
    baseURL: config.public.apiBase,
    onRequest({ options }) {
      if (import.meta.server) {
        const headers = useRequestHeaders(["cookie"]);

        if (headers.cookie) {
          options.headers = new Headers(options.headers);
          options.headers.set("cookie", headers.cookie);
        }
      }
    },
    onResponse({ response }) {
      if (import.meta.server) {
        const setCookies =
          response.headers.getSetCookie?.() ??
          [response.headers.get("set-cookie")].filter(Boolean);
        const event = useRequestEvent();
        if (event && setCookies.length > 0) {
          for (const cookie of setCookies) {
            if (cookie) {
              appendResponseHeader(event, "set-cookie", cookie);
            }
          }
        }
      }
    },
    async onResponseError({ response }) {
      if (import.meta.server || response.status !== 401 || redirecting) {
        return;
      }

      redirecting = true;

      await nuxtApp.runWithContext(() => {
        const localePath = useLocalePath();
        return navigateTo(localePath("/auth/sign-in"));
      });
    },
  });

  return {
    provide: {
      api,
    },
  };
});
