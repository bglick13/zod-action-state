import type { ChangeEvent } from "react";
import type { infer as zodInfer, ZodObject } from "zod";
import { useActionState, useCallback, useOptimistic, useState } from "react";

import type {
  ErrorShape,
  FormControllerProps,
  FormControllerState,
} from "./types";
import { formatZodError, validateFormData } from "./utils";

// Custom hook to manage form state and validation
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useFormController = <T extends ZodObject<any>, K>({
  formKey,
  schema,
  initialFormValues,
  initialState,
  action,
  updateFn,
}: FormControllerProps<T, K>): FormControllerState<T, K> => {
  const [formData, setFormData] = useState<zodInfer<T>>(initialFormValues);
  const [errors, setErrors] = useState<ErrorShape<zodInfer<T>>>({});
  const [success, setSuccess] = useState<boolean | undefined>(undefined);

  const [state, formAction, isSubmitting] = useActionState(
    async (previousState: Awaited<K>): Promise<K> => {
      const validatedData = validateFormData(formData, schema);
      if (!validatedData.success) {
        const formattedErrors = formatZodError(validatedData.error);
        setErrors(formattedErrors);
        setSuccess(false);
        return previousState;
      }

      setOptimisticState(validatedData.data);
      const serverResponse = await action(previousState, validatedData.data);
      setErrors({});
      setSuccess(true);
      setFormData(initialFormValues);

      return updateFn(previousState, serverResponse);
    },
    initialState as Awaited<K>,
  );
  const [optimisticState, setOptimisticState] = useOptimistic(state, updateFn);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = e.target;
    let parsedValue: string | number = value;
    if (type === "number") {
      parsedValue = +value;
    }
    setFormData((prev) => ({
      ...prev,
      [name]: parsedValue,
    }));
  };

  const setFormField = useCallback(
    (key: keyof zodInfer<T>, value: string | number) => {
      setFormData((prev) => ({
        ...prev,
        [key]: value,
      }));
    },
    [setFormData],
  );

  return {
    formData,
    setFormField,
    handleChange,
    formAction,
    isSubmitting,
    state: isSubmitting ? optimisticState : state,
    errors,
    success,
    formKey,
    schema,
    initialFormValues,
    initialState,
    action,
    updateFn,
  };
};
