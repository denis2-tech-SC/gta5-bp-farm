export interface Quest {
  title: string
  bp: number
  steps?: number
}

export interface QuestCategory {
  category: string
  quests: Quest[]
}

export interface QuestProgress {
  completed: boolean
}

export type ProgressMap = Record<string, QuestProgress>

export function questKey(category: string, title: string): string {
  return `${category}::${title}`
}
