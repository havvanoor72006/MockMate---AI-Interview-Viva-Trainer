   import { useEffect, useState } from "react"
   import supabase from "./lib/supabaseClient"

   function App() {
     const [sessionCount, setSessionCount] = useState<number | null>(null)
     const [error, setError] = useState<string | null>(null)

     useEffect(() => {
       async function smoke() {
         const { count, error } = await supabase
           .from("sessions")
           .select("*", { count: "exact", head: true })
         if (error) setError(error.message)
         else setSessionCount(count ?? 0)
       }
       smoke()
     }, [])

     return (
       <div className="flex min-h-screen flex-col items-center justify-center bg-slate-950 text-slate-100">
         <h1 className="text-4xl font-bold text-indigo-400">MockMate</h1>
         {error ? (
           <p className="mt-4 text-red-400">Supabase says: {error}</p>
         ) : sessionCount === null ? (
           <p className="mt-4 text-slate-400">Counting sessions...</p>
         ) : (
           <p className="mt-4 text-slate-400">Sessions in the database: {sessionCount}</p>
         )}
       </div>
     )
   }

   export default App
   