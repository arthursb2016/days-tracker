export function getDateDiff(d2: Date, d1: Date): number {
  const diffTime = d2.getTime() - d1.getTime()
  return Math.ceil(diffTime / (1000 * 3600 * 24))
}
