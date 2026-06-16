interface HeaderProps {
  totalBp: number
  earnedBp: number
  remainingBp: number
  completedCount: number
  totalCount: number
  multiplier: number
  platinumVip: boolean
  promoX2: boolean
  onPlatinumVipChange: (value: boolean) => void
  onPromoX2Change: (value: boolean) => void
  onReset: () => void
}

export function Header({
  totalBp,
  earnedBp,
  remainingBp,
  completedCount,
  totalCount,
  multiplier,
  platinumVip,
  promoX2,
  onPlatinumVipChange,
  onPromoX2Change,
  onReset,
}: HeaderProps) {
  const percent = totalBp > 0 ? Math.round((earnedBp / totalBp) * 100) : 0
  const questPercent =
    totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0

  const handleReset = () => {
    if (
      window.confirm(
        'Сбросить весь прогресс? Отмеченные задания будут очищены.',
      )
    ) {
      onReset()
    }
  }

  return (
    <header className="sticky top-0 z-50 border-b border-gta-border bg-gta-bg/90 backdrop-blur-md">
      <div className="mx-auto max-w-[1600px] px-2 py-2.5 sm:px-3">
        <div className="mb-2 flex items-center justify-between gap-2">
          <div className="flex items-baseline gap-2">
            <h1 className="font-display text-xl leading-none tracking-wide text-gta-text">
              Bonus Points
            </h1>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-gta-orange">
              GTA 5 RP
            </span>
          </div>
          <span className="text-[10px] text-gta-muted">
            {completedCount}/{totalCount}
          </span>
        </div>

        <div className="mb-2 flex flex-wrap items-center gap-1.5">
          <Toggle
            label="Platinum VIP"
            hint="×2"
            checked={platinumVip}
            onChange={onPlatinumVipChange}
          />
          <Toggle
            label="Акции"
            hint="×2"
            checked={promoX2}
            onChange={onPromoX2Change}
          />
          {multiplier > 1 && (
            <span className="rounded border border-gta-orange/40 bg-gta-orange/10 px-1.5 py-0.5 text-[10px] font-semibold text-gta-orange">
              ×{multiplier} BP
            </span>
          )}
          <button
            type="button"
            onClick={handleReset}
            className="ml-auto rounded border border-gta-border bg-gta-surface px-2 py-0.5 text-[10px] font-medium text-gta-muted transition-colors hover:border-red-500/40 hover:bg-red-500/10 hover:text-red-400"
          >
            Сбросить
          </button>
        </div>

        <div className="grid grid-cols-3 gap-1.5">
          <StatCard label="Итого" value={totalBp} accent="orange" />
          <StatCard label="Заработано" value={earnedBp} accent="green" />
          <StatCard label="Осталось" value={remainingBp} accent="muted" />
        </div>

        <div className="mt-2">
          <div className="mb-1 flex justify-between text-[10px] text-gta-muted">
            <span>Прогресс</span>
            <span className="font-medium text-gta-orange">
              {percent}% BP · {questPercent}% заданий
            </span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-gta-surface">
            <div
              className="h-full rounded-full bg-gradient-to-r from-gta-orange-dim to-gta-orange transition-all duration-500 ease-out"
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>
      </div>
    </header>
  )
}

function Toggle({
  label,
  hint,
  checked,
  onChange,
}: {
  label: string
  hint: string
  checked: boolean
  onChange: (value: boolean) => void
}) {
  return (
    <label
      className={`flex cursor-pointer items-center gap-1 rounded border px-1.5 py-0.5 text-[10px] transition-colors ${
        checked
          ? 'border-gta-orange/50 bg-gta-orange/10 text-gta-text'
          : 'border-gta-border bg-gta-surface text-gta-muted hover:bg-gta-surface-hover'
      }`}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="peer sr-only"
      />
      <span
        className={`flex h-3 w-3 shrink-0 items-center justify-center rounded border transition-colors ${
          checked
            ? 'border-gta-orange bg-gta-orange text-gta-bg'
            : 'border-gta-muted/50 bg-transparent'
        }`}
      >
        {checked && (
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
      <span>
        {label}{' '}
        <span className={checked ? 'text-gta-orange' : 'text-gta-muted/70'}>
          {hint}
        </span>
      </span>
    </label>
  )
}

function StatCard({
  label,
  value,
  accent,
}: {
  label: string
  value: number
  accent: 'orange' | 'green' | 'muted'
}) {
  const valueColor = {
    orange: 'text-gta-orange',
    green: 'text-gta-green',
    muted: 'text-gta-text',
  }[accent]

  return (
    <div className="rounded-md border border-gta-border bg-gta-surface px-2 py-1.5">
      <p className="text-[9px] font-medium uppercase tracking-wider text-gta-muted">
        {label}
      </p>
      <p className={`font-display text-xl leading-none ${valueColor}`}>
        {value}
      </p>
    </div>
  )
}
