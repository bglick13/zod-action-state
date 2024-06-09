"use client";

import type { PropsWithChildren } from "react";
import type { ZodObject } from "zod";
import { createContext, use } from "react";

import type { FormControllerProps, FormControllerState } from "./types";
import { useFormController } from "./useForm";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const FormContext = createContext<FormControllerState<any, any>>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  {} as FormControllerState<any, any>,
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function FormProvider<T extends ZodObject<any>, K>({
  children,
  ...props
}: PropsWithChildren<FormControllerProps<T, K>>) {
  console.log({ props });
  const value = useFormController<T, K>(props);
  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useFormContext<T extends ZodObject<any>, K>(key: string) {
  const values = use(FormContext) as FormControllerState<T, K>;
  if (!values) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  if (values.formKey !== key) {
    throw new Error(
      `useFormContext must be used within the same FormProvider (${key} !== ${values.formKey})`,
    );
  }
  return values;
}
