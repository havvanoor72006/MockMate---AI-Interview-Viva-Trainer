
import { useState } from "react"
import type { FormEvent } from "react"
import { TRACKS } from "../data/constants"
import supabase from "../lib/supabaseClient"
import { useLocation, useNavigate } from "react-router"
import { friendlyAuthError } from "../lib/authErrors"

type AuthMode = "signup" | "signin"

type SignupForm = {
  name: string
  email: string
  password: string
  targetRole: string
  college: string
}

type FieldErrors = Partial<Record<keyof SignupForm, string>>

function Login() {
  const [mode, setMode] = useState<AuthMode>("signin")
  const navigate = useNavigate()
  const location = useLocation()

  const from = (
    location.state as { from?: { pathname: string } } | null
  )?.from?.pathname

  const [signup, setSignup] = useState<SignupForm>({
    name: "",
    email: "",
    password: "",
    targetRole: TRACKS[0].label,
    college: "",
  })

  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  function updateField(field: keyof SignupForm, value: string) {
    setSignup((previous) => ({
      ...previous,
      [field]: value,
    }))

    setFieldErrors((previous) => ({
      ...previous,
      [field]: undefined,
    }))
  }

  function validateSignup(): boolean {
    const errors: FieldErrors = {}

    if (signup.name.trim().length < 2) {
      errors.name = "Name must contain at least 2 characters."
    }

    const email = signup.email.trim()

    if (!email.includes("@") || !email.split("@")[1]?.includes(".")) {
      errors.email = "Please enter a valid email address."
    }

    if (signup.password.length < 8) {
      errors.password = "Password must be at least 8 characters."
    }

    setFieldErrors(errors)

    return Object.keys(errors).length === 0
  }

  async function handleSignUp(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    if (!validateSignup()) return

    setIsSubmitting(true)

    try {
      const { data, error: authError } = await supabase.auth.signUp({
        email: signup.email.trim().toLowerCase(),
        password: signup.password,
      })

      if (authError) throw authError

      if (!data.user) {
        throw new Error(
          "Account creation did not return a user. Check your email confirmation settings."
        )
      }

      const { error: profileError } = await supabase
        .from("profiles")
        .insert({
          id: data.user.id,
          name: signup.name.trim(),
          target_role: signup.targetRole,
          college:
            signup.college.trim() === ""
              ? null
              : signup.college.trim(),
        })

      if (profileError) throw profileError

      setSuccess("Account created successfully.")
      navigate(from ?? "/dashboard")
    } catch (err) {
      console.error("Signup error:", err)

      setError(
        friendlyAuthError(
          err instanceof Error ? err.message : "Sign up failed."
        )
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleSignIn(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    // Validate before contacting Supabase
    const email = signup.email.trim().toLowerCase()
    const password = signup.password

    if (!email || !email.includes("@") || !email.includes(".")) {
      setError("Please enter a valid email address.")
      return
    }

    if (!password.trim()) {
      setError("Please enter your password.")
      return
    }

    setIsSubmitting(true)

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      setSuccess("Signed in successfully.")
      navigate(from ?? "/dashboard")
    } catch (err) {
      setError(
        friendlyAuthError(
          err instanceof Error ? err.message : "Sign in failed."
        )
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  function changeMode(nextMode: AuthMode) {
    setMode(nextMode)
    setError(null)
    setSuccess(null)
    setFieldErrors({})
  }

  const inputClass =
    "mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-indigo-500"

  return (
    <main className="mx-auto max-w-xl px-4 py-12">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-white">
          Welcome to MockMate
        </h1>
        <p className="mt-2 text-slate-400">
          Practice interviews and vivas with confidence.
        </p>
      </div>

      <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <div className="mb-6 grid grid-cols-2 gap-2 rounded-xl bg-slate-950 p-1">
          <button
            type="button"
            onClick={() => changeMode("signin")}
            className={`rounded-lg px-4 py-2 font-medium transition ${
              mode === "signin"
                ? "bg-indigo-500 text-white"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Sign in
          </button>

          <button
            type="button"
            onClick={() => changeMode("signup")}
            className={`rounded-lg px-4 py-2 font-medium transition ${
              mode === "signup"
                ? "bg-indigo-500 text-white"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Sign up
          </button>
        </div>

        <form
          onSubmit={
            mode === "signup" ? handleSignUp : handleSignIn
          }
          noValidate
        >
          <div className="space-y-5">
            {mode === "signup" && (
              <>
                <div>
                  <label className="font-medium text-slate-200">
                    Full name
                  </label>
                  <input
                    type="text"
                    value={signup.name}
                    onChange={(e) =>
                      updateField("name", e.target.value)
                    }
                    placeholder="Enter your full name"
                    className={inputClass}
                    disabled={isSubmitting}
                  />
                  {fieldErrors.name && (
                    <p className="mt-1 text-sm text-red-400">
                      {fieldErrors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label className="font-medium text-slate-200">
                    Target role
                  </label>
                  <select
                    value={signup.targetRole}
                    onChange={(e) =>
                      updateField("targetRole", e.target.value)
                    }
                    className={inputClass}
                    disabled={isSubmitting}
                  >
                    {TRACKS.map((track) => (
                      <option key={track.label} value={track.label}>
                        {track.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-medium text-slate-200">
                    College (optional)
                  </label>
                  <input
                    type="text"
                    value={signup.college}
                    onChange={(e) =>
                      updateField("college", e.target.value)
                    }
                    placeholder="Enter your college name"
                    className={inputClass}
                    disabled={isSubmitting}
                  />
                </div>
              </>
            )}

            <div>
              <label className="font-medium text-slate-200">
                Email address
              </label>
              <input
                type="email"
                value={signup.email}
                onChange={(e) =>
                  updateField("email", e.target.value)
                }
                placeholder="you@example.com"
                className={inputClass}
                disabled={isSubmitting}
              />
              {fieldErrors.email && (
                <p className="mt-1 text-sm text-red-400">
                  {fieldErrors.email}
                </p>
              )}
            </div>

            <div>
              <label className="font-medium text-slate-200">
                Password
              </label>
              <input
                type="password"
                value={signup.password}
                onChange={(e) =>
                  updateField("password", e.target.value)
                }
                placeholder={
                  mode === "signup"
                    ? "At least 8 characters"
                    : "Enter your password"
                }
                className={inputClass}
                disabled={isSubmitting}
              />
              {fieldErrors.password && (
                <p className="mt-1 text-sm text-red-400">
                  {fieldErrors.password}
                </p>
              )}
            </div>
          </div>

          {error && (
            <p className="mt-5 rounded-lg bg-red-500/10 p-3 text-sm text-red-400">
              {error}
            </p>
          )}

          {success && (
            <p className="mt-5 rounded-lg bg-green-500/10 p-3 text-sm text-green-400">
              {success}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-6 w-full rounded-xl bg-indigo-500 px-4 py-3 font-semibold text-white transition hover:bg-indigo-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting
              ? mode === "signup"
                ? "Creating account..."
                : "Signing in..."
              : mode === "signup"
                ? "Create account"
                : "Sign in"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-400">
          {mode === "signup"
            ? "Already have an account?"
            : "Don't have an account?"}{" "}
          <button
            type="button"
            onClick={() =>
              changeMode(mode === "signup" ? "signin" : "signup")
            }
            className="font-semibold text-indigo-400 hover:text-indigo-300"
          >
            {mode === "signup" ? "Sign in" : "Create account"}
          </button>
        </p>
      </section>
    </main>
  )
}

export default Login
