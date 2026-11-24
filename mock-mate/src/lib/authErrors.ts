
// Translate common Supabase auth errors into helpful messages.
// Unknown errors pass through unchanged.

const FRIENDLY_AUTH_ERRORS: Array<{ match: string; message: string }> = [
  {
    match: "invalid login credentials",
    message: "Wrong email or password. Check both and try again.",
  },
  {
    match: "already registered",
    message: "That email already has an account. Try signing in instead.",
  },
  {
    match: "email not confirmed",
    message: "Confirm your email first - the link is in your inbox.",
  },
  {
    match: "password should be at least",
    message: "That password is too short for this project.",
  },
  {
    match: "unable to validate email",
    message: "That does not look like a valid email address.",
  },
  {
    match: "rate limit",
    message: "Too many attempts. Wait a minute and try again.",
  },
]

export function friendlyAuthError(raw: string): string {
  const haystack = raw.toLowerCase()
  const hit = FRIENDLY_AUTH_ERRORS.find((entry) =>
    haystack.includes(entry.match)
  )

  return hit ? hit.message : raw
}
