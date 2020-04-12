
export const forEach = <T, R>(f: (item: T, index: number) => R, iterator: IterableIterator<T>): void => {
  let counter = 0
  for (const item of iterator) {
    f(item, counter)
    counter++
  }
}
