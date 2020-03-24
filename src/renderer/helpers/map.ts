
export const map = <T, R>(f: (item: T, index: number) => R, iterator: IterableIterator<T>): R[] => {
  const result: R[] = []
  let counter = 0
  for (const item of iterator) {
    result.push(f(item, counter))
    counter++
  }

  return result
}
