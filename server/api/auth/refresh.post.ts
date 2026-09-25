import type { AppClient } from "~~/shared/types/models";
import { refreshTokens } from "~~/server/utils/refresh";

export default defineEventHandler(
  async (event): Promise<ApiSuccessResponse<AppClient>> => {
    const tokens = await refreshTokens(event);

    if (!tokens) {
      throw createError({
        statusCode: 401,
        statusMessage: "Unauthorized",
      });
    }

    return {
      success: true,
      statusCode: 200,
      message: "",
      data: tokens.client,
    };
  },
);
