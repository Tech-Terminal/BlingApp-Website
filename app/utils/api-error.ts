import { FetchError } from "ofetch";
import { toast } from "~/utils/toast";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

export const isApiFailureResponse = (
  value: unknown,
): value is ApiFailureResponse =>
  isRecord(value) &&
  value.success === false &&
  typeof value.message === "string";

export const getApiFailure = (
  error: unknown,
): ApiFailureResponse | undefined => {
  if (!(error instanceof FetchError)) {
    return undefined;
  }

  if (isApiFailureResponse(error.data)) {
    return error.data;
  }

  return undefined;
};

export const toFormErrors = (
  errors: ApiValidationErrors,
): Record<string, string> =>
  Object.fromEntries(
    Object.entries(errors).map(([field, messages]) => [
      field,
      messages[0] ?? "",
    ]),
  );

type SetFormErrors = (errors: Record<string, string>) => void;

export const handleApiFormError = (
  error: unknown,
  setErrors: SetFormErrors,
): boolean => {
  const payload = getApiFailure(error);

  if (payload?.statusCode === 422 && payload.errors) {
    setErrors(toFormErrors(payload.errors));
    toast.error(payload.message);
    return true;
  }

  toast.error(
    payload?.message ?? (error instanceof Error ? error.message : ""),
  );

  return false;
};
