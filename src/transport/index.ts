import { IRemoteCommand, IRemoteCommandRaw, RemoteCommandType } from '@commonTypes/commands'
import { Either } from 'monad-maniac'
import { EntityChangedCommand } from './EntityChangedCommand'
import { EntityCreatedCommand } from './EntityCreatedCommand'
import { EntityDataResponseCommand } from './EntityDataResponseCommand'
import { EntityDestroyedCommand } from './EntityDestroyedCommand'

const parse = (json: string): Either.Shape<Error, IRemoteCommandRaw> => (
  Either
    .attempt(() => JSON.parse(json) as IRemoteCommandRaw, [])
    .chain((cmdRaw): Either.Shape<Error, IRemoteCommandRaw> => {
      if (typeof cmdRaw.t !== 'number' || typeof cmdRaw.i !== 'number' || typeof cmdRaw.g !== 'number') {
        return Either.left(new Error(`invalid command: ${json}`))
      }

      return Either.right(cmdRaw)
    })
)

export const decode = (json: string): Either.Shape<Error, IRemoteCommand> => (
  parse(json).chain((cmdRaw) => {
    switch (cmdRaw.t) {
      case RemoteCommandType.EntityCreated:
        return Either.right(new EntityCreatedCommand(cmdRaw.i, cmdRaw.g))

      case RemoteCommandType.EntityDestroyed:
        return Either.right(new EntityDestroyedCommand(cmdRaw.i, cmdRaw.g))

      case RemoteCommandType.EntityChanged:
        return Either.right(new EntityChangedCommand(cmdRaw.i, cmdRaw.g))

      case RemoteCommandType.EntityDataResponse:
        const cRaw = (cmdRaw as any).c
        if (!Array.isArray(cRaw)) {
          return Either.left(new Error(`invalid command: ${json}`))
        }

        return Either.right(new EntityDataResponseCommand(cmdRaw.i, cmdRaw.g, cRaw as string[]))
      default:
        return Either.left(new Error(`invalid command: ${json}`))
    }
  })
)

export const serialize = (cmd: IRemoteCommand): Either.Shape<Error, string> => {
  const type = cmd.getCommandType()

  if (type !== RemoteCommandType.EntityDataRequest) {
    return Either.left(new Error(`Not supported command: ${RemoteCommandType[type]}`))
  }

  return Either.right(
    JSON.stringify({
      t: cmd.getCommandType(),
      i: cmd.getEntityId(),
      g: cmd.getEntityGeneration(),
    })
  )
}
