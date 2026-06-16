import type { QuestCategory } from '../types'
import { questKey } from '../types'
import { effectiveBp } from '../utils/bp'
import { QuestItem } from './QuestItem'

interface CategorySectionProps {
  data: QuestCategory
  bpMultiplier: number
  isQuestCompleted: (key: string) => boolean
  onCompletedChange: (key: string, completed: boolean) => void
}

const categoryIcons: Record<string, string> = {
  Легкие: '⚡',
  Средние: '🔥',
  Совместные: '👥',
  'Не хочется': '😴',
  Фракционные: '🏛️',
}

const categoryStyles: Record<string, { gradient: string; border: string; accent: string }> = {
  Легкие: {
    gradient: 'linear-gradient(160deg, rgba(59,130,246,0.18) 0%, rgba(20,20,28,1) 55%)',
    border: 'rgba(59,130,246,0.40)',
    accent: 'rgba(59,130,246,0.7)',
  },
  Средние: {
    gradient: 'linear-gradient(160deg, rgba(249,115,22,0.18) 0%, rgba(20,20,28,1) 55%)',
    border: 'rgba(249,115,22,0.40)',
    accent: 'rgba(249,115,22,0.7)',
  },
  Совместные: {
    gradient: 'linear-gradient(160deg, rgba(168,85,247,0.18) 0%, rgba(20,20,28,1) 55%)',
    border: 'rgba(168,85,247,0.40)',
    accent: 'rgba(168,85,247,0.7)',
  },
  'Не хочется': {
    gradient: 'linear-gradient(160deg, rgba(100,116,139,0.16) 0%, rgba(20,20,28,1) 55%)',
    border: 'rgba(100,116,139,0.35)',
    accent: 'rgba(100,116,139,0.65)',
  },
  Фракционные: {
    gradient: 'linear-gradient(160deg, rgba(16,185,129,0.18) 0%, rgba(20,20,28,1) 55%)',
    border: 'rgba(16,185,129,0.40)',
    accent: 'rgba(16,185,129,0.7)',
  },
}

const defaultStyle = {
  gradient: 'linear-gradient(160deg, rgba(136,136,160,0.12) 0%, rgba(20,20,28,1) 55%)',
  border: 'rgba(136,136,160,0.30)',
  accent: 'rgba(136,136,160,0.6)',
}

export function CategorySection({
  data,
  bpMultiplier,
  isQuestCompleted,
  onCompletedChange,
}: CategorySectionProps) {
  const { category, quests } = data
  const icon = categoryIcons[category] ?? '📋'
  const style = categoryStyles[category] ?? defaultStyle

  const earnedInCategory = quests.reduce((sum, q) => {
    const completed = isQuestCompleted(questKey(category, q.title))
    return sum + (completed ? effectiveBp(q.bp, bpMultiplier) : 0)
  }, 0)

  const totalInCategory = quests.reduce(
    (sum, q) => sum + effectiveBp(q.bp, bpMultiplier),
    0,
  )
  const completedInCategory = quests.filter((q) =>
    isQuestCompleted(questKey(category, q.title)),
  ).length

  return (
    <section
      style={{ background: style.gradient, borderColor: style.border }}
      className="flex min-w-0 flex-col overflow-hidden rounded-lg border"
    >
      {/* Header */}
      <div className="flex items-start gap-1 px-2 py-2">
        <span className="text-sm leading-none">{icon}</span>
        <div className="min-w-0 flex-1">
          <h2 className="font-display text-sm leading-tight tracking-wide text-gta-text">
            {category}
          </h2>
          <p className="text-[10px] leading-tight text-gta-muted">
            {completedInCategory}/{quests.length} · {earnedInCategory}/{totalInCategory} BP
          </p>
        </div>
      </div>

      {/* Quest list */}
      <ul
        style={{ borderTopColor: style.border }}
        className="flex flex-col border-t p-1"
      >
        {quests.map((quest) => {
          const key = questKey(category, quest.title)
          return (
            <QuestItem
              key={key}
              category={category}
              quest={quest}
              bpMultiplier={bpMultiplier}
              completed={isQuestCompleted(key)}
              onCompletedChange={onCompletedChange}
              isQuestCompleted={isQuestCompleted}
            />
          )
        })}
      </ul>
    </section>
  )
}
