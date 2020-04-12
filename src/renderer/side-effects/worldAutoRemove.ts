import { forEach } from '@helpers/forEach'
import { store } from '@store'
import { EcsWorld } from '@store/Models/EcsWorld'
import { reaction, when } from 'mobx'

const LOCAL_STORAGE_KEY = 'stop-auto-remove'

const addReactionChangeStatus = (world: EcsWorld) => {
  if (!store.worlds.get(world.id)) { return }

  when(() => world.isDied, () => {
    store.removeWorld(world.id)
  })
}

export const initialize = () => {
  if (localStorage.getItem(LOCAL_STORAGE_KEY) === 'true') {
    return
  }

  reaction(() => store.worlds.values(), (worldsIterator) => {
    forEach(addReactionChangeStatus, worldsIterator)
  })
}
