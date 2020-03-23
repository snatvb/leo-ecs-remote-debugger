import { store } from '@store'
import { ConnectionEventType, IServerService } from '.'

// TODO:  TO REMOVE
const w = store.createWorld(432)
w.createEntity(2)
w.isAlive = false
const w2 = store.createWorld(4442)
w2.createEntity(232)
w2.createEntity(423)
w2.createEntity(23432)
w2.createEntity(23642)
w2.isAlive = false

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
