import { IRemoteCommand, RemoteCommandRaw, RemoteCommandType } from '@commonTypes/commands'
import { Either } from 'monad-maniac'
import { EntityChangedCommand } from './EntityChangedCommand'
import { EntityCreatedCommand } from './EntityCreatedCommand'
import { EntityDataResponseCommand } from './EntityDataResponseCommand'
import { EntityDestroyedCommand } from './EntityDestroyedCommand'

const parse = (json: string): Either.Shape<Error, RemoteCommandRaw> => (
  Either
    .attempt(() => JSON.parse(json) as RemoteCommandRaw, [])
    .chain((cmdRaw): Either.Shape<Error, RemoteCommandRaw> => {
      if (typeof cmdRaw.t !== 'number' || typeof cmdRaw.i !== 'number' || typeof cmdRaw.g !== 'number') {
        return Either.left(new Error(`Invalid command: ${json}`))
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
        if (!('c' in cmdRaw) || !Array.isArray(cmdRaw.c)) {
          return Either.left(new Error(`Invalid command: ${json}`))
        }

        return Either.right(new EntityDataResponseCommand(cmdRaw.i, cmdRaw.g, cmdRaw.c))
      default:
        return Either.left(new Error(`Invalid command: ${json}`))
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
