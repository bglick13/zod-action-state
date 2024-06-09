# Zod Action State

The motivation of this library is to bring all the type-safe good of React Hook Form to server actions. It also ties the form schema to the state that form mutates. Using `useActionState` and `useOptimistic`, we can automatically update the local UI using the submitted form data in a type-safe manner.

# Usage

1. Define the schema for your form, just like you would with React Hook Form:

```ts
export const taskForm = z.object({
  title: z.string().min(3),
  description: z.string(),
  assignees: z.array(assigneeForm),
});
```

2. Create a `FormProvider` that tell `Zod Action State`:

   i. What data to expect to be submitted (the form schema)

   ii. What (server) action to take on submit

   iii. How to update local state with the result of the action

```tsx
<FormProvider<typeof taskForm, TaskListState>
  formKey="new-task-form"
  schema={taskForm}
  initialFormValues={{ title: "", description: "", assignees: [] }}
  initialState={[]}
  updateFn={(previousState, data) => {
    return [data, ...previousState];
  }}
  action={fakeLongTask}
>
  <Tasks />
</FormProvider>
```

3. Use the form context in your components to render state and the form

```tsx
const tasksState = useFormContext<typeof taskForm, TaskListState>(
  "new-task-form",
);
return (
   <div>
   {tasksState.state.map((task, index) => <Task key={index} title={task.title} />)}
   <form action={tasksState.formAction} className="flex flex-col space-y-2">
      <div>
         <Input
         type="text"
         name="title"
         placeholder="Task Title"
         value={tasksState.formData.title}
         onChange={tasksState.handleChange}
         />
         <p>
         {tasksState.errors.title && (
            <span className="text-red-500">{tasksState.errors.title}</span>
         )}
         </p>
      </div>
      <Input
         type="text"
         name="description"
         placeholder="Task Description"
         value={tasksState.formData.description}
         onChange={tasksState.handleChange}
      />
      <Button type="submit" disabled={tasksState.isSubmitting}>
         Add Task
      </Button>
   </form>
   </div>
)

```
