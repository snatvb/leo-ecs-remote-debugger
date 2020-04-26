import { jsonParse } from '@utils/jsonParse'
import { Either } from 'monad-maniac'
import { readFile } from './readFile'

export const readJsonFile = async (filePath: string): Promise<Either.Shape<Error, object>> => {
  const file = await readFile(filePath)

  return (
    file
      .map((buffer) => buffer.toString())
      .chain(jsonParse)
  )
}
