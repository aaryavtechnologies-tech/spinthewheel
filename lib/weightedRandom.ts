export function selectWeightedPrize<T extends { probability: number }>(items: T[]): T {
  const total = items.reduce((sum, item) => sum + item.probability, 0);
  let cursor = Math.random() * total;
  for (const item of items) { cursor -= item.probability; if (cursor <= 0) return item; }
  return items[items.length - 1];
}
