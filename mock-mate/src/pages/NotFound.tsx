
import { Link } from "react-router"

function NotFound() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Page not found</h1>
      <p className="mt-2 text-slate-400">
        The page you're looking for doesn't exist.
      </p>
      <Link to="/" className="mt-4 inline-block text-indigo-400 hover:text-indigo-300">
        Go back home
      </Link>
    </div>
  )
}

export default NotFound
