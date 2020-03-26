import { Maybe } from 'monad-maniac'

export const find = <T>(f: (item: T) => boolean, iterator: IterableIterator<T>): Maybe.Shape<T> => {
  for (const item of iterator) {
    if (f(item)) {
      return Maybe.of(item)
    }
  }

  return Maybe.nothing()
}
