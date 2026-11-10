import type { Task } from "./types";

export function countOpen(tasks: Task[]): number {
  return tasks.filter((task) => !task.done).length;
}