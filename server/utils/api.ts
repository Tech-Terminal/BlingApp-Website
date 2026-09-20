import type { H3Event } from "h3";

const createApiClient = (event: H3Event) => {
  const config = useRuntimeConfig(event);

  const locale = getCookie(event, "user-locale") ?? "ar";

  return $fetch.create({
    baseURL: config.backendBase,

    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Accept-Language": locale,
    },
  });
};
export default createApiClient;
