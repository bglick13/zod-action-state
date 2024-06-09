"use client";

import type { TaskListState } from "~/components/tasks/types";
import { fakeLongTask } from "~/components/tasks/actions";
import { Tasks } from "~/components/tasks/tasks";
import { taskForm } from "~/components/tasks/types";
import { FormProvider } from "~/lib/zas/src/form-provider";

export default function HomePage() {
  return (
    <main className="h-screen w-screen overflow-hidden">
      <div className="flex h-full w-full flex-col items-center justify-center">
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
      </div>
    </main>
  );
}
