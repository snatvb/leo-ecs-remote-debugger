import { createRequestComponents } from '@helpers/createRequestComponents'
import { getWhatDisplay } from '@helpers/entity/getWhatDisplay'
import { createFork } from '@helpers/rx/fork'
import { store } from '@store'
import { Screen } from '@store/Models/UI/ScreenStore'
import { reaction } from 'mobx'
import { IApi } from '../types'

const requestAllEntityComponents = (api: IApi) => {
  store.worlds.forEach((world) => {
    if (!world.isAlive || !store.ui.worldIsOpen(world.id)) { return }

    process.env.NODE_ENV === 'development' && console.log(`Request components in world ${world.id}`)
    getWhatDisplay(world).forEach((entity) => {
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
  }, { period: store.ui.requestPeriod.openedWorld })
  const recreateFork = () => {
    const worldIsOpen = store.ui.anyWorldIsOpen && store.ui.screen.current === Screen.Worlds
    const entityModalIsClosed = store.ui.modals.entityModal.entityValue.isNothing()
    if (worldIsOpen && entityModalIsClosed) {
      fork.recreate({ period: store.ui.requestPeriod.openedWorld })
    } else {
      fork.stop()
    }
  }

  recreateFork()

  reaction(() => store.ui.modals.entityModal.entityValue, recreateFork)
  reaction(() => store.ui.requestPeriod.openedWorld, recreateFork)
  reaction(() => store.ui.screen.current, recreateFork)
  reaction(() => store.ui.anyWorldIsOpen, recreateFork)
}
