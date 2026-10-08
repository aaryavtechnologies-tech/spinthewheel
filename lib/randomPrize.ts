const getUniformIndex = (length: number) => {
  if (length <= 1) return 0;
  if (typeof crypto === "undefined" || !crypto.getRandomValues) return Math.floor(Math.random() * length);
  const range = 0x100000000;
  const limit = range - (range % length);
  const value = new Uint32Array(1);
  do crypto.getRandomValues(value); while (value[0] >= limit);
  return value[0] % length;
};

export function selectUniformPrize<T>(items: T[]): T {
  return items[getUniformIndex(items.length)];
}
