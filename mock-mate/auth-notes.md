# MockMate Authentication Notes

## 1. Two-Layer Authentication Model

MockMate uses Supabase Auth and a separate profiles table to manage users.

When a new user signs up, `supabase.auth.signUp({ email, password })` creates an authentication user in Supabase Auth and returns the user's ID.

After signup, the application inserts the user's additional details into the `profiles` table, including:
- `id`
- `name`
- `target_role`
- `college`

The profile's `id` uses the same ID returned by Supabase Auth. This connects the authentication user to their profile.

The `sessions` table uses `user_id` to reference `profiles.id`. This ensures every practice session belongs to a real registered user.

Although `profiles.id` has a default UUID generator, the application overrides that default by explicitly passing the authentication user's ID.

## 2. Email Confirmation Setting

Email confirmation is currently turned OFF in the Supabase dashboard for development.

This allows signup to return a working session immediately without requiring the user to verify their email first.

**Important:** Email confirmation must be re-enabled before MockMate is released to production.

## 3. Authentication Functions

This week, MockMate uses three Supabase Auth functions:

1. `signUp` – Creates a new user account using an email and password.
2. `signInWithPassword` – Signs in an existing user using their email and password.
3. `signOut` – Signs the current user out of the application.

## 4. Password Security

MockMate never stores user passwords in its own database or localStorage. Supabase Auth securely manages passwords, while the application works with the authentication session.

## Week 2 – Authentication Completion Test Log

| Test Case | Observed Result | Verdict |
|---|---|---|
| Wrong password | "Wrong email or password. Check both and try again." | Passed |
| Form value retention | Email and password remained in the fields after failed sign-in. | Passed |
| Duplicate signup | "That email already has an account. Try signing in instead." | Passed |
| Protected route – Dashboard | Redirected to Login and returned to Dashboard after sign-in. | Passed |
| Protected route – Report | Redirected to Login and returned to /report/abc after sign-in. | Passed |
| Session persistence | Remained signed in after refreshing the Dashboard. | Passed |
| Switching authentication modes | Error, success and field validation messages are cleared. | Passed |
| Form submission state | All five fields and the submit button are disabled while submitting. | Passed |
| Mobile Navbar | Checked at 375px viewport width. | Passed |
| Unconfirmed email | Deferred; will be tested later using a separate test account. | Pending |

### Development Notes
- Email confirmation remains disabled during development for easier testing.
- Protected routes remember the originally requested page.
- Successful authentication redirects users to their requested page or Dashboard by default.
- Authentication errors are displayed using friendly messages.
