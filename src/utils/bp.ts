export function getBpMultiplier(platinumVip: boolean, promoX2: boolean): number {
  let multiplier = 1
  if (platinumVip) multiplier *= 2
  if (promoX2) multiplier *= 2
  return multiplier
}

export function effectiveBp(baseBp: number, multiplier: number): number {
  return baseBp * multiplier
}
