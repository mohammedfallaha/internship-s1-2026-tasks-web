import { expect, test } from "vitest";
import { ApiError } from "./api";
import { countOpen } from "./tasks";
import type { Task } from "./types";

const tasks: Task[] = [
  { id: 1, title: "Buy milk", done: false, project_id: null },
  { id: 2, title: "Learn React", done: true, project_id: null },
];

test("countOpen counts only the tasks that are not done", () => {
  expect(countOpen(tasks)).toBe(1);
  expect(countOpen([])).toBe(0);
});

test("ApiError keeps the status and the API's message", () => {
  const err = new ApiError(401, "wrong email or password");
  expect(err.status).toBe(401);
  expect(err.message).toBe("wrong email or password");
});