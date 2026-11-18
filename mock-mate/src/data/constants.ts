
import type { Difficulty, SessionStatus } from "../types/database"

export type Track = { label: string; topics: string[] }

export const TRACKS: Track[] = [
  { label: "Frontend Developer (React)", topics: ["React", "Hooks", "Routing", "State Management"] },
  { label: "JavaScript Core", topics: ["Closures", "Promises", "Event Loop", "ES6 Features"] },
  { label: "TypeScript", topics: ["Types", "Interfaces", "Generics", "Utility Types"] },
  { label: "DBMS Viva", topics: ["Normalization", "Joins", "Indexes", "Transactions"] },
  { label: "HR Round", topics: ["Introduction", "Strengths", "Projects", "Teamwork"] },
]

export const DIFFICULTIES: Difficulty[] = ["easy", "medium", "hard"]

export const SESSION_STATUS: SessionStatus[] = ["generating", "active", "completed", "abandoned"]

export const STATUS_COLORS: Record<SessionStatus, string> = {
  generating: "bg-amber-500/20 text-amber-400",
  active: "bg-blue-500/20 text-blue-400",
  completed: "bg-green-500/20 text-green-400",
  abandoned: "bg-red-500/20 text-red-400",
}

export const MIN_QUESTIONS = 3
export const MAX_QUESTIONS = 10

// minutes the runner allots per answer, by difficulty
export const TIME_BUDGET_MINUTES: Record<Difficulty, number> = {
  easy: 3,
  medium: 5,
  hard: 8,
}

// 0-10 score -> 0-100 percent, for badges and the report header
export function formatScore(score: number): number {
  return Math.round((score / 10) * 100)
}
