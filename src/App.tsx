import { useState } from "react";
import { Login } from "./Login";
import { TaskList } from "./TaskList";
import type { Session } from "./types";

const STORAGE_KEY = "tasks-web-session";

function loadSession(): Session | null {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved === null ? null : (JSON.parse(saved) as Session);
}

export default function App() {
  const [session, setSession] = useState<Session | null>(loadSession);

  function handleLogin(next: Session) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setSession(next);
  }
  function handleLogout() {
    localStorage.removeItem(STORAGE_KEY);
    setSession(null);
  }

  if (session === null) return <Login onLogin={handleLogin} />;
  return (
    <>
      <header>
        <h1>Tasks</h1>
        <span>{session.user.email}</span>
        <button onClick={handleLogout}>Log out</button>
      </header>
      <TaskList token={session.token} onLogout={handleLogout} />
    </>
  );
}