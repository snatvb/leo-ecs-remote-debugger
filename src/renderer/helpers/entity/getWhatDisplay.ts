import { includes } from '@helpers/includes'
import { store } from '@store'
import { EcsEntity } from '@store/Models/EcsEntity'
import { EcsWorld } from '@store/Models/EcsWorld'
import { keys } from 'mobx'

const MAX_RENDER_ENTITIES = 50

const checkHasComponent = (entity: EcsEntity, query: string) => {
  const words = query.split(' ')
  // tslint:disable-next-line:prefer-for-of
  for (let index = 0; index < words.length; index++) {
    const word = words[index].trim()
    if (word.length === 0) { continue }

    const contain = includes((component) => (
      new RegExp(word, 'i').test(component.name)
    ), entity.components.values())

    if (contain) {
      return true
    }
  }

  return false
}

const filterEntities = (world: EcsWorld, query: string) => (entityId: number): boolean => (
  world
  .getEntity(entityId)
  .filter((entity) => checkHasComponent(entity, query))
  .caseOf({
    Just: () => true,
    Nothing: () => false,
  })
)

export const getWhatDisplay = (world: EcsWorld) => {
  const result: EcsEntity[] = []
  const query = store.ui.entitiesSearch.getQuery(world.id).getOrElse('')

  for (const entity of world.entities.items.values()) {
    if (query.length > 0) {
      if (checkHasComponent(entity, query)) {
        result.push(entity)
      }
    } else {
      result.push(entity)
    }

    if (result.length >= MAX_RENDER_ENTITIES) {
      return result
    }
  }

  return result
}

export const getKeysWhatDisplay = (world: EcsWorld) => (
  store.ui.entitiesSearch.getQuery(world.id)
    .filter((query) => query.length > 0)
    .caseOf({
      Just: (query) =>  (
        keys(world.entities.items)
          .filter(filterEntities(world, query))
          .slice(0, MAX_RENDER_ENTITIES)
      ),
      Nothing: () => keys(world.entities.items).slice(0, MAX_RENDER_ENTITIES),
    })
)
