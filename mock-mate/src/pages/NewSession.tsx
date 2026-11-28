
import { useState } from "react"
import type { FormEvent } from "react"
import PageHeader from "../components/layout/PageHeader"
import {
  TRACKS,
  DIFFICULTIES,
  MIN_QUESTIONS,
  MAX_QUESTIONS,
  TIME_BUDGET_MINUTES,
} from "../data/constants"
import type { Difficulty } from "../types/database"
import { normalizeTopics } from "../lib/topics"

type FormState = {
  title: string
  track: string
  topics: string[]
  difficulty: Difficulty
  questionCount: number
  customTopic: string
}

type FormErrors = {
  title?: string
  topics?: string
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

  const [errors, setErrors] = useState<FormErrors>({})

  const preset =
    TRACKS.find((t) => t.label === form.track)?.topics ?? []

  const minutesPerQuestion = TIME_BUDGET_MINUTES[form.difficulty]
  const totalMinutes = form.questionCount * minutesPerQuestion

  function validate(form: FormState): FormErrors {
    const errors: FormErrors = {}

    if (form.title.trim() === "") {
      errors.title = "Give the session a title."
    }

    if (normalizeTopics(form.topics).length === 0) {
      errors.topics = "Pick or add at least one topic."
    }

    return errors
  }

  function handleTrackChange(label: string) {
    setForm((f) => ({
      ...f,
      track: label,
      topics: [],
      title: titleEdited ? f.title : `${label} practice session`,
    }))

    setErrors((e) => ({ ...e, topics: undefined }))
  }

  function toggleTopic(topic: string) {
    setForm((f) => ({
      ...f,
      topics: f.topics.includes(topic)
        ? f.topics.filter((t) => t !== topic)
        : normalizeTopics([...f.topics, topic]),
    }))

    setErrors((e) => ({ ...e, topics: undefined }))
  }

  function addCustomTopic() {
    const rawTopic = form.customTopic.trim()

    if (rawTopic === "") return

    // Check whether the topic already exists in the preset list.
    // Use the preset spelling if it matches.
    const presetMatch = preset.find(
      (topic) => topic.toLowerCase() === rawTopic.toLowerCase()
    )

    const topicToAdd = presetMatch ?? rawTopic

    const updatedTopics = normalizeTopics([
      ...form.topics,
      topicToAdd,
    ])

    setForm((f) => ({
      ...f,
      topics: updatedTopics,
      customTopic: "",
    }))

    setErrors((e) => ({ ...e, topics: undefined }))
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()

    const nextErrors = validate(form)
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      return
    }

    console.log({
      ...form,
      title: form.title.trim(),
      topics: normalizeTopics(form.topics),
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <PageHeader
        title="New Session"
        subtitle="Configure your interview or viva practice session."
      />

      <div className="mt-8 space-y-8">

        {/* Track and Title */}
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label
              htmlFor="track"
              className="mb-2 block text-sm font-medium text-slate-300"
            >
              Interview Track
            </label>

            <select
              id="track"
              value={form.track}
              onChange={(e) => handleTrackChange(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-slate-100"
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
              className="mb-2 block text-sm font-medium text-slate-300"
            >
              Session Title
            </label>

            <input
              id="title"
              value={form.title}
              onChange={(e) => {
                setTitleEdited(true)
                setForm((f) => ({
                  ...f,
                  title: e.target.value,
                }))
                setErrors((errors) => ({
                  ...errors,
                  title: undefined,
                }))
              }}
              placeholder="Enter session title"
              className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-slate-100 focus:border-indigo-400 focus:outline-none"
            />

            {errors.title && (
              <p className="mt-2 text-sm text-red-400">
                {errors.title}
              </p>
            )}
          </div>
        </div>

        {/* Topics */}
        <section>
          <h2 className="mb-3 text-base font-semibold text-slate-200">
            Select Topics
          </h2>

          <div className="flex flex-wrap gap-3">
            {preset.map((topic) => {
              const selected = form.topics.some(
                (t) => t.toLowerCase() === topic.toLowerCase()
              )

              return (
                <button
                  key={topic}
                  type="button"
                  onClick={() => toggleTopic(topic)}
                  className={
                    selected
                      ? "rounded-full bg-indigo-500/30 px-4 py-2 text-sm text-indigo-200 ring-1 ring-indigo-400"
                      : "rounded-full bg-slate-800 px-4 py-2 text-sm text-slate-300 hover:bg-slate-700"
                  }
                >
                  {topic}
                </button>
              )
            })}

            {form.topics
              .filter(
                (topic) =>
                  !preset.some(
                    (p) => p.toLowerCase() === topic.toLowerCase()
                  )
              )
              .map((topic) => (
                <button
                  key={topic}
                  type="button"
                  onClick={() => toggleTopic(topic)}
                  className="rounded-full bg-indigo-500/30 px-4 py-2 text-sm text-indigo-200 ring-1 ring-indigo-400"
                >
                  {topic} ×
                </button>
              ))}
          </div>

          {errors.topics && (
            <p className="mt-3 text-sm text-red-400">
              {errors.topics}
            </p>
          )}

          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <input
              value={form.customTopic}
              onChange={(e) =>
                setForm((f) => ({
                  ...f,
                  customTopic: e.target.value,
                }))
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault()
                  addCustomTopic()
                }
              }}
              placeholder="Add a custom topic"
              className="min-w-0 flex-1 rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-slate-100 focus:border-indigo-400 focus:outline-none"
            />

            <button
              type="button"
              onClick={addCustomTopic}
              className="rounded-xl bg-indigo-500 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-600"
            >
              Add Topic
            </button>
          </div>
        </section>

        {/* Difficulty and Question Count */}
        <div className="grid gap-6 sm:grid-cols-2">

          <div>
            <label
              htmlFor="difficulty"
              className="mb-3 block text-sm font-medium text-slate-300"
            >
              Difficulty Level
            </label>

            <select
              id="difficulty"
              value={form.difficulty}
              onChange={(e) =>
                setForm((f) => ({
                  ...f,
                  difficulty: e.target.value as Difficulty,
                }))
              }
              className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-slate-100"
            >
              {DIFFICULTIES.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-3 block text-sm font-medium text-slate-300">
              Number of Questions
            </label>

            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                aria-label="Decrease question count"
                disabled={form.questionCount <= MIN_QUESTIONS}
                onClick={() =>
                  setForm((f) => ({
                    ...f,
                    questionCount: Math.max(
                      MIN_QUESTIONS,
                      f.questionCount - 1
                    ),
                  }))
                }
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-800 text-xl font-bold text-white hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
              >
                −
              </button>

              <span className="min-w-8 text-center text-xl font-semibold text-slate-100">
                {form.questionCount}
              </span>

              <button
                type="button"
                aria-label="Increase question count"
                disabled={form.questionCount >= MAX_QUESTIONS}
                onClick={() =>
                  setForm((f) => ({
                    ...f,
                    questionCount: Math.min(
                      MAX_QUESTIONS,
                      f.questionCount + 1
                    ),
                  }))
                }
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-800 text-xl font-bold text-white hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
              >
                +
              </button>

              <span className="text-sm text-slate-400">
                Questions (3–10)
              </span>
            </div>
          </div>
        </div>

        {/* Session Summary */}
        <aside className="rounded-2xl border border-indigo-500/30 bg-indigo-500/5 p-6">
          <h2 className="font-semibold text-indigo-300">
            Session Summary
          </h2>

          <p className="mt-3 font-medium text-slate-100">
            {form.title || "Untitled session"}
          </p>

          <p className="mt-2 text-sm text-slate-400">
            {form.track} - {form.difficulty}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {normalizeTopics(form.topics).map((topic) => (
              <span
                key={topic}
                className="rounded-full bg-slate-800 px-3 py-1.5 text-xs text-slate-300"
              >
                {topic}
              </span>
            ))}
          </div>

          <p className="mt-4 text-sm text-slate-400">
            {form.questionCount} questions - about {totalMinutes} minutes
            ({minutesPerQuestion} per answer)
          </p>
        </aside>

        {/* Submit */}
        <div className="flex justify-end pb-8">
          <button
            type="submit"
            className="w-full rounded-xl bg-indigo-500 px-8 py-3 font-semibold text-white transition hover:bg-indigo-600 sm:w-auto"
          >
            Create Session
          </button>
        </div>

      </div>
    </form>
  )
}

export default NewSession
