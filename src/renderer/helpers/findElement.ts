import { Maybe } from 'monad-maniac'

export const findElement = <T>(findItem: T, iterator: IterableIterator<T>): Maybe.Shape<T> => {
  for (const item of iterator) {
    if (item === findItem) {
      return Maybe.of(item)
    }
  }

  return Maybe.nothing()
}
