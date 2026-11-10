import { useEffect, useState, type FormEvent } from "react";
import { ApiError, createTask, deleteTask, listTasks, updateTask } from "./api";
import { countOpen } from "./tasks";
import type { LoadState, Task } from "./types";

type Props = { token: string; onLogout: () => void };

export function TaskList({ token, onLogout }: Props) {
  const [state, setState] = useState<LoadState<Task[]>>({ status: "loading" });
  const [title, setTitle] = useState("");

  useEffect(() => {
    listTasks(token)
      .then((tasks) => setState({ status: "ready", data: tasks }))
      .catch((err: unknown) => {
        if (err instanceof ApiError && err.status === 401) {
          onLogout(); // the token expired: back to the login form
        } else {
          setState({ status: "error", message: err instanceof Error ? err.message : String(err) });
        }
      });
  }, [token, onLogout]);

  if (state.status === "loading") return <p>Loading...</p>;
  if (state.status === "error") return <p className="error">{state.message}</p>;
  const tasks = state.data;

  async function handleAdd(event: FormEvent) {
    event.preventDefault();
    const task = await createTask(token, title);
    setState({ status: "ready", data: [...tasks, task] });
    setTitle("");
  }
  async function handleToggle(task: Task) {
    const updated = await updateTask(token, task.id, { done: !task.done });
    setState({ status: "ready", data: tasks.map((t) => (t.id === updated.id ? updated : t)) });
  }
  async function handleDelete(id: number) {
    await deleteTask(token, id);
    setState({ status: "ready", data: tasks.filter((t) => t.id !== id) });
  }

  return (
    <>
      <form onSubmit={handleAdd}>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="New task" required />
        <button type="submit">Add</button>
      </form>
      <p>{countOpen(tasks)} open</p>
      <ul>
        {tasks.map((task) => (
          <li key={task.id} className={task.done ? "done" : undefined}>
            <input type="checkbox" checked={task.done} onChange={() => handleToggle(task)} />
            <span>{task.title}</span>
            <button onClick={() => handleDelete(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </>
  );
}