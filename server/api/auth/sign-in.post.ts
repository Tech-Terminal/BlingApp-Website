import createApiClient from "~~/server/utils/api";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const apiClient = createApiClient(event);

  const response = await apiClient<ApiResponse>("/auth/sign-in", {
    method: "POST",
    body,
  });
  return response.data;
});
