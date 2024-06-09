"use client";

import React from "react";

import type { taskForm, TaskListState } from "./types";
import { FormProvider, useFormContext } from "~/lib/zas/src/form-provider";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { fakeLongTask } from "./actions";
import { assigneeForm } from "./types";

function Task({ title }: { title: string }) {
  const taskState = useFormContext<typeof assigneeForm, TaskListState[number]>(
    `task-${title}`,
  );
  return (
    <Card className="w-[500px]">
      <CardHeader>
        <CardTitle>{taskState.state.title}</CardTitle>
        <CardDescription>{taskState.state.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-row flex-wrap space-x-2">
          <span className="pr-2">Assignees:</span>
          {taskState.state.assignees.map((assignee, index) => (
            <Badge key={index}>
              <p>{assignee.name}</p>
            </Badge>
          ))}
        </div>
        <form
          action={taskState.formAction}
          className="flex flex-col space-y-2 pt-4"
        >
          <div>
            <Input
              type="text"
              name="name"
              placeholder="Assignee Name"
              value={taskState.formData.name}
              onChange={taskState.handleChange}
            />
            {taskState.errors.name && (
              <span className="text-red-500">{taskState.errors.name}</span>
            )}
          </div>
          <Button type="submit" disabled={taskState.isSubmitting}>
            Add Assignee
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export function Tasks() {
  const tasksState = useFormContext<typeof taskForm, TaskListState>(
    "new-task-form",
  );
  return (
    <div className="flex flex-col space-y-4">
      <h1>Tasks</h1>
      <div className="h-[600px] space-y-4 overflow-y-auto">
        {tasksState.state.length ? (
          tasksState.state.map((task, index) => (
            <FormProvider<typeof assigneeForm, TaskListState[number]>
              key={`task-${task.title}`}
              formKey={`task-${task.title}`}
              schema={assigneeForm}
              initialFormValues={{ name: "", email: "" }}
              initialState={task}
              updateFn={(previousState, data) => {
                return {
                  ...previousState,
                  assignees: [...previousState.assignees, data],
                };
              }}
              // @ts-expect-error Too lazy to implement a real action for the sake of the demo, but you get the idea
              action={fakeLongTask}
            >
              <Task key={index} title={task.title} />
            </FormProvider>
          ))
        ) : (
          <p>No tasks left!</p>
        )}
      </div>
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
  );
}
