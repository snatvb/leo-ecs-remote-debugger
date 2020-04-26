import * as fs from 'fs'
import { Either } from 'monad-maniac'

export const readFile = async (filePath: string): Promise<Either.Shape<Error, Buffer>> => {
  try {
    const file = await fs.promises.readFile(filePath)

    return Either.right(file)
  } catch (error) {
    return Either.left(error)
  }
}
