
import type { ReactNode } from "react"
import { Navigate, useLocation } from "react-router"
import { useAuth } from "../context/AuthContext"

function ProtectedRoute({ children }: { children: ReactNode }) {
  const { session, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="py-24 text-center text-slate-400">
        Checking your session...
      </div>
    )
  }

  if (!session) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    )
  }

  return <>{children}</>
}

export default ProtectedRoute
