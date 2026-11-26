
import { Link, NavLink } from "react-router"
import { useAuth } from "../../context/AuthContext"
import supabase from "../../lib/supabaseClient"

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `rounded-lg px-3 py-1.5 text-sm ${
    isActive
      ? "bg-indigo-500/20 text-indigo-300"
      : "text-slate-400 hover:text-slate-100"
  }`

function Navbar() {
  const { session, profile } = useAuth()
  async function handleSignOut() {
  const { error } = await supabase.auth.signOut()

  if (error) {
    console.error("Sign out failed:", error.message)
  }
}
  return (
    <header className="sticky top-0 z-10 border-b border-slate-800 bg-slate-950/80 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl flex-wrap items-center gap-3 px-4 py-3">
        <Link to="/" className="text-lg font-bold text-indigo-400">
          MockMate
        </Link>

        <div className="ml-auto flex flex-wrap items-center gap-1">
          <NavLink to="/" end className={linkClass}>
            Home
          </NavLink>

          <NavLink to="/new" className={linkClass}>
            New Session
          </NavLink>

          <NavLink to="/dashboard" className={linkClass}>
            Dashboard
          </NavLink>

          {session ? (
  <>
        <span className="rounded-lg px-3 py-1.5 text-sm font-medium text-indigo-300">
        {profile?.name ?? "Practitioner"}
       </span>

         <button
         onClick={handleSignOut}
         className="rounded-lg px-3 py-1.5 text-sm text-slate-400 hover:text-slate-100"
     >
         Sign Out
         </button>
  </>
) : (
            <NavLink to="/login" className={linkClass}>
              Login
            </NavLink>
          )}
        </div>
      </nav>
    </header>
  )
}

export default Navbar
