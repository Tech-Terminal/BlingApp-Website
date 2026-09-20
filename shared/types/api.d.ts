export {};

declare global {
  type ApiValidationErrors = Record<string, string[]>;

  type ApiSuccessResponse<T = unknown> = {
    success: true;
    statusCode: number;
    message: string;
    data: T | null;
  };

  type ApiValidationResponse = {
    success: false;
    statusCode: 422;
    message: string;
    errors: ApiValidationErrors;
    data: null;
  };

  type ApiFailureResponse = {
    success: false;
    statusCode: number;
    message: string;
    errors?: ApiValidationErrors;
    data: null;
  };

  type ApiResponse<T = unknown> =
    | ApiSuccessResponse<T>
    | ApiValidationResponse
    | ApiFailureResponse;
}
