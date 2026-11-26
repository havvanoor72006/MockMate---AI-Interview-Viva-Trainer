
import { createContext, useContext, useEffect, useState } from "react"
import type { ReactNode } from "react"
import type { Session } from "@supabase/supabase-js"
import supabase from "../lib/supabaseClient"
import type { Profile } from "../types/database"

type AuthContextValue = {
  session: Session | null
  profile: Profile | null
  loading: boolean
}

const AuthContext = createContext<AuthContextValue | null>(null)

function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      setLoading(false)
    })

    const { data: sub } = supabase.auth.onAuthStateChange(
      (_event, newSession) => {
        setSession(newSession)
      }
    )

    return () => sub.subscription.unsubscribe()
  }, [])

  useEffect(() => {
    async function loadProfile() {
      if (!session) {
        setProfile(null)
        return
      }

      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session.user.id)
        .maybeSingle()

      setProfile((data as Profile) ?? null)
    }

    loadProfile()
  }, [session])

  const value: AuthContextValue = { session, profile, loading }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)

  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider")
  }

  return ctx
}

export default AuthProvider
