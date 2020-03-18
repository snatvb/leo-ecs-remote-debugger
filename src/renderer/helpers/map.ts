
export const map = <T, R>(f: (item: T) => R, iterator: IterableIterator<T>): R[] => {
  const result: R[] = []
  for (const item of iterator) {
    result.push(f(item))
  }

  return result
}
