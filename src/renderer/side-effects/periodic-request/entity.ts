import { createRequestComponents } from '@helpers/createRequestComponents'
import { createFork } from '@helpers/rx/fork'
import { store } from '@store'
import { Screen } from '@store/Models/UI/ScreenStore'
import { reaction } from 'mobx'
import { IApi } from '../types'

const requestAllEntityComponents = (api: IApi) => {
  store.worlds.forEach((world) => {
    if (!world.isAlive || !store.ui.worldIsOpen(world.id)) { return }

    console.log(`Request components in world ${world.id}`)
    world.entities.items.forEach((entity) => {
      api.sendCommand(
        world.id,
        createRequestComponents(entity)
      )
    })
  })
}

export const initialize = (api: IApi) => {
  const fork = createFork(() => {
    requestAllEntityComponents(api)
  }, { period: store.ui.requestPeriod.openedEntity })
  const recreateFork = () => {
    if (store.ui.anyWorldIsOpen && store.ui.screen.current === Screen.Worlds) {
      fork.recreate()
    } else {
      fork.stop()
    }
  }

  recreateFork()
  reaction(() => store.ui.requestPeriod.openedEntity, recreateFork)
  reaction(() => store.ui.screen.current, recreateFork)
  reaction(() => store.ui.anyWorldIsOpen, recreateFork)
}
