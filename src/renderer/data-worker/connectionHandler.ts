import { store } from '@store/.'
import { ConnectionEventType, IServerService } from '.'

// TODO:  TO REMOVE
store.createWorld(432).isAlive = false

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
