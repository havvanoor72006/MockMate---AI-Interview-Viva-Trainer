
import type { ReactNode } from "react"
import { Navigate } from "react-router"
import { useAuth } from "../context/AuthContext"

function ProtectedRoute({ children }: { children: ReactNode }) {
  const { session, loading } = useAuth()

  if (loading) {
    return (
      <div className="py-24 text-center text-slate-400">
        Checking your session...
      </div>
    )
  }

  if (!session) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}

export default ProtectedRoute
