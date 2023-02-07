export function getDateDiff(d2: Date, d1: Date): number {
  const diffTime = d2.getTime() - d1.getTime()
  return Math.round(diffTime / (1000 * 3600 * 24))
}

export function isSameDay(d2: Date, d1: Date): boolean {
  return d2.getFullYear() === d1.getFullYear()
    && d2.getMonth() === d1.getMonth()
    && d2.getDate() === d1.getDate()
}
