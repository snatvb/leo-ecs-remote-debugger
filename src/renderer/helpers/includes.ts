export const includes = <T>(f: (item: T) => boolean, iterator: IterableIterator<T>): boolean => {
  for (const item of iterator) {
    if (f(item)) {
      return true
    }
  }

  return false
}
