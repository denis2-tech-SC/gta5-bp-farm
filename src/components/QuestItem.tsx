import type { Quest } from '../types'
import { questKey } from '../types'

interface QuestItemProps {
  category: string
  quest: Quest
  bpMultiplier: number
  completed: boolean
  onCompletedChange: (key: string, completed: boolean) => void
  isQuestCompleted: (key: string) => boolean
}

export function QuestItem({
  category,
  quest,
  bpMultiplier,
  completed,
  onCompletedChange,
  isQuestCompleted,
}: QuestItemProps) {
  const key = questKey(category, quest.title)
  const displayBp = quest.bp * bpMultiplier
  const { steps } = quest

  const toggle = () => onCompletedChange(key, !completed)

  const handleStepClick = (stepIndex: number) => {
    // Count current consecutive filled steps from the beginning
    let currentCount = 0
    for (let i = 0; i < steps!; i++) {
      if (isQuestCompleted(`${key}::step::${i}`)) currentCount++
      else break
    }

    // Clicking the current top step toggles it off; otherwise fill up to clicked
    const newCount = currentCount === stepIndex + 1 ? stepIndex : stepIndex + 1

    for (let i = 0; i < steps!; i++) {
      onCompletedChange(`${key}::step::${i}`, i < newCount)
    }
    onCompletedChange(key, newCount === steps!)
  }

  return (
    <li>
      <div
        className={`rounded-md border transition-colors ${
          completed
            ? 'border-gta-green/30 bg-gta-green/5'
            : 'border-gta-border/60 bg-gta-bg/50'
        }`}
      >
        {/* Main toggle row */}
        <button
          type="button"
          role="checkbox"
          aria-checked={completed}
          onClick={toggle}
          className="group flex w-full cursor-pointer items-center gap-2 p-[10px] text-left"
        >
          <span
            className={`flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded border transition-all ${
              completed
                ? 'border-gta-green bg-gta-green text-gta-bg'
                : 'border-gta-muted/50 bg-transparent group-hover:border-gta-orange/60'
            }`}
          >
            {completed && (
              <svg
                className="h-2 w-2"
                viewBox="0 0 12 12"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M2 6l3 3 5-6" />
              </svg>
            )}
          </span>

          <span className="min-w-0 flex-1">
            <span
              className={`block break-words text-[13px] leading-snug ${
                completed ? 'text-gta-muted line-through' : 'text-gta-text'
              }`}
            >
              {quest.title}
            </span>
          </span>

          <span className="shrink-0 text-[10px] font-semibold leading-tight text-gta-orange">
            +{displayBp}
          </span>
        </button>

        {/* Step counter buttons */}
        {steps && (
          <div className="flex flex-wrap gap-[3px] px-[10px] pb-[10px]">
            {Array.from({ length: steps }, (_, i) => {
              const stepKey = `${key}::step::${i}`
              const stepDone = isQuestCompleted(stepKey)
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleStepClick(i)}
                  className={`flex h-[22px] w-[22px] cursor-pointer items-center justify-center rounded border text-[10px] font-medium transition-colors ${
                    stepDone
                      ? 'border-gta-green/50 bg-gta-green/20 text-gta-green'
                      : 'border-gta-border/60 bg-gta-surface text-gta-muted hover:border-gta-orange/50 hover:text-gta-orange'
                  }`}
                >
                  {i + 1}
                </button>
              )
            })}
          </div>
        )}
      </div>
    </li>
  )
}
