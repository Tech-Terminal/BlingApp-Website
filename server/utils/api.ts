import type { H3Event } from "h3";

const createApiClient = (event: H3Event) => {
  const config = useRuntimeConfig(event);

  return $fetch.create({
    baseURL: config.backendBase,

    headers: {
      // common headers
    },
  });
};
export default createApiClient;
