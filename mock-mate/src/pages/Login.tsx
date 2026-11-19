
import { useState } from "react"
import PageHeader from "../components/layout/PageHeader"

type AuthMode = "signup" | "signin"

function Login() {
  const [mode, setMode] = useState<AuthMode>("signin")

  return (
    <div className="mx-auto max-w-md">
      <PageHeader
        title="Welcome to MockMate"
        subtitle="Sign in to start a session - or create your practice account."
      />

      <div className="mb-4 grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => setMode("signin")}
          className={mode === "signin"
            ? "rounded-xl bg-indigo-500/20 px-4 py-2 text-indigo-300"
            : "rounded-xl px-4 py-2 text-slate-400"}
        >
          Sign in
        </button>

        <button
          type="button"
          onClick={() => setMode("signup")}
          className={mode === "signup"
            ? "rounded-xl bg-indigo-500/20 px-4 py-2 text-indigo-300"
            : "rounded-xl px-4 py-2 text-slate-400"}
        >
          Sign up
        </button>
      </div>

      <form className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <p className="text-sm text-slate-400">
          {mode === "signup"
            ? "Fields arrive tomorrow: name, email, password, target role, college."
            : "Fields arrive tomorrow: email and password."}
        </p>
      </form>
    </div>
  )
}

export default Login
