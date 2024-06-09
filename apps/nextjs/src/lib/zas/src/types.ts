import type { infer as zodInfer, ZodObject, ZodRawShape } from "zod";

/**
 * Utility type to map the schema's shape to an error message shape
 */
export type ErrorShape<T> = {
  [K in keyof T]?: T[K] extends ZodObject<ZodRawShape>
    ? ErrorShape<zodInfer<T[K]>>
    : string;
};

/**
 * Props to instantiate a form context
 * @param key - The unique key for the form
 * @param schema - The Zod schema representing the form fields
 * @param initialState - The initial state passed to the `useActionState` hook
 * @param onSuccessfulSubmit - The server action to call if the submitted data is successfully parsed into shape `schema`
 * @param initialFormValues - Self explanatory
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface FormControllerProps<T extends ZodObject<any>, K> {
  formKey: string;
  schema: T;
  initialState: K;
  action: (previousState: K, data: zodInfer<T>) => Promise<zodInfer<T>>;
  updateFn: (previousState: K, data: zodInfer<T>) => K;
  initialFormValues: zodInfer<T>;
}

/**
 * The shape of the created global state for the form context
 * @param formData - The current state of the form inputs
 * @param errors - Validation errors after submit
 * @param formAction - The action returned by `useActionState`
 * @param success - Whether the form successfully submited. Can be used for post submit actions
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface FormControllerState<T extends ZodObject<any>, K>
  extends FormControllerProps<T, K> {
  formData: Partial<zodInfer<T>>;
  setFormField: (key: keyof zodInfer<T>, value: string | number) => void;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  isSubmitting: boolean;
  state: K;
  errors: ErrorShape<zodInfer<T>>;
  formAction: () => void;
  success: boolean | undefined;
}
