import { IRemoteCommand, RemoteCommandType } from '@commonTypes/commands'
import { store } from '@store'
import { EcsWorld } from '@store/Models/EcsWorld'
import { IServerService } from '.'

const handleEntityCreated = (world: EcsWorld, command: IRemoteCommand) => {
  if (command.getEntityId()) {
    world.createEntity(command.getEntityId())
  }
}

const handleEntityRemoved = (world: EcsWorld, command: IRemoteCommand) => {
  if (command.getEntityId()) {
    world.removeEntity(command.getEntityId())
  }
}

const handleCommand = (id: number, command: IRemoteCommand) => {
  store.getWorld(id).map((world) => {
    switch (command.getCommandType()) {
      case RemoteCommandType.EntityCreated:
        handleEntityCreated(world, command)
        break
      case RemoteCommandType.EntityDestroyed:
        handleEntityRemoved(world, command)
        break

      default:
        console.warn('This command is not supported', command)
    }
  })
}

export const initialize = (serverService: IServerService) => {
  serverService.on('command', handleCommand)
}
