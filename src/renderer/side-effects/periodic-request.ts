import { createRequestComponents } from '@helpers/createRequestComponents'
import { store } from '@store'
import { Screen } from '@store/Models/UI/ScreenStore'
import { reaction } from 'mobx'
import { interval } from 'rxjs'
import { IApi } from './types'

interface IFork {
  stop(): void
}

type CreateFork = (period: number) => IFork

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

const startOpenedWorld = (api: IApi) => {
  const createFork: CreateFork = (period) => {
    console.log('Fork created periodic request')
    const intervalRequesting = interval(period)
      .subscribe(() => {
        requestAllEntityComponents(api)
      })

    return {
      stop() {
        console.log('Stopped periodic request')
        intervalRequesting.unsubscribe()
      }
    }
  }

  let fork: IFork | null = null
  const recreateFork = () => {
    if (fork) {
      fork.stop()
      fork = null
    }

    if (store.ui.anyWorldIsOpen && store.ui.screen.current === Screen.Worlds) {
      fork = createFork(store.ui.requestPeriod.openedWorld)
    }
  }

  recreateFork()
  reaction(() => store.ui.requestPeriod.openedWorld, recreateFork)
  reaction(() => store.ui.screen.current, recreateFork)
  reaction(() => store.ui.anyWorldIsOpen, recreateFork)
}

export const initialize = (api: IApi) => {
  startOpenedWorld(api)
}
