export type Result<OkType, ErrorType> =
  | {
      ok: OkType;
      error: null;
    }
  | {
      ok: null;
      error: ErrorType;
    };

export const isError = <OkType, ErrorType>(
  result: Result<OkType, ErrorType>,
): result is { ok: null; error: ErrorType } => {
  return result.ok === null;
};

export const isOk = <OkType, ErrorType>(
  result: Result<OkType, ErrorType>,
): result is { ok: OkType; error: null } => {
  return result.error === null;
};

export const ok = <OkType>(okValue: OkType) => ({
  ok: okValue,
  error: null,
});

export const error = <ErrorType>(errorValue: ErrorType) => ({
  ok: null,
  error: errorValue,
});

export const unwrapValue = <OkType>(result: { ok: OkType; error: null }) =>
  result.ok;

export const unwrapError = <ErrorType>(result: {
  ok: null;
  error: ErrorType;
}) => result.error;
