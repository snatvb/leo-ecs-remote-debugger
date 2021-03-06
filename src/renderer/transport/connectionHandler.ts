import { store } from '@store'
import { ConnectionEventType, TransportAPI } from '.'

const handleConnected = (id: number) => {
  store.createWorld(id)
}

const handleDisconnected = (id: number) => {
  console.log(`World with id ${id} has been disconnected`)
  store.getWorld(id).map((world) => world.isAlive = false)
}

export const initialize = (api: TransportAPI) => {
  const serverService = api.getServerService()
  serverService.on(ConnectionEventType.Connected, handleConnected)
  serverService.on(ConnectionEventType.Disconnected, handleDisconnected)
}
