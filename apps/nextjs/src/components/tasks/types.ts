import { z } from "zod";

export const assigneeForm = z.object({
  name: z.string().min(1),
  email: z.string(),
});

export const taskForm = z.object({
  title: z.string().min(3),
  description: z.string(),
  assignees: z.array(assigneeForm),
});

export interface AssigneesState {
  assignees: z.infer<typeof assigneeForm>[];
}

export type TaskListState = z.infer<typeof taskForm>[];
