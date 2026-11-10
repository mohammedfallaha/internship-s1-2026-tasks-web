import { useState, type FormEvent } from "react";
import { ApiError, login, me } from "./api";
import type { Session } from "./types";

type Props = { onLogin: (session: Session) => void };

export function Login({ onLogin }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError("");
    try {
      const { access_token } = await login(email, password);
      const user = await me(access_token);
      onLogin({ token: access_token, user });
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "could not reach the API");
    }
  }

  return (
    <form className="login" onSubmit={handleSubmit}>
      <h1>Log in</h1>
      <label>
        Email
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </label>
      <label>
        Password
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </label>
      <button type="submit">Log in</button>
      {error !== "" && <p className="error">{error}</p>}
    </form>
  );
}