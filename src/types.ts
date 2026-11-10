// What the API sends, field by field. Compare with the JSON you saw in week 4.
export type Task = {
  id: number;
  title: string;
  done: boolean;
  project_id: number | null;
};

// What PATCH /tasks/{id} accepts: every field may be left out.
export type TaskChanges = { title?: string; done?: boolean };
export type TokenResponse = { access_token: string; token_type: string };
export type User = { id: number; email: string };
export type Session = { token: string; user: User }; // what the browser remembers after a login

// Exactly one of three shapes, never a mix of them.
export type LoadState<T> =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "ready"; data: T };;

  





