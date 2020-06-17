import { Maybe } from 'monad-maniac'
import { jsonMaybeParse } from './jsonMaybeParse'
import { parseInteger } from './parseInteger'

export const loadByKey = (key: string): Maybe.Shape<string> => Maybe.of(localStorage.getItem(key))

export const loadByKeyJSON = (key: string): Maybe.Shape<{[key: string]: any}> => (
  loadByKey(key)
    .chain(jsonMaybeParse)
)

export const loadByKeyNumber = (key: string): Maybe.Shape<number> => (
  loadByKey(key)
    .chain(parseInteger)
)
