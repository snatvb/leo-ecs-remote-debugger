import { Either } from 'monad-maniac'

export const jsonParse = (value: string): Either.Shape<Error, object> => {
  try {
    return Either.right(JSON.parse(value))
  } catch (error) {
    return Either.left(error)
  }
}
