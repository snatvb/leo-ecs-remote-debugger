import { IRemoteCommand } from '@commonTypes/commands'
import { EcsEntity } from '@store/Models/EcsEntity'
import { EntityDataRequestCommand } from '@transport/EntityDataRequestCommand'

export const createRequestComponents = (entity: EcsEntity): IRemoteCommand => (
  new EntityDataRequestCommand(entity.id, entity.generation)
)
