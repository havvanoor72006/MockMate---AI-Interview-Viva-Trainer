
import { Link, NavLink } from "react-router"

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `rounded-lg px-3 py-1.5 text-sm ${
    isActive ? "bg-indigo-500/20 text-indigo-300" : "text-slate-400 hover:text-slate-100"
  }`

function Navbar() {
  return (
    <header className="sticky top-0 z-10 border-b border-slate-800 bg-slate-950/80 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl flex-wrap items-center gap-3 px-4 py-3">
        <Link to="/" className="text-lg font-bold text-indigo-400">MockMate</Link>
        <div className="ml-auto flex flex-wrap items-center gap-1">
          <NavLink to="/" end className={linkClass}>Home</NavLink>
          <NavLink to="/new" className={linkClass}>New Session</NavLink>
          <NavLink to="/dashboard" className={linkClass}>Dashboard</NavLink>
          <NavLink to="/login" className={linkClass}>Login</NavLink>
        </div>
        {/* week 2 fills this slot with the signed-in profile name */}
      </nav>
    </header>
  )
}

export default Navbar
