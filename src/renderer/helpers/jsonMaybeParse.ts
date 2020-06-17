import { Maybe } from 'monad-maniac'

export const jsonMaybeParse = (json: string) => {
  try {
    return Maybe.of(JSON.parse(json))
  } catch (_) {
    return Maybe.nothing()
  }
}
