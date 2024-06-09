import type { ZodError, infer as zodInfer, ZodObject } from "zod";

import type { ErrorShape } from "./types";

/**
 * Convert ZodError to a more accessible format
 * @param error - The ZodError object
 * @returns A formatted error object
 */
export const formatZodError = <T>(error: ZodError<T>): ErrorShape<T> => {
  const formattedErrors: ErrorShape<T> = {};

  error.errors.forEach((err) => {
    let currentLevel = formattedErrors;
    for (let i = 0; i < err.path.length - 1; i++) {
      const part = err.path[i] as keyof typeof currentLevel;
      if (!currentLevel[part]) {
        // @ts-expect-error aaa
        currentLevel[part] = {};
      }
      const currentPart = currentLevel[part];
      currentLevel = currentPart!;
    }
    const lastPart = err.path[err.path.length - 1] as keyof typeof currentLevel;
    // @ts-expect-error aaa
    currentLevel[lastPart] = err.message;
  });

  return formattedErrors;
};

/**
 * Validate form data against a zod schema
 * @param formData - The FormData object to validate
 * @param schema - The zod schema to validate against
 * @returns An object with either the parsed data or validation errors
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const validateFormData = <T extends ZodObject<any>>(
  formData: zodInfer<T>,
  schema: T,
) => {
  return schema.safeParse(formData);
};
