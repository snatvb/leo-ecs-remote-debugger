import { RemoteCommand, RemoteCommandType } from '@/commonTypes/api'
import { store } from '@store/.'
import { EcsWorld } from '@store/Models/EcsWorld'
import { IServerService } from '.'

const handleEntityCreated = (world: EcsWorld, command: RemoteCommand) => {
  if (command.int1) {
    world.createEntity(command.int1)
  }
}

const handleEntityRemoved = (world: EcsWorld, command: RemoteCommand) => {
  if (command.int1) {
    world.removeEntity(command.int1)
  }
}

const handleCommand = (id: number, command: RemoteCommand) => {
  store.getWorld(id).map((world) => {
    switch (command.cmd) {
      case RemoteCommandType.EntityCreated:
        handleEntityCreated(world, command)
        break
      case RemoteCommandType.EntityRemoved:
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
