import { createRequestComponents } from '@helpers/createRequestComponents'
import { createFork } from '@helpers/rx/fork'
import { store } from '@store'
import { EcsEntity } from '@store/Models/EcsEntity'
import { EcsWorld } from '@store/Models/EcsWorld'
import { EntityModalValue } from '@store/Models/UI/Modals/EntityModal'
import { reaction } from 'mobx'
import { Either, Maybe } from 'monad-maniac'
import { IApi } from '../types'

type GetWorldReturnValueRight = Readonly<{ world: EcsWorld, entityId: number }>
type GetWorldReturnValue = Either.Shape<Error, GetWorldReturnValueRight>

const getWorld = ({ worldId, entityId }: EntityModalValue): GetWorldReturnValue => (
  store.getWorld(worldId).caseOf({
    Just: (world) => Either.right({
      world,
      entityId,
    }),
    Nothing: () => Either.left(new Error(`Can't find world with id ${worldId}`)),
  })
)

type GetEntityReturnValueRight = Readonly<{ world: EcsWorld, entity: EcsEntity }>
type GetEntityReturnValue = Either.Shape<Error, GetEntityReturnValueRight>

const getEntity = ({ world, entityId }: GetWorldReturnValueRight): GetEntityReturnValue => (
  world.getEntity(entityId).caseOf({
    Just: (entity) => Either.right({
      world,
      entity,
    }),
    Nothing: () => Either.left(new Error(`Can't find entity with id ${entityId} in world with id ${world.id}`)),
  })
)

const requestEntityComponents = (api: IApi) => {
  Maybe.toEither(new Error('Trying request unknown entity'), store.ui.modals.entityModal.entityValue)
    .chain(getWorld)
    .chain(getEntity)
    .caseOf({
      Right: ({ entity, world }) => {
        console.log(`Request components in entity ${world.id}`)
        api.sendCommand(
          world.id,
          createRequestComponents(entity)
        )
      },
      Left: (error) => console.warn(error),
    })
}

export const initialize = (api: IApi) => {
  const fork = createFork(() => {
    requestEntityComponents(api)
  }, { period: store.ui.requestPeriod.openedEntity })

  const recreateFork = () => {
    if (store.ui.modals.entityModal.entityValue.isJust()) {
      fork.recreate({ period: store.ui.requestPeriod.openedEntity })
    } else {
      fork.stop()
    }
  }

  recreateFork()

  reaction(() => store.ui.modals.entityModal.entityValue, recreateFork)
  reaction(() => store.ui.requestPeriod.openedEntity, recreateFork)
  reaction(() => store.ui.screen.current, recreateFork)
  reaction(() => store.ui.anyWorldIsOpen, recreateFork)
}
