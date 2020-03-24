import { IRemoteCommand, RemoteCommandType } from '@commonTypes/commands'
import { validateEntity } from '@helpers/validateEntity'
import { store } from '@store'
import { EcsWorld } from '@store/Models/EcsWorld'
import { EntityChangedCommand } from '@transport/EntityChangedCommand'
import { EntityCreatedCommand } from '@transport/EntityCreatedCommand'
import { EntityDataRequestCommand } from '@transport/EntityDataRequestCommand'
import { EntityDataResponseCommand } from '@transport/EntityDataResponseCommand'
import { EntityDestroyedCommand } from '@transport/EntityDestroyedCommand'
import { IServerService } from '.'
import { EcsEntity } from '../store/Models/EcsEntity'

type Handlers = {
  handleResponse(world: EcsWorld, command: EntityDataResponseCommand): void
  handleEntityCreated(world: EcsWorld, command: EntityCreatedCommand): void
  handleEntityChanged(world: EcsWorld, command: EntityChangedCommand): void
  handleEntityDestroyed(world: EcsWorld, command: EntityDestroyedCommand): void
}

const createRequestCmd = (entity: EcsEntity): IRemoteCommand => (
  new EntityDataRequestCommand(entity.id, entity.generation)
)

const createHandlerEntityCreated = (serverService: IServerService) => (
  (world: EcsWorld, command: EntityCreatedCommand) => {
    const entity = world.createEntity(command.getEntityId(), command.getEntityGeneration())

    serverService.sendCommand(
      world.id,
      createRequestCmd(entity)
    )
  }
)

const createHandlerResponse = (serverService: IServerService) => (
  (world: EcsWorld, command: EntityDataResponseCommand) => {
    world.getEntity(command.getEntityId())
      .toEither(new Error(`Cannot find entity with id ${command.getEntityId()}`))
      .chain(validateEntity(command.getEntityGeneration()))
      .caseOf({
        Right: (entity) => { entity.setLoadedComponents(command.getComponents()) },
        Left: (error) => { console.error(error) },
      })
  }
)

const createHandlerEntityDestroyed = (serverService: IServerService) => (
  (world: EcsWorld, command: EntityDestroyedCommand) => {
    console.log('Remove entity', { world, command })
    world.removeEntity(command.getEntityId())
  }
)

const createHandlerEntityChanged = (serverService: IServerService) => (
  (world: EcsWorld, command: EntityChangedCommand) => {
    console.log('Changed entity', { world, command })
  }
)

const createHandlerCommand = (handlers: Handlers) => (id: number, command: IRemoteCommand) => {
  store.getWorld(id).map((world) => {
    switch (command.getCommandType()) {
      case RemoteCommandType.EntityCreated:
        handlers.handleEntityCreated(world, command as EntityCreatedCommand)
        break

      case RemoteCommandType.EntityDataResponse:
        handlers.handleResponse(world, command as EntityDataResponseCommand)

      case RemoteCommandType.EntityChanged:
        handlers.handleEntityChanged(world, command as EntityChangedCommand)
        break

      case RemoteCommandType.EntityDestroyed:
        handlers.handleEntityDestroyed(world, command as EntityDestroyedCommand)
        break

      default:
        console.warn('This command is not supported', command)
    }
  })
}

export const initialize = (serverService: IServerService) => {
  const handlers: Handlers = {
    handleEntityCreated: createHandlerEntityCreated(serverService),
    handleEntityDestroyed: createHandlerEntityDestroyed(serverService),
    handleEntityChanged: createHandlerEntityChanged(serverService),
    handleResponse: createHandlerResponse(serverService),
  }
  serverService.on('command', createHandlerCommand(handlers))
}
