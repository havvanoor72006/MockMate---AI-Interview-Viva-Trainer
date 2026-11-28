
// Trims every topic, drops empty values,
// and removes case-insensitive duplicates.

export function normalizeTopics(topics: string[]): string[] {
  const seen = new Set<string>()
  const result: string[] = []

  for (const raw of topics) {
    const topic = raw.trim()

    if (topic === "") continue

    const key = topic.toLowerCase()

    if (seen.has(key)) continue

    seen.add(key)
    result.push(topic)
  }

  return result
}
