import { IServerService } from '@renderer/types/serverService'
import { store } from '@store'
import { ConnectionEventType } from '.'

const handleConnected = (id: number) => {
  store.createWorld(id)
}

const handleDisconnected = (id: number) => {
  store.getWorld(id).map((world) => world.isAlive = false)
}

export const initialize = (serverService: IServerService) => {
  serverService.on(ConnectionEventType.Connected, handleConnected)
  serverService.on(ConnectionEventType.Disconnected, handleDisconnected)
}
