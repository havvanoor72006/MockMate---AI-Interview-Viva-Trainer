
import { Link } from "react-router"
import { TRACKS } from "../data/constants"

const STEPS = [
  {
    title: "1. Configure",
    body: "Pick a track, tap your topics, set difficulty and how many questions - 3 to 10.",
  },
  {
    title: "2. Answer",
    body: "Questions arrive one at a time on a timer. Answer like you would speak in the room.",
  },
  {
    title: "3. Report",
    body: "Every answer comes back scored, with strengths, improvements and a model answer.",
  },
]

function Landing() {
  return (
    <div>
      <section className="py-16 text-center">
        <h1 className="text-5xl font-bold">
          Practice the interview before it counts
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-400">
        MockMate runs AI mock interviews and viva practice: you configure the session,
        the AI asks, you answer, every answer gets scored.
        Prepare for university lab vivas and job interviews with structured practice and feedback.
       </p>

        <Link
          to="/login"
          className="mt-8 inline-block rounded-xl bg-indigo-500 px-6 py-3 font-semibold text-white hover:bg-indigo-400"
        >
          Start practicing
        </Link>
      
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-bold">How it works</h2>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {STEPS.map((step) => (
            <div
              key={step.title}
              className="rounded-2xl border border-slate-800 bg-slate-900 p-6"
            >
              <h3 className="font-semibold text-indigo-400">{step.title}</h3>
              <p className="mt-3 text-slate-400">{step.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-bold">Pick a track</h2>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TRACKS.map((track) => (
            <div
              key={track.label}
              className="rounded-2xl border border-slate-800 bg-slate-900 p-6 text-left"
            >
              <h3 className="font-semibold">{track.label}</h3>

              <div className="mt-3 flex flex-wrap gap-2">
                {track.topics.map((topic) => (
                  <span
                    key={topic}
                    className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>

  )
}

export default Landing
