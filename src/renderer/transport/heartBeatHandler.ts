import { createTimeoutHandler, ITimeout } from '@helpers/createTimeoutHandler'
import { store } from '@store'
import { EcsWorld } from '@store/Models/EcsWorld'
import { HeartBeatCommand } from '@transport/HeadBeatCommand'
import { Maybe } from 'monad-maniac'
import { interval } from 'rxjs'
import { TransportAPI } from '.'

export type HeartBeatHandler = {
  updateTimeout: (world: EcsWorld) => void;
  handleHeartBeat: (world: EcsWorld) => void
}

const TIMEOUT_HEART_BEAT = 2500

const createPinger = (api: TransportAPI, intervalTime: number) => {
  const serverService = api.getServerService()
  const intervalPinging = interval(intervalTime)
    .subscribe(() => {
      store.worlds.forEach((world) => {
        if (!world.isAlive) { return }
        serverService.sendCommand(
          world.id,
          new HeartBeatCommand()
        )
      })
    })

  return () => { intervalPinging.unsubscribe() }
}

export const createHandlerHeartBeat = (api: TransportAPI): HeartBeatHandler => {
  const timeouts: Map<number, ITimeout> = new Map()
  createPinger(api, TIMEOUT_HEART_BEAT)

  const updateTimeout = (world: EcsWorld) => {
    Maybe.of(timeouts.get(world.id)).map((timeout) => {
      timeout.stop()
    })

    timeouts.set(world.id, createTimeoutHandler(() => {
      world.pause()
    }, TIMEOUT_HEART_BEAT))
  }

  return {
    updateTimeout: (world: EcsWorld) => {
      updateTimeout(world)
    },
    handleHeartBeat: (world: EcsWorld) => {
      if (world.isPaused) {
        world.resume()
      }
      updateTimeout(world)
    },
  }
}
