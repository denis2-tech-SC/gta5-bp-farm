import { useCallback, useEffect, useState } from 'react'
import type { ProgressMap } from '../types'

const STORAGE_KEY = 'gta5rp-bp-tracker'
const SETTINGS_KEY = 'gta5rp-bp-settings'

export interface TrackerSettings {
  platinumVip: boolean
  promoX2: boolean
}

const defaultSettings: TrackerSettings = {
  platinumVip: false,
  promoX2: false,
}

function loadSettings(): TrackerSettings {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY)
    if (raw) return { ...defaultSettings, ...(JSON.parse(raw) as TrackerSettings) }
  } catch {
    /* ignore corrupt data */
  }
  return defaultSettings
}

function loadProgress(): ProgressMap {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw) as ProgressMap
  } catch {
    /* ignore corrupt data */
  }
  return {}
}

export function useProgressStorage() {
  const [progress, setProgress] = useState<ProgressMap>(loadProgress)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
  }, [progress])

  const updateQuest = useCallback((key: string, completed: boolean) => {
    setProgress((prev) => ({
      ...prev,
      [key]: { completed },
    }))
  }, [])

  const isQuestCompleted = useCallback(
    (key: string) => progress[key]?.completed ?? false,
    [progress],
  )

  const resetProgress = useCallback(() => {
    setProgress({})
  }, [])

  return { progress, updateQuest, isQuestCompleted, resetProgress }
}

export function useTrackerSettings() {
  const [settings, setSettings] = useState<TrackerSettings>(loadSettings)

  useEffect(() => {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings))
  }, [settings])

  const setPlatinumVip = useCallback((platinumVip: boolean) => {
    setSettings((prev) => ({ ...prev, platinumVip }))
  }, [])

  const setPromoX2 = useCallback((promoX2: boolean) => {
    setSettings((prev) => ({ ...prev, promoX2 }))
  }, [])

  return {
    ...settings,
    setPlatinumVip,
    setPromoX2,
  }
}

export function useCollapsedCategories() {
  const STORAGE_KEY_COLLAPSED = 'gta5rp-bp-collapsed'

  const [collapsed, setCollapsed] = useState<Record<string, boolean>>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_COLLAPSED)
      if (raw) return JSON.parse(raw) as Record<string, boolean>
    } catch {
      /* ignore */
    }
    return {}
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_COLLAPSED, JSON.stringify(collapsed))
  }, [collapsed])

  const toggle = useCallback((category: string) => {
    setCollapsed((prev) => ({ ...prev, [category]: !prev[category] }))
  }, [])

  const isCollapsed = useCallback(
    (category: string) => collapsed[category] ?? false,
    [collapsed],
  )

  return { toggle, isCollapsed }
}
