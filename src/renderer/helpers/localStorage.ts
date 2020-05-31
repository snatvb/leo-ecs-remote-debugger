import { Maybe } from 'monad-maniac'
import { parseInteger } from './parseInteger'

export const loadByKey = (key: string): Maybe.Shape<string> => Maybe.of(localStorage.getItem(key))

export const loadByKeyNumber = (key: string): Maybe.Shape<number> => (
  loadByKey(key)
    .chain(parseInteger)
)
