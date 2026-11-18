
import { Link } from "react-router"

function NotFound() {
  return (
    <div className="py-24 text-center">
      <h1 className="text-6xl font-bold">404</h1>

      <p className="mt-4 text-slate-400">
        That page does not exist - not even for the AI.
      </p>

      <Link
        to="/"
        className="mt-8 inline-block rounded-xl bg-indigo-500 px-6 py-3 font-semibold text-white hover:bg-indigo-400"
      >
        Back to safety
      </Link>
    </div>
  )
}

export default NotFound
