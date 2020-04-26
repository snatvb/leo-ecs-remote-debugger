import * as fs from 'fs'
import { Either } from 'monad-maniac'

export const writeFile = async (filePath: string, data: any): Promise<Either.Shape<Error, string>> => {
  try {
    await fs.promises.writeFile(filePath, data)

    return Either.right('File wrote successfully')
  } catch (error) {
    return Either.left(error)
  }
}
