import { useState } from "react"
import type { FormEvent } from "react"
import PageHeader from "../components/layout/PageHeader"
import { TRACKS } from "../data/constants"
import type { Difficulty } from "../types/database"

type FormState = {
  title: string
  track: string
  topics: string[]
  difficulty: Difficulty
  questionCount: number
  customTopic: string
}

function NewSession() {
  const [titleEdited, setTitleEdited] = useState(false)
  const [form, setForm] = useState<FormState>({
    title: "",
    track: TRACKS[0].label,
    topics: [],
    difficulty: "medium",
    questionCount: 5,
    customTopic: "",
  })
  function handleTrackChange(label: string) {
  setForm((f) => ({
    ...f,
    track: label,
    topics: [],
    title: titleEdited ? f.title : `${label} practice session`,
  }))
}
  const preset =
  TRACKS.find((t) => t.label === form.track)?.topics ?? []
  function toggleTopic(topic: string) {
  setForm((f) => ({
    ...f,
    topics: f.topics.includes(topic)
      ? f.topics.filter((t) => t !== topic)
      : [...f.topics, topic],
  }))
}
function addCustomTopic() {
  const topic = form.customTopic.trim()

  if (topic === "") return

  setForm((f) => ({
    ...f,
    topics: f.topics.includes(topic) ? f.topics : [...f.topics, topic],
    customTopic: "",
  }))
}
  console.log(form)
  void setForm
  function handleSubmit(e: FormEvent) {
  e.preventDefault()
  console.log(form)
}

 
return (
  <form onSubmit={handleSubmit}>
    <PageHeader
      title="New Session"
      subtitle="Configure your interview or viva practice session."
    />

    <div className="mt-8 grid gap-4 sm:grid-cols-2">
      <div>
        <label
          htmlFor="track"
          className="block text-sm text-slate-400"
        >
          Interview Track
        </label>

        <select
          id="track"
          value={form.track}
          onChange={(e) => handleTrackChange(e.target.value)}
          className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-2.5 text-slate-100"
        >
          {TRACKS.map((t) => (
            <option key={t.label} value={t.label}>
              {t.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="title"
          className="block text-sm text-slate-400"
        >
          Session Title
        </label>

        <input
          id="title"
          value={form.title}
          onChange={(e) => {
            setTitleEdited(true)
            setForm((f) => ({ ...f, title: e.target.value }))
          }}
          className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-2.5 text-slate-100 focus:border-indigo-400 focus:outline-none"
          placeholder="Enter session title"
        />
      </div>
    </div>
    <div className="mt-6">
  <h3 className="mb-3 text-sm font-medium text-slate-300">
    Select Topics
  </h3>

  <div className="flex flex-wrap gap-2">
    {preset.map((topic) => {
      const selected = form.topics.includes(topic)

      return (
        <button
          key={topic}
          type="button"
          onClick={() => toggleTopic(topic)}
          className={
            selected
              ? "rounded-full bg-indigo-500/30 px-3 py-1 text-sm text-indigo-200 ring-1 ring-indigo-400"
              : "rounded-full bg-slate-800 px-3 py-1 text-sm text-slate-300 hover:bg-slate-700"
          }
        >
          {topic}
        </button>
      )
    })}
    {form.topics
    .filter((topic) => !preset.includes(topic))
    .map((topic) => (
    <button
      key={topic}
      type="button"
      onClick={() => toggleTopic(topic)}
      className="rounded-full bg-indigo-500/30 px-3 py-1 text-sm text-indigo-200 ring-1 ring-indigo-400"
    >
      {topic} ×
    </button>
  ))}
  </div>
  <div className="mt-4 flex gap-2">
  <input
    value={form.customTopic}
    onChange={(e) =>
      setForm((f) => ({ ...f, customTopic: e.target.value }))
    }
    placeholder="Add a custom topic"
    className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-2.5 text-slate-100 focus:border-indigo-400 focus:outline-none"
  />
  <div className="mt-8">
  <button
    type="submit"
    className="rounded-xl bg-indigo-500 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-600"
  >
    Create Session
  </button>
  </div>

  <button
    type="button"
    onClick={addCustomTopic}
    className="rounded-xl bg-indigo-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-indigo-600"
  >
    Add
  </button>
</div>
</div>
  </form>
)
}

export default NewSession