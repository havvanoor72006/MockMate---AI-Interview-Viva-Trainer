// Shared TypeScript shapes for the four Supabase tables.
// Column names match Supabase exactly (snake_case).

export type SessionStatus =
  | "generating"
  | "active"
  | "completed"
  | "abandoned"

export type Difficulty = "easy" | "medium" | "hard"

export interface Profile {
  id: string
  name: string
  target_role: string
  college: string | null
  created_at: string
}

export interface InterviewSession {
  id: string
  user_id: string
  title: string
  track: string
  topics: string
  difficulty: Difficulty
  question_count: number
  status: SessionStatus
  overall_score: number | null
  created_at: string
  completed_at: string | null
}

export interface Question {
  id: string
  session_id: string
  order_no: number
  topic: string
  difficulty: Difficulty
  prompt: string
  ideal_points: string
  answer_text: string | null
  answered_at: string | null
  created_at: string
}

export interface Evaluation {
  id: string
  question_id: string
  score: number
  strengths: string
  improvements: string
  model_answer: string
  created_at: string
}