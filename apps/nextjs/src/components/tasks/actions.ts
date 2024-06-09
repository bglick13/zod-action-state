"use server";

import type { z } from "zod";

import type { taskForm, TaskListState } from "./types";

export async function fakeLongTask(
  previousState: TaskListState,
  data: z.infer<typeof taskForm>,
) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return data;
}
