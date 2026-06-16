import { useMemo } from 'react'
import { CategorySection } from './components/CategorySection'
import { Header } from './components/Header'
import { questCategories } from './data/quests'
import { useProgressStorage, useTrackerSettings } from './hooks/useLocalStorage'
import { questKey } from './types'
import { effectiveBp, getBpMultiplier } from './utils/bp'

export default function App() {
  const { updateQuest, isQuestCompleted, resetProgress } = useProgressStorage()
  const { platinumVip, promoX2, setPlatinumVip, setPromoX2 } =
    useTrackerSettings()

  const bpMultiplier = getBpMultiplier(platinumVip, promoX2)

  const stats = useMemo(() => {
    let totalBp = 0
    let earnedBp = 0
    let totalCount = 0
    let completedCount = 0

    for (const { category, quests } of questCategories) {
      for (const quest of quests) {
        const questBp = effectiveBp(quest.bp, bpMultiplier)
        totalBp += questBp
        totalCount++
        const completed = isQuestCompleted(questKey(category, quest.title))
        if (completed) {
          earnedBp += questBp
          completedCount++
        }
      }
    }

    return {
      totalBp,
      earnedBp,
      remainingBp: totalBp - earnedBp,
      completedCount,
      totalCount,
    }
  }, [isQuestCompleted, bpMultiplier])

  return (
    <div className="min-h-dvh pb-4">
      <Header
        {...stats}
        multiplier={bpMultiplier}
        platinumVip={platinumVip}
        promoX2={promoX2}
        onPlatinumVipChange={setPlatinumVip}
        onPromoX2Change={setPromoX2}
        onReset={resetProgress}
      />

      <main
        style={{ gridTemplateColumns: `repeat(${questCategories.length}, 1fr)` }}
        className="grid gap-2 px-2 py-2 sm:px-3"
      >
        {questCategories.map((data) => (
          <CategorySection
            key={data.category}
            data={data}
            bpMultiplier={bpMultiplier}
            isQuestCompleted={isQuestCompleted}
            onCompletedChange={updateQuest}
          />
        ))}
      </main>

      <footer className="px-2 pb-3 text-center text-[10px] text-gta-muted sm:px-3">
        Прогресс сохраняется автоматически · данные в localStorage
      </footer>
    </div>
  )
}
