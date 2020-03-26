import { createRequestComponents } from '@helpers/createRequestComponents'
import { store } from '@store'
import { reaction } from 'mobx'
import { interval } from 'rxjs'
import { IApi } from './types'

interface IFork {
  stop(): void
}

type CreateFork = (period: number) => IFork

const requestAllEntityComponents = (api: IApi) => {
  store.worlds.forEach((world) => {
    if (!world.isAlive) { return }

    world.entities.items.forEach((entity) => {
      api.sendCommand(
        world.id,
        createRequestComponents(entity)
      )
    })
  })
}

const startOpenedWorld = (api: IApi) => {
  const createFork: CreateFork = (period) => {
    const intervalRequesting = interval(period)
      .subscribe(() => {
        requestAllEntityComponents(api)
      })

    return {
      stop() { intervalRequesting.unsubscribe() }
    }
  }

  let fork = createFork(store.ui.requestPeriod.openedWorld)
  reaction(() => store.ui.requestPeriod.openedWorld, () => {
    fork.stop()
    fork = createFork(store.ui.requestPeriod.openedWorld)
  })
}

export const initialize = (api: IApi) => {
  startOpenedWorld(api)
}
