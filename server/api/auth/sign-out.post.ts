import createApiClient from "~~/server/utils/api";
import { clearTokens } from "~~/server/utils/tokens";

export default defineEventHandler(async (event) => {
  const apiClient = createApiClient(event);

  try {
    return await apiClient<ApiResponse<null>>("/auth/sign-out", {
      method: "POST",
    });
  } finally {
    clearTokens(event);
  }
});
